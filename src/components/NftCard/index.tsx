import React from "react";
import { Card, CardCover, CardContent, Typography } from "@mui/joy";
type Props = {
  isVideo?: boolean;
  src?: string;
  selected?: boolean;
  onSelect?: () => void;
  tokenId?: string;
  nftContract?: string;
};

const index = ({ isVideo, src }: Props) => {
  return (
    <Card
      component="li"
      sx={{
        minWidth: {
          xs: "36%",
          sm: "200px",
        },
      }}
    >
      <CardCover>
        {isVideo ? (
          <video autoPlay loop muted>
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <img src={src} alt="" />
        )}
      </CardCover>
      <CardContent sx={{ justifyContent: "flex-end" }}>
        <Typography
          level="h2"
          fontSize="lg"
          textColor="#fff"
          mb={1}
          mt={{ xs: 12, sm: 18 }}
        >
          NFT Contract
        </Typography>
        <Typography textColor="neutral.300">Token Id</Typography>
      </CardContent>
    </Card>
  );
};

export default index;
