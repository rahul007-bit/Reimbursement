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
        name="journal_name"
        onChange={(e) =>
          handleChange("additionalDetails", {
            [e.target.name]: e.target.value,
          })
        }
      ></TextField>
      <TextField
        fullWidth
        label="Title of Publication"
        id="outlined-required"
        required
        name="publication_title"
        onChange={(e) =>
          handleChange("additionalDetails", {
            [e.target.name]: e.target.value,
          })
        }
      ></TextField>

      <TextField
        id="outlined-textarea"
        label="Name of Author/Authors"
        multiline
        required
        name="author_name"
        onChange={(e) =>
          handleChange("additionalDetails", {
            [e.target.name]: e.target.value,
          })
        }
      />
      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        <TextField
          fullWidth
          label="Reimbursement Amount"
          id="outlined-required"
          name={"amountToReimbursement"}
          required
          onChange={(e) => handleChange(e.target.name, e.target.value)}
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
          name={"date"}
          onchange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
        ></TextField>
      </Stack>

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
          Scopus Indexed
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default PaperPublication;
