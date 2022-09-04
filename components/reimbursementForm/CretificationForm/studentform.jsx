import React, { useState } from "react";
import { Stack, Box, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const Studentform = () => {
  const [user, setUser] = useState("");
  const getUserDetails = (event, value) => {
    console.log(value);
    setUser(value);
  };

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
    </>
  );
};

export default Studentform;
