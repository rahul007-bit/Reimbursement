import React from "react";
import ReimbursementForm from "../../components/reimbursementForm/ReimbursementForm";
import Head from "next/head";
import Layout from "../../components/Layout";
import { useUserProfile } from "../../Hooks/apiHooks";
import { Box, CircularProgress } from "@mui/material";

const Reimbursement = () => {
  const { error, loading, userData } = useUserProfile();
  if (loading)
    return (
      <Box sx={{ display: "flex", width: 1, justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  return (
    <>
      <Layout userData={userData} title={"Apply"} path={"/user/reimbursement"}>
        <ReimbursementForm user={userData} />
      </Layout>
    </>
  );
};

export default Reimbursement;
