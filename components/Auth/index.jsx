import { CircularProgress, Box, Container, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserProfile } from "../../Hooks/apiHooks";
import { useState } from "react";
import Link from "next/link";
export const Auth = ({ children, user }) => {
  const [token, setToken] = useState(null);

  const [haveToken, setHaveToken] = useState(false);
  useEffect(() => {
    setHaveToken(true);
    setToken(localStorage.getItem("auth-token"));
  }, []);

  const { loading, userLoggedIn, userData } = useUserProfile({
    token: token,
  });

  const router = useRouter();

  useEffect(() => {
    if (haveToken) {
      if (!loading && userData) {
        if (userData.type === "admin" && router.asPath === "/")
          router.push("/admin");
        if (userData.type === "user" && router.asPath === "/admin")
          router.push("/");
      }
    }
  }, [loading, userLoggedIn, haveToken, userData]);

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
  return (
    <Box
      sx={{
        display: "flex",
        width: 1,
        height: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href={"/login"}>
        <Button variant="contained">Back To Login</Button>
      </Link>
    </Box>
  );
};
