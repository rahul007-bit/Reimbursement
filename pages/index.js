import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { Box, Stack, Typography } from "@mui/material";
import Loader from "../components/Util/Loader";

const Index = () => {
  const router = useRouter();
  const cookies = useCookies(["auth_token", "loginType"]);
  useEffect(() => {
    if (cookies[0].auth_token) {
      if (
        cookies[0].loginType === "admin" ||
        cookies[0].loginType === "sub_admin"
      ) {
        router.push("/admin");
      } else if (
        cookies[0].loginType === "user" ||
        cookies[0].loginType === "receptionist"
      ) {
        router.push("/user");
      }
    } else router.push("/login");
  }, [cookies, router]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Stack spacing={2} direction="column" alignItems="center">
        <Loader />
        <Typography variant="h5">
          Please wait while we are redirecting you to your destination...
        </Typography>
      </Stack>
    </Box>
  );
};

export default Index;
