import { BigNumber, ethers } from "ethers";
import { ConnectedProvider } from "./connectedProvider";

export class ContractWrapper {
  private connectedProvider: ConnectedProvider;
  private contractAddress: string;
  private abi: any;

  constructor(params: {
    connectedProvider: ConnectedProvider;
    abi: any;
    contractAddress: string;
  }) {
    const { connectedProvider, contractAddress, abi } = params;
    this.connectedProvider = connectedProvider;
    this.contractAddress = contractAddress;
    this.abi = abi;
  }

  send = async (method: string, params: any[], options?: { value: string }) => {
    if (this.connectedProvider.isEthers) {
      const signer = this.connectedProvider.ethers?.getSigner();

      const contract = new ethers.Contract(
        this.contractAddress,
        this.abi,
        signer
      );
      const address = signer?.getAddress();

      if (params.length === 0) {
        const approveTx = await contract[method]({
          from: address,
          ...options,
        });
        return approveTx;
      } else {
        const approveTx = await contract[method](...params, {
          from: address,
          ...options,
        });
        return approveTx;
      }
    } else if (this.connectedProvider.isCaver) {
      const klay = this.connectedProvider.caver?.klay;
      if (klay) {
        const address = window.klaytn.selectedAddress;
        const contract = new klay.Contract(this.abi, this.contractAddress);
        await contract.send(
          { from: address, gas: "3000000", ...(options ?? {}) },
          method,
          ...params
        );
      }
    } else if (this.connectedProvider.klip) {
      const { requestKey } = await this.connectedProvider.klip.excuteContract({
        method,
        abi: this.abi,
        constractAddress: this.contractAddress,
        params,
        options,
      });

      await this.connectedProvider.klip.pollResult(requestKey);
    }
  };
}
