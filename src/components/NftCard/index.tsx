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
import { getImgFromUri, getNftImgUrl, getUri } from "../../utils/nftImg";
import { shortenAddress } from "../../utils/shortenAddress";
import { verifyNft } from "../../contexts/nft-provider/verifiedNft";
import DoneIcon from "@mui/icons-material/Done";
import { ReactComponent as CheckedIcon } from "./checkActive.svg";
import { useNftContext } from "../../contexts/nft-provider";
type Props = {
  isVideo?: boolean;
  src?: string;
  selected?: boolean;
  onSelect?: () => void;
  tokenId?: string;
  nftContract?: string;
  nftData?: any;
};

const imageOnErrorHandler = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src = fallbackImg;
  event.currentTarget.className = "error";
};
const Index = ({ isVideo, src, nftData }: Props) => {
  const [img, setImg] = React.useState("");
  const [id, setId] = React.useState("");
  const [contract, setContract] = React.useState("");
  const { onSelectNft } = useNftContext();

  React.useEffect(() => {
    setId(nftData.id);
    setContract(verifyNft(nftData.contractAddress));
    getImgFromUri(nftData.uri).then(setImg);
  }, []);

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
      onClick={() => {
        onSelectNft(nftData);
      }}
    >
      <CheckedIcon
        style={{
          display: nftData.isSelected ? "block" : "none",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "50",
          // backgroundColor: "red",
          width: "50%",
          height: "50%",
          // background: 'url("/checkActive.svg") no-repeat center cover',
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography level="h2" fontSize="md" sx={{ alignSelf: "flex-start" }}>
          {/* NFT Contract */}
          {shortenAddress(contract)}
        </Typography>
        {/* <Typography level="body2">Token Id</Typography> */}
        <Typography level="body2">{id}</Typography>
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
        {img !== "" ? (
          isVideo ? (
            <video autoPlay loop muted>
              <source src={img} type="video/mp4" />
            </video>
          ) : (
            <img
              src={img}
              alt=""
              onError={imageOnErrorHandler}
              style={{
                // filter:   "grayscale(100%)",
                objectFit: "scale-down",
              }}
            />
          )
        ) : null}
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
export default Index;
