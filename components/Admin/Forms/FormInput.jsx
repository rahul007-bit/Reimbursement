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

const FormInput = ({ question }) => {
  return (
    <>
      {question.type === "10" && (
        <TextField
          variant={"filled"}
          required={question.required}
          fullWidth
          placeholder={"Single Line Text"}
          label={question.question}
        />
      )}
      {question.type === "20" && (
        <TextField
          variant={"filled"}
          required={question.required}
          fullWidth
          multiline
          rows={3}
          maxRows={4}
          placeholder={"Multi Line Text"}
          label={question.question}
        />
      )}
      {question.type === "30" && (
        <TextField
          variant={"filled"}
          required={question.required}
          InputLabelProps={{ shrink: true }}
          fullWidth
          type={"date"}
          label={question.question}
        />
      )}
      {question.type === "40" && (
        <FormControl fullWidth required={question.required}>
          <FormLabel>{question.question}</FormLabel>
          <RadioGroup>
            {question.options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.value}
                control={<Radio />}
                label={option.value}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
      {question.type === "50" && (
        <FormControl fullWidth required={question.required}>
          <FormLabel>{question.question}</FormLabel>
          <FormGroup>
            {question.checkbox.map((option) => (
              <FormControlLabel
                label={option.value}
                key={option.id}
                value={option.value}
                control={<Checkbox name={option.value} />}
              />
            ))}
          </FormGroup>
        </FormControl>
      )}
      {question.type === "60" && (
        <TextField
          variant={"filled"}
          required={question.required}
          select
          label={question.question}
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

export default FormInput;
