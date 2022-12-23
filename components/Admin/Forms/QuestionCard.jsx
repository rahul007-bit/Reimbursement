import React from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  CancelOutlined,
  ContentCopyOutlined,
  Delete,
  DeleteOutlineOutlined,
  DragHandleOutlined,
} from "@mui/icons-material";
import { v4 as uuid } from "uuid";
import FormInput from "./FormInput";
import { Draggable } from "react-beautiful-dnd";
const QuestionCard = ({
  addQuestion,
  question,
  id,
  deleteQuestion,
  handleQuestionChange,
  index,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Grid
          item
          xs={6}
          ref={provided.innerRef}
          sx={{
            px: 0,
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card variant="outlined">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "grab",
              }}
            >
              <DragHandleOutlined />
            </Box>
            <Divider />
            <CardContent
              sx={{
                padding: "0.5rem",
                py: 0,
              }}
            >
              <Grid container spacing={2} marginY={1}>
                <Grid item xs={7}>
                  <TextField
                    fullWidth
                    variant={"outlined"}
                    defaultValue={"Question ?"}
                    placeholder={"Question"}
                    value={question.question}
                    onChange={(e) =>
                      handleQuestionChange(id, { question: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={5}>
                  <FormControl fullWidth>
                    <Select
                      onChange={(e) => {
                        let type = e.target.value;
                        handleQuestionChange(id, { type: type });
                      }}
                      value={question.type}
                    >
                      <MenuItem value={10}>Single Line Text</MenuItem>
                      <MenuItem value={20}>Multi Line Text</MenuItem>
                      <MenuItem value={30}>Date</MenuItem>
                      <MenuItem value={40}>Options</MenuItem>
                      <MenuItem value={50}>Checkbox</MenuItem>
                      <MenuItem value={60}>Drop Down Menu</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} marginY={1}>
                <Grid item xs={7}>
                  {question.type === 10 && (
                    <TextField
                      fullWidth
                      disabled
                      placeholder={"Single Line Text"}
                    />
                  )}
                  {question.type === 20 && (
                    <TextField
                      fullWidth
                      disabled
                      multiline
                      rows={3}
                      maxRows={4}
                      placeholder={"Multi Line Text"}
                    />
                  )}
                  {question.type === 30 && (
                    <TextField fullWidth disabled type={"date"} />
                  )}
                  {question.type === 40 && (
                    <Stack gap={1}>
                      {question.options.map((option, index) => (
                        <Stack direction={"row"} gap={1} key={option.id}>
                          <Radio checked value={option.value} />
                          <TextField
                            value={option.value}
                            variant={"standard"}
                            onChange={(e) => {
                              let options = question.options;
                              options[index].value = e.target.value;
                              handleQuestionChange(id, { options: options });
                            }}
                          />
                          <IconButton
                            onClick={() => {
                              let options = question.options;
                              options.splice(index, 1);
                              handleQuestionChange(id, { options: options });
                            }}
                          >
                            <CancelOutlined />
                          </IconButton>
                        </Stack>
                      ))}
                      <Button
                        sx={{
                          width: "50%",
                          minWidth: "fit-content",
                        }}
                        variant={"outlined"}
                        onClick={() => {
                          let options = question.options;
                          options.push({
                            value: "option",
                            id: uuid(),
                          });
                          handleQuestionChange(id, { options: options });
                        }}
                      >
                        Add Option
                      </Button>
                    </Stack>
                  )}
                  {question.type === 50 && (
                    <Stack gap={1}>
                      {question.checkbox.map((checkbox, index) => (
                        <Stack direction={"row"} gap={1} key={checkbox.id}>
                          <Checkbox checked value={checkbox.value} />
                          <TextField
                            value={checkbox.value}
                            variant={"standard"}
                            onChange={(e) => {
                              let checkbox = question.checkbox;
                              checkbox[index].value = e.target.value;
                              handleQuestionChange(id, { checkbox: checkbox });
                            }}
                          />
                          <IconButton
                            onClick={() => {
                              let checkbox = question.checkbox;
                              checkbox.splice(index, 1);
                              handleQuestionChange(id, { checkbox: checkbox });
                            }}
                          >
                            <CancelOutlined />
                          </IconButton>
                        </Stack>
                      ))}
                      <Button
                        sx={{
                          width: "50%",
                          minWidth: "fit-content",
                        }}
                        variant={"outlined"}
                        onClick={() => {
                          let checkbox = question.checkbox;
                          checkbox.push({
                            value: "Checkbox",
                            id: uuid(),
                          });
                          handleQuestionChange(id, { checkbox: checkbox });
                        }}
                      >
                        Add Checkbox
                      </Button>
                    </Stack>
                  )}
                  {question.type === 60 && (
                    <Stack gap={1}>
                      {question.dropDown.map((dropdown, index) => (
                        <Stack direction={"row"} gap={1} key={dropdown.id}>
                          <TextField
                            value={dropdown.value}
                            variant={"standard"}
                            onChange={(e) => {
                              let dropdown = question.dropdown;
                              dropdown[index].value = e.target.value;
                              handleQuestionChange(id, { dropDown: dropdown });
                            }}
                          />
                          <IconButton
                            onClick={() => {
                              let dropdown = question.dropdown;
                              dropdown.splice(index, 1);
                              handleQuestionChange(id, { dropDown: dropdown });
                            }}
                          >
                            <CancelOutlined />
                          </IconButton>
                        </Stack>
                      ))}
                      <Button
                        sx={{
                          width: "50%",
                          minWidth: "fit-content",
                        }}
                        variant={"outlined"}
                        onClick={() => {
                          let dropdown = question.dropDown;
                          dropdown.push({
                            value: "Dropdown",
                            id: uuid(),
                          });
                          handleQuestionChange(id, { dropdown: dropdown });
                        }}
                      >
                        Add Dropdown
                      </Button>
                    </Stack>
                  )}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Stack margin={2} gap={1}>
                    <Typography variant={"caption"}>Preview</Typography>
                    <FormInput question={question} />
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "0",
              }}
            >
              <Tooltip title={"Duplicate"}>
                <IconButton onClick={() => addQuestion(question)}>
                  <ContentCopyOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip title={"Delete"}>
                <IconButton onClick={() => deleteQuestion(id)}>
                  <DeleteOutlineOutlined />
                </IconButton>
              </Tooltip>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  height: 30,
                  mx: 1,
                  marginY: "auto",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0.5rem",
                }}
              >
                <Typography variant={"body1"}>Required</Typography>
                <Switch
                  checked={question.required}
                  onClick={() =>
                    handleQuestionChange(id, { required: !question.required })
                  }
                />
              </Box>
            </CardActions>
          </Card>
        </Grid>
      )}
    </Draggable>
  );
};

export default QuestionCard;
