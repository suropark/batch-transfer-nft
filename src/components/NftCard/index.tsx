import React from "react";
import {
  Card,
  CardCover,
  CardContent,
  Typography,
  Box,
  AspectRatio,
  Button,
  IconButton,
} from "@mui/joy";
import fallbackImg from "./404.png";
import AddIcon from "@mui/icons-material/Add";
type Props = {
  isVideo?: boolean;
  src?: string;
  selected?: boolean;
  onSelect?: () => void;
  tokenId?: string;
  nftContract?: string;
};

const imageOnErrorHandler = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src = fallbackImg;
  event.currentTarget.className = "error";
};
const index = ({ isVideo, src }: Props) => {
  return (
    <Card
        
      component="li"
      variant="outlined"
      sx={(theme) => ({
        minWidth: {
          xs: "36%",
          sm: "200px",
        },

        "&:hover": {
          borderColor: theme.vars.palette.primary.outlinedHoverBorder,
          transform: "translateY(-2px)",
          cursor: "pointer",
        },
      })}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography level="h2" fontSize="md" sx={{ alignSelf: "flex-start" }}>
          NFT Contract
        </Typography>
        <Typography level="body2">Token Id</Typography>
      </Box>
      {/* <IconButton
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
      >
        <AddIcon />
      </IconButton> */}
      <AspectRatio minHeight="200px" maxHeight="200px" sx={{ my: 2 }}>
        {isVideo ? (
          <video autoPlay loop muted>
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <img
            src={src}
            alt=""
            onError={imageOnErrorHandler}
            style={{
              objectFit: "scale-down",
            }}
          />
        )}
      </AspectRatio>
      {/* <Box sx={{ display: "flex" }}>
        <div>
          <Typography level="body3">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            $2900
          </Typography>
        </div>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          sx={{ ml: "auto", fontWeight: 600 }}
        >
          Explore
        </Button>
      </Box> */}
    </Card>
  );
};

export default index;
