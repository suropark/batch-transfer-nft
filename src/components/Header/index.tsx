import { Box, Button, Typography } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useWeb3Context } from "../../contexts/klaytn-provider";
type Props = {};
const menuList = [
  {
    name: "Vault",
  },
  {
    name: "veBTRY",
  },
  {
    name: "status",
  },
];

const Logo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
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
        Logo
      </Typography>
    </Box>
  );
};

const TopMenu = () => {
  return (
    <Box
      sx={{
        display: {
          sm: "none",
          lg: "flex",
        },
      }}
    >
      {menuList.map((m) => {
        return <Box>{m.name}</Box>;
      })}
    </Box>
  );
};

const TokenPrice = () => {
  return (
    <Box
      sx={{
        p: "4px 20px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img height={"36px"} src="/KLAY.png" />
      <Typography>$ 1.00</Typography>
    </Box>
  );
};
const ConnectWallet = () => {
  const { connect, connected, address } = useWeb3Context();
  return (
    <Box
      sx={{
        p: "4px 20px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button
        onClick={() => connect()}
        sx={{
          fontWeight: "bold",
        }}
      >
        Connect Wallet
      </Button>
    </Box>
  );
};

const SideMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        display: {
          sm: "block",
          lg: "none",
        },
      }}
    >
      <Button onClick={handleClick}>
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorEl={anchorEl}
      >
        {menuList.map((m) => {
          return <MenuItem onClick={handleClose}>{m.name}</MenuItem>;
        })}
      </Menu>
    </Box>
  );
};

const index = (props: Props) => {
  return (
    <Box
      sx={{
        // backgroundColor: "#1a1b23",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Logo />
      <TopMenu />
      <Box sx={{ display: "flex" }}>
        <TokenPrice />
        <ConnectWallet />
        <SideMenu />
      </Box>
    </Box>
  );
};

export default index;
