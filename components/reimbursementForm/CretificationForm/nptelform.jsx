import React from "react";
import { Stack, Box, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const NptelForm = ({ handleChange }) => {
  return (
    <>
      <Stack direction={{ sm: "column", md: "row" }} gap={1}>
        <TextField
          fullWidth
          label="Course Name"
          id="outlined-required"
          required
          name={"courseName"}
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[{ label: "First Half" }, { label: "Second half" }]}
          sx={{ minWidth: "260px" }}
          renderInput={(params) => (
            <TextField {...params} label="Academic Year" />
          )}
          onChange={(e, v) =>
            handleChange("additionalDetails", {
              academic_Year: v ? v.label : "",
            })
          }
        />
      </Stack>

      <Typography variant="h8" gutterBottom>
        Duration
      </Typography>
      <Stack direction={{ sm: "column", lg: "row" }} gap={1}>
        <TextField
          fullWidth
          label="Course Start Date"
          id="outlined-required"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          name={"courseStartDate"}
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
          required
        ></TextField>
        <TextField
          fullWidth
          label="Course End Date"
          name="courseEndDate"
          id="outlined-required"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          required
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
        ></TextField>
        <TextField
          fullWidth
          label="Exam Date"
          id="outlined-required"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          name={"examDate"}
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
          required
        ></TextField>
      </Stack>
      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[{ label: "Elite" }, { label: "Gold" }, { label: "Silver" }]}
          fullWidth
          renderInput={(params) => (
            <TextField {...params} label="Class Received(if any)" />
          )}
          onChange={(e, v) =>
            handleChange("additionalDetails", {
              Class: v ? v.label : "",
            })
          }
        />

        <TextField
          fullWidth
          label="Reimbursement Amount"
          id="outlined-required"
          name={"amountToReimbursement"}
          required
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        ></TextField>
      </Stack>
    </>
  );
};

export default NptelForm;
