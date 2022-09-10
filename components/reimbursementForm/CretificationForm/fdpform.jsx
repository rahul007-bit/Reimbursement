import React from "react";
import { Stack, Box, TextField, Typography } from "@mui/material";

const Fdpform = ({ handleChange }) => {
  return (
    <>
      <TextField
        fullWidth
        label="Name of FDP/STTP"
        id="outlined-required"
        required
      ></TextField>
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
      </Stack>
      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        <TextField
          name="name"
          fullWidth
          label="Organizing Institute/Company"
          id="outlined-required"
          onChange={handleChange}
          required
        ></TextField>
        <TextField
          name="name"
          fullWidth
          label="Domain"
          id="outlined-required"
          onChange={handleChange}
          required
        ></TextField>
      </Stack>
    </>
  );
};
export default Fdpform;
