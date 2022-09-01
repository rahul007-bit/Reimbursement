import React from "react";
import { Stack, Box, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const NptelForm = () => {
  return (
    <>
      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        <TextField
          fullWidth
          label="Student Name"
          id="outlined-required"
          required
        ></TextField>
        <TextField
          fullWidth
          label="Email"
          id="outlined-required"
          required
        ></TextField>
      </Stack>

      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        <TextField
          sx={{ width: 255 }}
          label="Course Name"
          id="outlined-required"
          required
        ></TextField>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[{ label: "First Half" }, { label: "Second half" }]}
          sx={{ width: 260 }}
          renderInput={(params) => (
            <TextField {...params} label="Academic Year" />
          )}
        />
      </Stack>

      <Typography variant="h8" gutterBottom>
        Duration
      </Typography>
      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        <TextField
          fullWidth
          label="Start Date"
          id="outlined-required"
          type="date"
          // defaultValue="2020-05-26"
          InputLabelProps={{
            shrink: true,
          }}
          required
        ></TextField>
        <TextField
          fullWidth
          label="End Date"
          id="outlined-required"
          type="date"
          // defaultValue="2020-05-26"
          InputLabelProps={{
            shrink: true,
          }}
          required
        ></TextField>
        <TextField
          fullWidth
          label="Exam Date"
          id="outlined-required"
          type="date"
          // defaultValue="2020-05-26"
          InputLabelProps={{
            shrink: true,
          }}
          required
        ></TextField>
      </Stack>
      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[{ label: "Elite" }, { label: "Gold" }, { label: "Silver" }]}
          sx={{ width: 250 }}
          renderInput={(params) => (
            <TextField {...params} label="Class Received(if any)" />
          )}
        />

        <TextField
          sx={{ width: 250 }}
          label="Reimbursement Amount"
          id="outlined-required"
          required
        ></TextField>
      </Stack>
    </>
  );
};

export default NptelForm;
