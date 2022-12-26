import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

const InputField = ({ question, usedFor, setQuestions }) => {
  const handleChange = (event) => {
    if (usedFor === "reimbursement") {
      setQuestions((prev) => {
        return prev.map((q) => {
          let newQuestion = { ...q };
          if (newQuestion._id === question._id) {
            if (newQuestion.type === "50") {
              if (event.target.checked)
                newQuestion.answer?.push(event.target.value);
              else {
                newQuestion.answer = newQuestion.answer?.filter(
                  (ans) => ans !== event.target.value
                );
              }
            } else {
              newQuestion.answer = event.target.value;
            }
          }
          return newQuestion;
        });
      });
    }
  };

  return (
    <>
      {question.type === "10" && (
        <TextField
          required={question.required}
          fullWidth
          placeholder={"Your answer"}
          label={question.question}
          onChange={handleChange}
          value={question.answer}
        />
      )}
      {question.type === "20" && (
        <TextField
          // variant={"filled"}
          required={question.required}
          fullWidth
          multiline
          rows={3}
          placeholder={"Your answer"}
          onChange={handleChange}
          label={question.question}
          value={question.answer}
        />
      )}
      {question.type === "30" && (
        <TextField
          // variant={"filled"}
          required={question.required}
          InputLabelProps={{ shrink: true }}
          fullWidth
          onChange={handleChange}
          type={"date"}
          label={question.question}
          value={question.answer}
        />
      )}
      {question.type === "40" && (
        <FormControl fullWidth required={question.required}>
          <FormLabel>{question.question}</FormLabel>
          <RadioGroup onChange={handleChange} value={question.answer}>
            {question.options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.value}
                control={<Radio checked={question.answer === option.value} />}
                label={option.value}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
      {question.type === "50" && (
        <FormControl fullWidth required={question.required}>
          <FormLabel>{question.question}</FormLabel>
          <FormGroup onChange={handleChange}>
            {question.checkbox.map((option) => (
              <FormControlLabel
                label={option.value}
                key={option.id}
                value={option.value}
                control={
                  <Checkbox
                    name={option.value}
                    checked={question.answer?.includes(option.value)}
                  />
                }
              />
            ))}
          </FormGroup>
        </FormControl>
      )}
      {question.type === "60" && (
        <TextField
          // variant={"filled"}
          required={question.required}
          select
          fullWidth
          onChange={handleChange}
          label={question.question}
          value={question.answer}
        >
          {question.dropDown.map((dropdown) => (
            <MenuItem key={dropdown.id} value={dropdown.value}>
              {dropdown.value}
            </MenuItem>
          ))}
        </TextField>
      )}
    </>
  );
};

export default InputField;
