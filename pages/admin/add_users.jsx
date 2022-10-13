import {
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import HeaderBar from "../../components/header/header";
import UserTable from "../../components/Admin/UserTable";

export default function AddUser() {
  return (
    <>
      <HeaderBar />
      <Container sx={{ my: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Users</Typography>
            <Divider />
            <UserTable />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
