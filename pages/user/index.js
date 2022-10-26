import Header from "../../components/header/header";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { UserHome } from "../../components/UserHome";
import { Auth } from "../../components/Auth";
import { Suspense, Fragment } from "react";
import { Cookies } from "react-cookie";
import { url, useUserProfile } from "../../Hooks/apiHooks";
import Error from "next/error";
import { Box, CircularProgress } from "@mui/material";
import Layout from "../../components/Layout";

export default function Home() {
  const { error, loading, userData } = useUserProfile();
  if (loading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  // if (error) return <Error statusCode={error} />;
  return (
    <>
      <Layout userData={userData} title={"Reimbursement"}>
        <UserHome userData={userData} />
      </Layout>
    </>
  );
}
