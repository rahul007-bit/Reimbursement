import React from "react";
import { Stack, Box, TextField, Typography } from "@mui/material";

const GlobalCertification = ({ handleChange }) => {
  return (
    <>
      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        <TextField
          fullWidth
          label="Name of Certification"
          id="outlined-required"
          required
        ></TextField>
        <TextField
          fullWidth
          label="Date of Certification"
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
          fullWidth
          label="Certification Id"
          id="outlined-required"
          required
        ></TextField>
        <TextField
          fullWidth
          label="Domain"
          id="outlined-required"
          required
        ></TextField>
      </Stack>
      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        <TextField
          fullWidth
          label="Reimbursement Amount"
          id="outlined-required"
          required
        ></TextField>

        <TextField
          fullWidth
          label="Academy Through Which it is Completed"
          id="outlined-required"
          required
        ></TextField>
      </Stack>

      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        <TextField
          fullWidth
          label="Recommendation"
          id="outlined-required"
          required
        ></TextField>
        <TextField
          fullWidth
          label="Any Remarks"
          id="outlined-required"
          required
        ></TextField>
      </Stack>
    </>
  );
};

export default GlobalCertification;
