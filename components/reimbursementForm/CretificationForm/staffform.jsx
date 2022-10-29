import React from "react";
import { Stack, Box, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const Staffform = ({ handleChange }) => {
  return (
    <>
      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        <TextField
          name="staff_name"
          fullWidth
          label="Staff Name"
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
          required
        ></TextField>
        <TextField
          name="email"
          fullWidth
          label="Email"
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
          required
        ></TextField>
      </Stack>
    </>
  );
};
export default Staffform;
