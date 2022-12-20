import { Add, Edit, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";

const ViewForms = () => {
  return (
    <Layout title="View Form">
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{ maxWidth: "1200px", my: 5, width: 1, p: 3 }}
          variant={"outlined"}
        >
          <Typography variant="h4">Active Forms</Typography>

          <Divider
            sx={{
              my: 2,
            }}
          />
          <Tooltip title="Add Form">
            <Link href="/admin/add-form">
              <Button
                color="primary"
                sx={{
                  mb: 2,
                }}
                variant="contained"
                startIcon={<Add />}
              >
                Add Form
              </Button>
            </Link>
          </Tooltip>
          <Card sx={{ display: "flex", justifyContent: "space-between" }}>
            <CardActionArea>
              <CardContent>
                <Typography variant={"body1"} fontWeight={"bold"}>
                  Form 1
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Divider orientation="vertical" sx={{ mr: 1 }} />
              <Tooltip title="View">
                <IconButton color="primary">
                  <Visibility />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton color="primary">
                  <Edit />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        </Paper>
      </Container>
    </Layout>
  );
};

export default ViewForms;
