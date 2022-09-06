import { ethers } from "ethers";

export function shortenAddress(address: string, chars: number = 4) {
  if (!address) return "";
  if (!ethers.utils.isAddress(address)) return address;
  return `${address.substring(0, chars + 2)}...${address.substring(
    42 - chars
  )}`;
}
