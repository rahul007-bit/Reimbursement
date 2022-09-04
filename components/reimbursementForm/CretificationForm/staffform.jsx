import React from "react";
import { Stack, Box, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const Staffform = () => {
  return (
    <>
      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        <TextField
          fullWidth
          label="Staff Name"
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
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[
            { label: "Nptel" },
            { label: "RedHat" },
            { label: "GlobalCertification" },
          ]}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField {...params} label="Select Courses" />
          )}
        />
      </Stack>
    </>
  );
};
export default Staffform;
