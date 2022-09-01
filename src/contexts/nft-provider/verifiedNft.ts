const registeredNfts: {
  [key: string]: string;
} = {
  "0x9e066d9cddd98d73f92df6025581b78023fa9cc5": "ClaimSwap NFT",
  "0xe47e90c58f8336a2f24bcd9bcb530e2e02e1e8ae": "DOGESOUNDCLUB MATES",
};

export const verifyNft = (contractAddress: string): string => {
  return registeredNfts[contractAddress.toLowerCase()] || contractAddress;
};
