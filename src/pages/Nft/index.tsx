import { Box, Input, Typography } from "@mui/material";
import React from "react";
import { ConnectWallet } from "../../components/Header";
import { useWeb3Context } from "../../contexts/klaytn-provider";

type Props = {};

const NftTransfer = (props: Props) => {
  const { connected } = useWeb3Context();

  // if (!connected) {
  //   return <ConnectWallet />;
  // }
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <Typography variant="h4">Transfer your NFTs at once</Typography>

        <Box>
          <Input
            placeholder="Input Nft Address"
            sx={{
              minWidth: {
                xs: "300px",
                md: "400px",
                lg: "500px",
                xl: "600px",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default NftTransfer;
