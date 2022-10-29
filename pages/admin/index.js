import React from "react";
import AdminDashboard from "../../components/Admin";
import Header from "../../components/header/header";
import { Auth } from "../../components/Auth/index";
import Error from "next/error";
import { useUserProfile } from "../../Hooks/apiHooks";
import { Box, CircularProgress } from "@mui/material";
import Layout from "../../components/Layout";

const AdminHome = () => {
  const { error, loading, userData } = useUserProfile();
  if (loading)
    return (
      <Box sx={{ display: "flex", width: 1 }}>
        <CircularProgress />
      </Box>
    );

  // if (error) return <Error statusCode={error} />;

  return (
    <Layout userData={userData}>
      <AdminDashboard />
    </Layout>
  );
};

export default AdminHome;
