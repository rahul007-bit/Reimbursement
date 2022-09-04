import React from "react";
import { Stack, Box, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const Staffform = ({ handleChange }) => {
  return (
    <>
      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        <TextField
          name="name"
          fullWidth
          label="Staff Name"
          id="outlined-required"
          onChange={handleChange}
          required
        ></TextField>
        <TextField
          name="email"
          fullWidth
          label="Email"
          onChange={handleChange}
          id="outlined-required"
          required
        ></TextField>
      </Stack>
    </>
  );
};
export default Staffform;
