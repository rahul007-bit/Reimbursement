import React, { useState } from "react";
import { Stack, Box, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const Studentform = ({ handleChange, user }) => {
  return (
    <>
      <Stack direction={{ sm: "column", md: "row" }} gap={1}>
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
          value={user.user?.first_name}
        />
        <TextField
          fullWidth
          label="Email"
          name={"email"}
          required
          value={user.user?.email}
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
