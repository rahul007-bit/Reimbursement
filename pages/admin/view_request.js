import React from "react";
import ViewRequestTable from "../../components/Admin/ViewRequestTable";
import { useUserProfile } from "../../Hooks/apiHooks";
import { Box, CircularProgress } from "@mui/material";
import Layout from "../../components/Layout";

const ViewRequest = () => {
  const { error, loading, userData } = useUserProfile();
  if (loading)
    return (
      <Box sx={{ display: "flex", width: 1, justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );

  // if (error) {
  //   console.log(error);
  //   return <Error statusCode={error} />;
  // }

  return (
    <Layout title="Request" path={"/admin/view_request"}>
      <ViewRequestTable userData={userData} />
    </Layout>
  );
};

export default ViewRequest;
