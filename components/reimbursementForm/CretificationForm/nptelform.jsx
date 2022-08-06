import React from "react";
import { Stack, Box, TextField } from "@mui/material";

const NptelForm = () => {
  return (
    <>
      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        <TextField
          fullWidth
          label="Course Name"
          id="outlined-required"
          required
        ></TextField>
        <TextField
          fullWidth
          label="email"
          id="outlined-required"
          required
        ></TextField>
      </Stack>
      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        <TextField
          fullWidth
          label="Course Name"
          id="outlined-required"
          required
        ></TextField>
        <TextField
          fullWidth
          label="email"
          id="outlined-required"
          required
        ></TextField>
      </Stack>
      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        <TextField
          fullWidth
          label="Course Name"
          id="outlined-required"
          required
        ></TextField>
        <TextField
          fullWidth
          label="email"
          id="outlined-required"
          required
        ></TextField>
      </Stack>
    </>
  );
};

export default NptelForm;
