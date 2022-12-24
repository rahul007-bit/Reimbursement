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
  Grid,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import InputField from "../../../components/Forms/InputFields";
import Layout from "../../../components/Layout";
import { useFetch } from "../../../Hooks/apiHooks";

const ViewForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = React.useState({});

  const [questions, setQuestions] = React.useState([]);

  const { data, loading, error } = useFetch(
    `certificate/get?certificate_id=${id}`,
    [id]
  );

  useEffect(() => {
    if (!loading) {
      if (error) {
        setForm([]);
      } else {
        setForm(data.data[0]);
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
        {!loading ? (
          form._id ? (
            <Paper
              sx={{ maxWidth: "1200px", my: 5, width: 1, p: 3 }}
              variant={"outlined"}
            >
              <Grid container spacing={2} columns={1}>
                <Grid item xs={12}>
                  <Typography variant="h5">{form.certificate_name}</Typography>
                  <Divider />
                </Grid>
                {form.questions.map((question, index) => (
                  <Grid item xs={12} key={question._id}>
                    <Card variant="outlined">
                      <CardContent>
                        <InputField question={question} index={index} />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Tooltip title="Back">
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{ m: 1 }}
                          onClick={() => {
                            router.back();
                          }}
                        >
                          Back
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Button fullWidth sx={{ m: 1 }} onClick={() => {}}>
                          Delete
                        </Button>
                      </Tooltip>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          ) : (
            <h1>Form not found</h1>
          )
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default ViewForm;
