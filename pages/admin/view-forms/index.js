import { Add, DeleteForever, Edit, Visibility } from "@mui/icons-material";
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
import React, { useEffect } from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import { useFetch } from "../../../Hooks/apiHooks";
import { useRouter } from "next/router";

const ViewForms = () => {
  const [forms, setForms] = React.useState([]);
  const router = useRouter();
  const { data, loading, error } = useFetch("certificate/get");
  useEffect(() => {
    if (!loading) {
      if (error) {
        setForms([]);
      } else {
        setForms(data.data);
      }
    }
  }, [loading, data, error]);

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
          {!loading ? (
            forms.map((form) => (
              <Card
                sx={{ display: "flex", justifyContent: "space-between", my: 1 }}
                key={form._id}
                variant={"outlined"}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography variant={"body1"} fontWeight={"bold"}>
                      {form.certificate_name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Divider orientation="vertical" sx={{ mr: 1 }} />
                  <Tooltip title="View">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        router.push({
                          pathname: "/admin/view-forms/[id]",
                          query: { id: form._id },
                        });
                      }}
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="primary">
                      <DeleteForever />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            ))
          ) : (
            <Box sx={{ display: "flex", width: 1, justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}
        </Paper>
      </Container>
    </Layout>
  );
};

export default ViewForms;
