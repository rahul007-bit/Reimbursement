import React, { useEffect, useState } from "react";

import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu as MenuIcon } from "@mui/icons-material";
import { drawerWidth } from "../Layout";
import { default as DrawerItem } from "./Drawer";

const settings = [
  { name: "Reset Password", link: "/resetpassword" },
  { name: "Dashboard", link: "/" },
  { name: "Logout", link: "/logout" },
];

const HeaderBar = ({ children, userDetails, window }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(null);

  const router = useRouter();
  useEffect(() => {
    // const token = localStorage.getItem("auth-token");
    setUser(userDetails);
  }, [userDetails]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: "rgb(38 40 112 / 87%)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{
                display: "flex",
                width: 1,
                justifyContent: "space-between",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link href="/">
                    <Typography
                      variant="h6"
                      noWrap
                      sx={{
                        mr: 2,
                        display: { xs: "none", md: "flex" },
                        fontFamily: "Fira Mono",
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                        cursor: "pointer",
                      }}
                    >
                      Reimbursement
                    </Typography>
                  </Link>

                  <Link href={"/"}>
                    <Typography
                      variant="h5"
                      noWrap
                      sx={{
                        mr: 2,
                        display: { xs: "flex", md: "none" },
                        flexGrow: 1,
                        fontFamily: "Fira Mono",
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      Reimbursement
                    </Typography>
                  </Link>
                </Box>
              </>
            </Toolbar>
          </Container>
        </AppBar>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerItem userDetails={userDetails} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <DrawerItem userDetails={userDetails} />
        </Drawer>
        {children}
      </Box>
    </>
  );
};
export default HeaderBar;
