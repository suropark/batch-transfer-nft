import { Box, Typography } from "@mui/material";
import React from "react";

type Props = {};

const Logo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pt: 3,
        height: "56px",
      }}
    >
      <img src="/KLAY.png" alt="KLAY" height={100} />
      <Typography
        variant="h3"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        WKLAY
      </Typography>
    </Box>
  );
};

const index = (props: Props) => {
  return (
    <Box sx={{}}>
      <Logo />
    </Box>
  );
};

export default index;
