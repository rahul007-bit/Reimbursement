import React, { useEffect } from "react";
import { Box, CircularProgress, LinearProgress } from "@mui/material";
import HeaderBar from "../header/header";
import Head from "next/head";
import { useUserProfile } from "../../Hooks/apiHooks";
import { useAtom } from "jotai";
import { snackBarAtom } from "../../store";
import Loader from "../Util/Loader";

export const drawerWidth = 280;

const Layout = ({ children, title: Header = "Reimbursement" }) => {
  const { error, loading, userData } = useUserProfile();
  const [, setSnackBar] = useAtom(snackBarAtom);

  useEffect(() => {
    if (!loading) {
      if (error?.status === 500) {
        setSnackBar({
          open: true,
          message: error.message,
          type: "error",
        });
      }
    }
  }, [userData, error, loading, setSnackBar]);

  if (loading) return <Loader />;

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
