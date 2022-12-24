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
import { submit, useFetch } from "../../../Hooks/apiHooks";
import { useRouter } from "next/router";
import Confirmation from "../../../components/Util/Confirmation";
import { snackBarAtom } from "../../../store";
import { useAtom } from "jotai";

const ViewForms = () => {
  const [forms, setForms] = React.useState([]);
  const [selectedForm, setSelectedForm] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const [loadingRemove, setLoadingRemove] = React.useState(false);

  const router = useRouter();
  const { data, loading, error } = useFetch("certificate/get");
  const [, setSnackBar] = useAtom(snackBarAtom);

  useEffect(() => {
    if (!loading) {
      if (error) {
        setForms([]);
      } else {
        setForms(data.data);
      }
    }
  }, [loading, data, error]);

  const deleteForm = (id) => {
    setSelectedForm(id);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setLoadingRemove(false);
    setSelectedForm(null);
  };

  const removeForm = () => {
    setLoadingRemove(true);
    submit("certificate/delete", { certificate_id: selectedForm }, "DELETE")
      .then((data) => {
        if (data.success) {
          setForms(forms.filter((form) => form._id !== selectedForm));
          setSnackBar({
            open: true,
            message: "Form deleted successfully",
            type: "success",
          });
          setOpenModal(false);
        } else {
          setSnackBar({
            open: true,
            message: data.message,
            type: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setSnackBar({
          open: true,
          message: err.message,
          type: "error",
        });
      })
      .finally(() => {
        setLoadingRemove(false);
      });
  };

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
                    <IconButton
                      color="primary"
                      onClick={() => deleteForm(form._id)}
                    >
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
        <Confirmation
          openModal={openModal}
          handleClose={handleClose}
          remove={removeForm}
          loadingRemove={loadingRemove}
        />
      </Container>
    </Layout>
  );
};

export default ViewForms;
