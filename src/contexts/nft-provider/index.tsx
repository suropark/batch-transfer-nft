import Caver from "caver-js";
import { ethers } from "ethers";
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ERC721ABI } from "../../constants";
import { multicall } from "../../utils/multicall";
import { getUri } from "../../utils/nftImg";
import { getMainnetURI, useWeb3Context } from "../klaytn-provider";
import { NftInWallet } from "./types";
const caver = new Caver(getMainnetURI());

type onChainProvider = {
  isNft: (address: string) => Promise<boolean>;
  getNftInWallet: any;
  nftInWallet: any;
  registerNft: any;
  onSelectNft: any;
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
  const { provider, address } = useWeb3Context();

  const [nftInWallet, setNftInWallet] = useState<NftInWallet>({});

  const ERC721InterfaceId: string = "0x80ac58cd";
  const ERC1155InterfaceId: string = "0xd9b67a26";
  const KIP17InterfaceId: string = "0x80ac58cd";

  const isNft = async (contractAddress: string) => {
    if (!ethers.utils.isAddress(contractAddress)) return false;

    const nftContract = new ethers.Contract(
      contractAddress,
      ERC721ABI,
      provider
    );
    const isErc721 = await nftContract.supportsInterface(ERC721InterfaceId);
    const isKIP17 = await nftContract.supportsInterface(KIP17InterfaceId);

    return isErc721 || isKIP17;
  };

  const getNftInWallet = async (contractAddress: string) => {
    if (!address) return [];

    const tmp = new caver.contract(ERC721ABI as any, contractAddress);
    let incomingTokenTransferEvents = await tmp
      .getPastEvents("Transfer", {
        filter: { to: address },
        fromBlock: "64117112", // generated dsc-mate contract
        toBlock: "latest",
      })
      .then((res) => res.map((e: any) => e.returnValues.tokenId));

    const ownedNft = incomingTokenTransferEvents.map((id) => {
      return multicall([tmp.methods.ownerOf(id), tmp.methods.tokenURI(id)]);
    });
    let datas: any[] = [];
    await Promise.all(ownedNft).then(async (res) => {
      res.forEach((r: any, key) => {
        if (r[0].toLowerCase() === address.toLowerCase()) {
          if (
            datas.some((data) => data.id === incomingTokenTransferEvents[key])
          )
            return;
          const uri = getUri(r[1]);
          datas.push({
            contractAddress,
            id: incomingTokenTransferEvents[key],
            uri,
            isSelected: false,
          });
        }
      });
      // uri가 아니라 image를 가져와야 할듯 fetch 한번 더 해서
    });

    return datas || [];
  };

  const registerNft = async (contractAddress: string): Promise<boolean> => {
    if (!address) return false;

    // no need to update
    if (nftInWallet[contractAddress.toLowerCase()]) {
      return false;
    } else {
      const nft = await getNftInWallet(contractAddress);

      setNftInWallet((prev) => ({
        ...prev,
        [contractAddress.toLowerCase()]: nft,
      }));
    }
    return true;
  };

  const onSelectNft = (selectedNftData: any) => {
    setNftInWallet((prev) => ({
      ...prev,
      [selectedNftData.contractAddress.toLowerCase()]: prev[
        selectedNftData.contractAddress.toLowerCase()
      ].map((nft: any) => {
        if (nft.id === selectedNftData.id) {
          return {
            ...nft,
            isSelected: !nft.isSelected,
          };
        }
        return nft;
      }),
    }));
  };
  const onChainProvider = useMemo(
    () => ({
      isNft,
      getNftInWallet,
      nftInWallet,
      registerNft,
      onSelectNft,
    }),
    [isNft, getNftInWallet, nftInWallet, registerNft, onSelectNft]
  );
  return (
    <NftContext.Provider value={{ onChainProvider }}>
      {children}
    </NftContext.Provider>
  );
};
