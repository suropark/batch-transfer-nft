import { Web3Provider } from "@ethersproject/providers";
import Caver from "caver-js";
import { KlipProvider } from "./klip";

export class ConnectedProvider {
  ethers: Web3Provider | null = null;
  caver: Caver | null = null;
  klip: KlipProvider | null = null;

  static fromEthers(ethers: Web3Provider): ConnectedProvider {
    const provider = new ConnectedProvider();
    provider.ethers = ethers;
    return provider;
  }
  static fromKlip = (klip: KlipProvider) => {
    const provider = new ConnectedProvider();
    provider.klip = klip;
    return provider;
  };

  static fromCaver = (caver: Caver) => {
    const provider = new ConnectedProvider();
    provider.caver = caver;
    return provider;
  };

  get isEthers(): Boolean {
    return this.ethers !== null;
  }
  get isCaver(): Boolean {
    return this.caver !== null;
  }
  get isKlip(): Boolean {
    return this.klip !== null;
  }
}
