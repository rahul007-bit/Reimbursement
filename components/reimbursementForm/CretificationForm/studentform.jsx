import React, { useState } from "react";
import { Stack, Box, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const Studentform = ({ handleChange }) => {
  const [user, setUser] = useState("");
  const getUserDetails = (event, value) => {
    console.log(value);
    setUser(value);
  };

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
        />
        <TextField
          fullWidth
          label="Email"
          name={"email"}
          required
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
