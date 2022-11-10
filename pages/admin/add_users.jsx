import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import HeaderBar from "../../components/header/header";
import UserTable from "../../components/Admin/UserTable";
import { useUserProfile } from "../../Hooks/apiHooks";
import Error from "next/error";
import Layout from "../../components/Layout";

export default function AddUser() {
  const { error, loading, userData } = useUserProfile();
  if (loading)
    return (
      <Box sx={{ display: "flex", width: 1, justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );

  // if (error) return <Error statusCode={error} />;

  return (
    <Layout userData={userData}>
      <Container sx={{ mt: 10 }}>
        <Card>
          <CardContent>
            <Typography variant={"h5"}>Users</Typography>
            <Divider />
            <UserTable />
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
}
