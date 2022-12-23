import React, { useState } from "react";
import { Stack, Box, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const Studentform = ({ handleChange, user }) => {
  return (
    <>
      <Stack direction={{ sm: "column", md: "row" }} gap={2}>
        <TextField
          fullWidth
          label="Student Name"
          required
          name={"student_name"}
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
          InputLabelProps={{ shrink: true }}
          value={user.user?.first_name}
        />
        <TextField
          autoComplete={"off"}
          fullWidth
          label="Email"
          name={"email"}
          required
          value={user.user?.email}
          InputLabelProps={{ shrink: true }}
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
        />
      </Stack>
    </>
  );
};

export default Studentform;
