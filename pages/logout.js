import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useAtom } from "jotai";
import { snackBarAtom } from "../store";
import { Box, Stack, Typography } from "@mui/material";
import Loader from "../components/Util/Loader";

const Logout = () => {
  const router = useRouter();
  const [, , removeCookie] = useCookies();
  const [, setSnackBar] = useAtom(snackBarAtom);
  useEffect(() => {
    localStorage.removeItem("auth-token");
    sessionStorage.clear();
    setSnackBar({
      type: "success",
      message: "Logout successfully",
      open: true,
    });
    removeCookie("auth_token", { path: "/" });
    removeCookie("loginType", { path: "/" });
    router.push("login");
  }, [removeCookie, router, setSnackBar]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Stack spacing={2} width={"100%"} direction="column" alignItems="center">
        <Loader />
      </Stack>
    </Box>
  );
};

export default Logout;
