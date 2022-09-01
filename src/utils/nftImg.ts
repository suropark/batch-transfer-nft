export function getNftImgUrl(metaDataImgSrc: string): {
  imgSrc: string;
  isVideo: boolean;
} {
  let imgSrcUrl: string = "";
  let isVideo: boolean;

  // verify if the src is a video
  if (metaDataImgSrc.endsWith(".mp4")) {
    isVideo = true;
  } else if (!metaDataImgSrc.includes(".")) {
    isVideo = true;
  } else {
    isVideo = false;
  }

  // Make Url
  if (metaDataImgSrc.startsWith("https://")) {
    imgSrcUrl = metaDataImgSrc;
  } else if (metaDataImgSrc.startsWith("ipfs://")) {
    imgSrcUrl = "https://ipfs.io/ipfs/" + metaDataImgSrc.substring(7);
  } else if (metaDataImgSrc.startsWith("https://ipfs.io/ipfs/")) {
    imgSrcUrl = metaDataImgSrc;
  }

  return { imgSrc: imgSrcUrl, isVideo: isVideo };
}

export function getUri(tokenURI: string): string {
  if (tokenURI.startsWith("https://") || tokenURI.startsWith("https://ipfs"))
    return tokenURI;
  else return `https://ipfs.io/ipfs/${tokenURI.substring(7)}`;
}
