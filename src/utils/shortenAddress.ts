export function shortenAddress(address: string, chars: number = 4) {
  if (!address) return null;
  return `${address.substring(0, chars + 2)}...${address.substring(
    42 - chars
  )}`;
}
