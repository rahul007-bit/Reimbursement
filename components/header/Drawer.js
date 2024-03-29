import React from "react";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Compress,
  Dashboard,
  FeedOutlined,
  HowToReg,
  Login,
  Logout,
  Password,
  PersonAdd,
  RequestQuote,
} from "@mui/icons-material";
import Link from "next/link";

const Drawer = ({ userDetails }) => {
  return (
    <div>
      <Box>
        {userDetails && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Avatar
                sx={{
                  width: 1,
                  height: "auto",
                  aspectRatio: "1/1",
                  maxWidth: "100px",
                  my: 1,
                }}
                src={userDetails && userDetails?.user?.profile}
                alt={userDetails ? userDetails?.user.first_name : "username"}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                marginX: 2,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant={"h5"}>
                {userDetails ? userDetails.user.first_name : "username"}
              </Typography>
              <Typography variant={"h6"}>
                {userDetails ? userDetails.user.moodleId : "moodleId"}
              </Typography>
            </Box>
          </Box>
        )}
        {/*</Box>*/}
      </Box>
      <Divider />
      <List>
        {/* {
                name: "Reset Password",
                link: "/resetpassword",
                icon: <Password />,
              }, */}
        {userDetails
          ? [
              {
                name: "Dashboard",
                link:
                  userDetails.type === "admin" ||
                  userDetails.type === "sub_admin"
                    ? "/admin"
                    : "/user",
                icon: <Dashboard />,
              },

              {
                name: "Log-out",
                link: "/logout",
                icon: <Logout />,
              },
            ].map((text, index) => (
              <ListItem key={text.name} disablePadding>
                <Link href={text.link}>
                  <ListItemButton>
                    <ListItemIcon>{text.icon}</ListItemIcon>
                    <ListItemText primary={text.name} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))
          : [
              { name: "Login", link: "/login", icon: <Login /> },
              { name: "Sign up", link: "/signup", icon: <HowToReg /> },
            ].map((text, index) => (
              <ListItem key={text.name} disablePadding>
                <Link href={text.link}>
                  <ListItemButton>
                    <ListItemIcon>{text.icon}</ListItemIcon>
                    <ListItemText primary={text.name} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
      </List>
      <Divider />
      {userDetails &&
        (userDetails.type === "admin" || userDetails.type === "sub_admin") && (
          <List>
            <ListItem disablePadding>
              <Link href={"/admin/view_request"}>
                <ListItemButton>
                  <ListItemIcon>
                    <RequestQuote />
                  </ListItemIcon>
                  <ListItemText primary={"View Request"} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <Link href={"/admin/add_users"}>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonAdd />
                  </ListItemIcon>

                  <ListItemText primary={"Add Users"} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <Link href={"/admin/view-forms"}>
                <ListItemButton>
                  <ListItemIcon>
                    <FeedOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Forms"} />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        )}
      {userDetails && userDetails.type === "user" && (
        <List>
          <ListItem disablePadding>
            <Link href={"/user/reimbursement"}>
              <ListItemButton>
                <ListItemIcon>
                  <RequestQuote />
                </ListItemIcon>
                <ListItemText primary={"Apply new Request"} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href={"/user/compress-pdf"}>
              <ListItemButton>
                <ListItemIcon>
                  <Compress />
                </ListItemIcon>
                <ListItemText primary={"Compress Pdf"} />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      )}
    </div>
  );
};

export default Drawer;
