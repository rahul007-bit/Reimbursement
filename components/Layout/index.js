import React from "react";
import { Box } from "@mui/material";
import HeaderBar from "../header/header";
import Head from "next/head";
export const drawerWidth = 280;

const Layout = ({ children, userData, title: Header = "Reimbursement" }) => {
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
          mt: 8,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
