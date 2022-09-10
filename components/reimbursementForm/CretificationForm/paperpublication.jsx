import React from "react";
import {
  Stack,
  Box,
  TextField,
  Typography,
  FormControlLabel,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
} from "@mui/material";

const PaperPublication = ({ handleChange }) => {
  return (
    <>
      <TextField
        fullWidth
        label="Name of Journal/Conference"
        id="outlined-required"
        required
      ></TextField>
      <TextField
        fullWidth
        label="Title of Publication"
        id="outlined-required"
        required
      ></TextField>

      <TextField
        id="outlined-textarea"
        label="Name of Author/Authors"
        placeholder="Placeholder"
        multiline
      />
      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        <TextField
          fullWidth
          label="Reimbursement Amount"
          id="outlined-required"
          required
        ></TextField>

        <TextField
          fullWidth
          label="Conference Date"
          id="outlined-required"
          type="date"
          // defaultValue="2020-05-26"
          InputLabelProps={{
            shrink: true,
          }}
          required
        ></TextField>
      </Stack>

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Scopus Index</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          <FormControlLabel value="female" control={<Radio />} label="Yes" />
          <FormControlLabel value="male" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default PaperPublication;
