import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import {
  Button,
  Card,
  CardActions,
  Container,
  Divider,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import QuestionCard from "../../components/Admin/Forms/QuestionCard";
import FormName from "../../components/Admin/Forms/FormName";
import { v4 as uuid } from "uuid";
import { snackBarAtom } from "../../store";
import { useAtom } from "jotai";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { submit } from "../../Hooks/apiHooks";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";

function AddForm() {
  const [formName, setFormName] = React.useState("Default Form Name");
  const [loading, setLoading] = React.useState(false);
  const [questions, setQuestions] = React.useState([
    {
      id: uuid(),
      question: "Question?",
      type: "10",
      options: [],
      checkbox: [],
      dropDown: [],
      required: false,
    },
  ]);

  const [, setSnackBar] = useAtom(snackBarAtom);

  const router = useRouter();

  const { mode, id } = router.query;

  useEffect(() => {
    if (mode === "edit") {
      const fetchForm = async () => {
        const { data, error } = await submit(
          "certificate/get?certificate_id=" + id,
          {},
          "GET"
        );
        if (error) {
          setSnackBar({
            open: true,
            message: error,
            severity: "error",
          });
        } else {
          const certificate = data[0];
          setFormName(certificate.certificate_name);
          setQuestions(certificate.questions);
        }
      };
      fetchForm();
    }
  }, [mode, id, setSnackBar]);

  const addQuestion = (isDuplicate) => {
    if (isDuplicate.question) {
      setSnackBar({
        open: true,
        message: "Question added at the end",
        severity: "info",
      });
      setQuestions((prev) => {
        return [
          ...prev,
          {
            ...isDuplicate,
            id: uuid(),
            options: isDuplicate.options.map((option) => {
              return {
                ...option,
                id: uuid(),
              };
            }),
            checkbox: isDuplicate.checkbox.map((checkbox) => {
              return {
                ...checkbox,
                id: uuid(),
              };
            }),
            dropDown: isDuplicate.dropDown.map((dropDown) => {
              return {
                ...dropDown,
                id: uuid(),
              };
            }),
          },
        ];
      });
    } else
      setQuestions((prev) => [
        ...prev,
        {
          id: uuid(),
          question: "Question?",
          type: "10",
          options: [],
          checkbox: [],
          dropDown: [],
          required: false,
        },
      ]);
  };

  const deleteQuestion = (id) => {
    setQuestions((prev) => {
      return prev.filter((question) => question.id !== id);
    });
  };

  const handleQuestionChange = (id, questionChange) => {
    setQuestions((prev) => {
      return prev.map((question) => {
        if (question.id === id) {
          return { ...question, ...questionChange };
        } else return question;
      });
    });
  };

  const validateForm = () => {
    let isValid = true;
    if (questions.length === 0) {
      isValid = false;
      setSnackBar({
        open: true,
        message: "Please add at least one question",
        type: "error",
      });
      return isValid;
    }
    questions.forEach((question, index) => {
      if (question.question === "") {
        isValid = false;
        setSnackBar({
          open: true,
          message: "Question " + (index + 1) + " is empty",
          type: "error",
        });
        return isValid;
      }
      if (!question.type) {
        isValid = false;
        setSnackBar({
          open: true,
          message: "Please select a type for questions " + (index + 1),
          type: "error",
        });
        return isValid;
      }
      if (question.type === "40") {
        if (question.options.length < 2) {
          isValid = false;
          setSnackBar({
            open: true,
            message:
              "Please add at least 2 options for questions number " +
              (index + 1),
            type: "error",
          });
          return isValid;
        }
      }
      if (question.type === "50") {
        if (question.checkbox.length < 2) {
          isValid = false;
          setSnackBar({
            open: true,
            message:
              "Please add at least 2 checkboxes for questions " + (index + 1),
            type: "error",
          });
          return isValid;
        }
      }
      if (question.type === "60") {
        if (question.dropDown.length < 2) {
          isValid = false;
          setSnackBar({
            open: true,
            message:
              "Please add at least 2 dropdown options for questions " +
              (index + 1),
            type: "error",
          });
          return isValid;
        }
      }
    });
    return isValid;
  };

  const saveForm = () => {
    setLoading(true);
    if (validateForm()) {
      //   sanitize form data
      let sanitizedQuestions = questions.map((question) => {
        if (question.type === "40") {
          question.checkbox = [];
          question.dropDown = [];
        }
        if (question.type === "50") {
          question.options = [];
          question.dropDown = [];
        }
        if (question.type === "60") {
          question.options = [];
          question.checkbox = [];
        }

        return question;
      });
      if (mode === "edit") {
        submit(
          "certificate/update",
          {
            certificate_id: id,
            certificate_name: formName,
            questions: sanitizedQuestions,
          },
          "PUT"
        )
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              setSnackBar({
                open: true,
                message: "Form Saved",
                type: "success",
              });
              router.push("view-forms");
            } else
              setSnackBar({
                open: true,
                message: "Failed to Save Form",
                type: "error",
              });
          })
          .catch((err) => {
            console.log(err);
            setSnackBar({
              open: true,
              message: "Failed to Save Form",
              type: "error",
            });
          })
          .finally(() => setLoading(false));
        setSnackBar({
          open: true,
          message: "Form Updated Successfully",
          type: "success",
        });
        return;
      }

      submit(
        "certificate/create",
        {
          certificate_name: formName,
          questions: sanitizedQuestions,
        },
        "POST"
      )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setSnackBar({
              open: true,
              message: "Form Saved",
              type: "success",
            });
            router.push("view-forms");
          } else
            setSnackBar({
              open: true,
              message: "Form Save Failed",
              type: "error",
            });
          setSnackBar({
            open: true,
            message: "Form Created Successfully",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          setSnackBar({
            open: true,
            message: "Form Save Failed",
            type: "error",
          });
        })
        .finally(() => setLoading(false));
    } else setLoading(false);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items, questions);
    setQuestions(items);
  };

  return (
    <Layout title="Add Form" path={"/admin/view-forms"}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper sx={{ maxWidth: "1200px", my: 5, width: 1, p: 3 }} elevation={0}>
          <Typography variant="h5">
            {mode === "edit" ? "Edit Form" : "Add Form"}
          </Typography>

          <Divider
            sx={{
              my: 2,
            }}
          />
          <Grid container spacing={2} columns={1}>
            <Grid item xs={6}>
              <FormName formName={formName} setFormName={setFormName} />
            </Grid>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="questions">
                {(provided) => (
                  <Grid
                    container
                    item
                    spacing={2}
                    columns={1}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {questions.map((question, index) => (
                      <QuestionCard
                        key={question.id}
                        addQuestion={addQuestion}
                        question={question}
                        id={question.id}
                        index={index}
                        deleteQuestion={deleteQuestion}
                        handleQuestionChange={handleQuestionChange}
                      />
                    ))}
                    {provided.placeholder}
                  </Grid>
                )}
              </Droppable>
            </DragDropContext>
            <Grid item xs={6}>
              <Card variant="outlined">
                <CardActions>
                  <Tooltip title={"Add Question"}>
                    <Button fullWidth onClick={addQuestion}>
                      <Add />
                    </Button>
                  </Tooltip>
                  <Tooltip title={"Save Form"}>
                    <LoadingButton
                      fullWidth
                      variant={"contained"}
                      onClick={saveForm}
                      loading={loading}
                    >
                      Save
                    </LoadingButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
}

export default AddForm;
