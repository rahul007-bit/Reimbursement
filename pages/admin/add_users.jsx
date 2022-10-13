import {
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import HeaderBar from "../../components/header/header";

export default function Add_user() {
  return (
    <>
      <HeaderBar />
      <Container sx={{ my: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Users</Typography>
            <Divider />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
