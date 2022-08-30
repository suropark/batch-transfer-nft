import { ethers } from "ethers";
import { createContext, ReactElement, useContext, useMemo } from "react";
import { ERC721ABI } from "../../components/constants";
import { useWeb3Context } from "../klaytn-provider";

type onChainProvider = {
  isNft: (address: string) => Promise<boolean>;
};

export type NftContextData = {
  onChainProvider: onChainProvider;
} | null;

const NftContext = createContext<NftContextData>(null);

export const useNftContext = () => {
  const nftContext = useContext(NftContext);

  if (!nftContext) {
    throw new Error("NftContext not found");
  }

  const { onChainProvider } = nftContext;

  return useMemo(() => {
    return { ...onChainProvider };
  }, [nftContext]);
};

interface INftContextProvider {
  children: ReactElement;
}
export const NftContextProvider: React.FC<INftContextProvider> = ({
  children,
}) => {
  const { provider } = useWeb3Context();

  const ERC721InterfaceId: string = "0x80ac58cd";
  const ERC1155InterfaceId: string = "0xd9b67a26";
  const KIP17InterfaceId: string = "0x80ac58cd";
  const isNft = async (address: string) => {
    if (!ethers.utils.isAddress(address)) return false;

    const nftContract = new ethers.Contract(address, ERC721ABI, provider);
    const isErc721 = await nftContract.supportsInterface(ERC721InterfaceId);
    const isKIP17 = await nftContract.supportsInterface(KIP17InterfaceId);

    return isErc721 || isKIP17;
  };
  const onChainProvider = useMemo(
    () => ({
      isNft,
    }),
    [isNft]
  );
  return (
    <NftContext.Provider value={{ onChainProvider }}>
      {children}
    </NftContext.Provider>
  );
};
