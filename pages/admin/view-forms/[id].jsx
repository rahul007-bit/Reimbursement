import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  ListItem,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import InputField from "../../../components/Forms/InputFields";
import Layout from "../../../components/Layout";
import { submit, useFetch } from "../../../Hooks/apiHooks";

const ViewForm = ({ reimbursement }) => {
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
          flexDirection: "column",
        }}
      >
        {!loading ? (
          form._id ? (
            <>
              <Paper
                sx={{ maxWidth: "1200px", my: 5, width: 1, p: 3 }}
                variant={"outlined"}
              >
                <Grid container spacing={2} columns={1}>
                  <Grid item xs={12}>
                    <Typography variant="h5">
                      {form.certificate_name}
                    </Typography>
                    <Divider />
                  </Grid>
                  {form.questions.map((question, index) => (
                    <Grid item xs={12} key={question._id}>
                      <Card variant="outlined">
                        <CardContent>
                          <InputField question={question} index={index} />
                          <Typography marginY={2} color={"GrayText"}>
                            Answers given by the user:
                          </Typography>
                          <Paper
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              flexWrap: "wrap",
                              listStyle: "none",
                              p: 0.5,
                              m: 0,
                            }}
                            variant="outlined"
                            component="ul"
                          >
                            {reimbursement.length > 0 &&
                              reimbursement.map((data) => {
                                const reimbursementDetails =
                                  data.reimbursementDetails;
                                const question =
                                  reimbursementDetails.questions[index];
                                return (
                                  <ListItem
                                    key={question?._id}
                                    sx={{
                                      width: "fit-content",
                                    }}
                                  >
                                    <Chip
                                      label={
                                        question?.type === "50"
                                          ? question.answer.join(", ")
                                          : question?.answer
                                      }
                                    />
                                  </ListItem>
                                );
                              })}
                          </Paper>
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
                        <Tooltip title="Edit">
                          <Button
                            fullWidth
                            sx={{ m: 1 }}
                            onClick={() => {
                              router.push(
                                `/admin/add-form?id=${form._id}&mode=edit`
                              );
                            }}
                          >
                            Edit
                          </Button>
                        </Tooltip>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </>
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

ViewForm.getInitialProps = async (ctx) => {
  try {
    const { id } = ctx.query;

    const response = await submit(
      "getReimburse?certificate_id=" + id,
      {},
      "GET"
    );

    if (response.status !== 200) {
      return {
        reimbursement: [],
      };
    }

    return {
      reimbursement: response.data,
    };
  } catch (error) {
    return { reimbursement: [] };
  }
};

export default ViewForm;
