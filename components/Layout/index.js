import React from "react";
import { Box, CircularProgress } from "@mui/material";
import HeaderBar from "../header/header";
import Head from "next/head";
import { useUserProfile } from "../../Hooks/apiHooks";
export const drawerWidth = 280;

const Layout = ({ children, title: Header = "Reimbursement" }) => {
  const { error, loading, userData } = useUserProfile();
  if (loading)
    return (
      <Box sx={{ display: "flex", width: 1, justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  return (
    <>
      <Head>
        <title>{Header}</title>
      </Head>
      <HeaderBar userDetails={userData} />
      <Box
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          mt: { sm: 8, xs: "56.2px" },
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
