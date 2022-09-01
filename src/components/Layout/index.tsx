import Box from "@mui/joy/Box";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const index = ({ children }: Props) => {
  return (
    <Box
      sx={{
        mx: "auto",
        maxWidth: "1280px",
      }}
    >
      {children}
    </Box>
  );
};

export default index;
