import { CircularProgress, Box } from "@mui/material";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserProfile } from "../../Hooks/apiHooks";
import { useState } from "react";
export const Auth = ({ children, user }) => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem("auth-token"));
  }, []);
  const { loading, userLoggedIn, userData } = useUserProfile({
    token: token,
  });
  const router = useRouter();

  useEffect(() => {
    if (!userLoggedIn && !loading && !userData) {
      console.log(loading);
      router.push("/login");
    }
    if (!loading && userData) {
      if (userData.type === "admin" && router.asPath === "/")
        router.push("/admin");
      if (userData.type === "user" && router.asPath === "/admin")
        router.push("/");
    }
  }, [loading, router, userData, userLoggedIn]);

  if (loading)
    return (
      <>
        <Box
          sx={{
            display: "flex",
            height: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  if (userData) return <div>{children}</div>;
  return <></>;
};
