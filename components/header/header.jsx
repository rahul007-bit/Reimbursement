import React from "react";

import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// const pages = ["Products", "Pricing", "Blog"];
const settings = [
  { name: "Reset Password", link: "/resetpassword" },
  { name: "Dashboard", link: "/" },
  { name: "Logout", link: "/logout" },
];

const HeaderBar = ({ children }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    // const token = localStorage.getItem("auth-token");
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);
  // useEffect(() => {
  //   if (user) {
  //     setUser(false);
  //   }
  // }, [user]);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    // console.log()
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{
                display: "flex",
                width: 1,
                justifyContent: "space-between",
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

              {user ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {user.type === "admin" && (
                      <Box sx={{ display: "flex", mx: 3 }}>
                        <Link href={"/admin/view_request"}>
                          <Typography
                            sx={{ cursor: "pointer" }}
                            marginRight={2}
                          >
                            View Request
                          </Typography>
                        </Link>
                        <Link href={"/admin/add_users"}>
                          <Typography sx={{ cursor: "pointer" }}>
                            Add users
                          </Typography>
                        </Link>
                      </Box>
                    )}
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt={user.user.first_name}
                          src="/static/images/avatar/2.jpg"
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <Link
                          href={setting.link || ""}
                          key={JSON.stringify(setting)}
                        >
                          <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">
                              {setting.name}
                            </Typography>
                          </MenuItem>
                        </Link>
                      ))}
                    </Menu>
                  </Box>
                </>
              ) : (
                <>
                  <Box sx={{ display: "flex" }}>
                    <Link href={"/login"}>
                      <Typography sx={{ cursor: "pointer" }} marginRight={2}>
                        Login
                      </Typography>
                    </Link>
                    <Link href={"/signup"}>
                      <Typography sx={{ cursor: "pointer" }}>
                        Sign Up
                      </Typography>
                    </Link>
                  </Box>
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>
        {children}
      </Box>
    </>
  );
};
export default HeaderBar;
