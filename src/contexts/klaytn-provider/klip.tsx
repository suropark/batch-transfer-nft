import axios from "axios";
import platform from "platform-detect";
import { request } from "klip-sdk";

const SERVER_URL = "https://a2a-api.klipwallet.com";

enum KlipRoute {
  PREPARE = "/v2/a2a/prepare",
  RESULT = "/v2/a2a/result?request_key=",
}

interface PrepareParams {
  type: string;
  bapp?: { name: string };
  callback?: {
    success?: string;
    fail?: string;
  };
}

export class KlipProvider {
  private os: "ios" | "and" | "pc" = "pc";
  readonly isKlip = true;

  setQr: any = null;
  setModalOpen: any = null;
  selectedAddress: string | undefined;

  constructor(modalRequestKeyHandler: any, modalOpenHandler: any) {
    if (platform.android) {
      this.os = "and";
    } else if (platform.ios) {
      this.os = "ios";
    }

    this.setModalOpen = modalOpenHandler;
    this.setQr = modalRequestKeyHandler;
  }

  private prepare = async (params: PrepareParams) => {
    const resp = await axios.post(`${SERVER_URL}${KlipRoute.PREPARE}`, params);
    return resp.data;
  };

  private request = async (requestKey: string) => {
    const osUrls = {
      ios: `kakaotalk://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${requestKey}`,
      and: `intent://klipwallet/open?url=https://klipwallet.com/?target=/a2a?request_key=${requestKey}#Intent;scheme=kakaotalk;package=com.kakao.talk;end`,
      pc: `https://klipwallet.com/?target=/a2a?request_key=${requestKey}`,
    };

    if (this.os === "pc") {
      return osUrls["pc"];
    }
    await request(requestKey);

    return;
  };

  enable = async () => {
    const authParams = {
      type: "auth",
    };
    const data = await this.prepare(authParams);
    const requestKey = data["request_key"];
    const url = await this.request(requestKey);

    if (url) {
      this.setQr?.(url);
      this.setModalOpen(true);
    }

    return { requestKey, url };
  };

  excuteContract = async ({
    constractAddress,
    abi,
    method,
    params,
    options,
  }: {
    constractAddress: string;
    abi: any[];
    method: string;
    params: any[];
    options?: { value: string };
  }) => {
    const methodAbi = abi.find(({ name }) => name === method);

    const excuteContractParams = {
      type: "execute_contract",
      transaction: {
        to: constractAddress,
        value: options?.value ?? "0",
        abi: JSON.stringify(methodAbi),
        params: JSON.stringify(
          params.map((v) => {
            if (typeof v === "boolean") {
              return v;
            } else {
              return v?.toString?.() ?? v;
            }
          })
        ),
      },
    };

    const data = await this.prepare(excuteContractParams);
    const requestKey = data["request_key"];
    const url = await this.request(requestKey);

    if (url) {
      this.setQr?.(url);
      this.setModalOpen(true);
    }

    return { requestKey, url };
  };

  pollResult = (requestKey: string) => {
    const timeout = 1000 * 60 * 5;
    let count = 0;
    const tick = 2000;
    let interverId: any = undefined;

    return new Promise((res, rej) => {
      interverId = setInterval(async () => {
        const resp = await axios.get(
          `${SERVER_URL}${KlipRoute.RESULT}${requestKey}`
        );
        const result = resp.data;

        if (result.status !== "prepared") {
          clearInterval(interverId);
          this.setModalOpen(false);
          res(result);
        }

        if (timeout < tick * count) {
          clearInterval(interverId);
          this.setModalOpen(false);
          rej("timeout");
        }

        count++;
      }, tick);
    });
  };
}
