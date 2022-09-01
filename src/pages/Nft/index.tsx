import {
  Box,
  Input,
  Typography,
  TextField,
  Card,
  CardCover,
  CardContent,
  Button,
} from "@mui/joy";
import React from "react";
import { useWeb3Context } from "../../contexts/klaytn-provider";
import { range } from "../../utils/range";
import NftCard from "../../components/NftCard";
import { getNftImgUrl } from "../../utils/nftImg";
import { useNftContext } from "../../contexts/nft-provider";
import axios from "axios";
type Props = {};

const NftTransfer = (props: Props) => {
  const { connected } = useWeb3Context();
  const { getNftInWallet, nftInWallet } = useNftContext();

  // if (!connected) {
  //   return <ConnectWallet />;
  // }

  React.useEffect(() => {
    getNftInWallet("0xe47e90c58f8336a2f24bcd9bcb530e2e02e1e8ae");
    axios.get('https://claimswap-slime-nft.s3.ap-northeast-2.amazonaws.com/metadata/1030.json')
  }, [connected]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "40px",
        mx: { xs: 1, xl: "auto" },
      }}
    >
      <Typography level="h4">Transfer your NFTs at once</Typography>

      <TextField label="Network" placeholder="Type in here…" fullWidth />
      <TextField
        label="Add NFT Contract"
        placeholder="Type in here…"
        fullWidth
      />
      <TextField label="Recipient" placeholder="Type in here…" fullWidth />
      <Box>NFT List</Box>
      {/* <TextField label="Nft Address" placeholder="Type in here…" fullWidth /> */}

      <Box
        component="ul"
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          p: 0,
          m: 0,
          justifyContent: "center",
        }}
      >
        {range(10).map((c, key) => {
          const t =
            key % 2 === 0
              ? getNftImgUrl(
                  "https://moksha.s3.ap-northeast-2.amazonaws.com/moksha.mp4"
                )
              : getNftImgUrl(
                  "https://storage.googleapis.com/dsc-mate/336/dscMate-5664.png "
                );

          return <NftCard isVideo={t.isVideo} src={t.imgSrc} />;
        })}
      </Box>

      <Button>Approve</Button>
      <Button>Transfer </Button>
    </Box>
  );
};

export default NftTransfer;
