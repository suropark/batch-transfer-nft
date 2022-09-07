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
import React, { useState } from "react";
import { useWeb3Context } from "../../contexts/klaytn-provider";
import { range } from "../../utils/range";
import NftCard from "../../components/NftCard";
import { getNftImgUrl } from "../../utils/nftImg";
import { useNftContext } from "../../contexts/nft-provider";
import axios from "axios";
import { ethers } from "ethers";
import { InfoOutlined } from "@mui/icons-material";
import { verifyNft } from "../../contexts/nft-provider/verifiedNft";
type Props = {};

const NftTransfer = (props: Props) => {
  const { connected } = useWeb3Context();
  const { getNftInWallet, nftInWallet, registerNft } = useNftContext();
  console.log(nftInWallet);
  const [nftAddrToAdd, setNftAddrToAdd] = useState("");
  // if (!connected) {
  //   return <ConnectWallet />;
  // }

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
      {/* <TextField label="Network" placeholder="Type in here…" fullWidth /> */}
      <TextField
        label="Add NFT Contract"
        placeholder="Type in here…"
        fullWidth
        onChange={(e) => setNftAddrToAdd(e.target.value)}
        value={nftAddrToAdd}
        error={nftAddrToAdd !== "" && !ethers.utils.isAddress(nftAddrToAdd)}
        // helperText={}
        endDecorator={
          <Button
            onClick={async () => {
              await registerNft(nftAddrToAdd);
              setNftAddrToAdd("");
            }}
          >
            Add
          </Button>
        }
      />
      <Box sx={{ width: "100%" }}>
        <Typography
          level="body2"
          sx={{
            alignItems: "flex-start",
            maxWidth: 240,
            wordBreak: "break-all",
          }}
        >
          Added Contract
        </Typography>
        <Box>
          {Object.keys(nftInWallet).map((nftAddr) => {
            return (
              <Box sx={{ display: "flex" }}>
                {nftAddr} -
                <Typography
                  startDecorator={<InfoOutlined />}
                  level="body3"
                  variant="outlined"
                  ml={1}
                >
                  {verifyNft(nftAddr)}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

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
        {Object.keys(nftInWallet).map((nftAddr) => {
          return nftInWallet[nftAddr].map((nft: any) => {
            return (
              <NftCard nftData={nft} isVideo={nft.isVideo} src={nft.imgSrc} />
            );
          });
        })}
      </Box>
      <Button>Approve</Button>
      <Button>Transfer </Button>
    </Box>
  );
};

export default NftTransfer;
