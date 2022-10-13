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
        name={"coursename"}
        onChange={(e) =>
          handleChange("additionalDetails", {
            [e.target.name]: e.target.value,
          })
        }
      ></TextField>
      <TextField
        fullWidth
        label="Reimbursement Amount"
        id="outlined-required"
        name={"amountToReimbursement"}
        required
        onChange={(e) => handleChange(e.target.name, e.target.value)}
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
          required
          name={"startdate"}
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
          // defaultValue="2020-05-26"
          InputLabelProps={{
            shrink: true,
          }}
        ></TextField>
        <TextField
          fullWidth
          label="End Date"
          id="outlined-required"
          type="date"
          required
          name={"enddate"}
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
          // defaultValue="2020-05-26"
          InputLabelProps={{
            shrink: true,
          }}
        ></TextField>
      </Stack>
      <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
        <TextField
          fullWidth
          label="Organizing Institute/Company"
          id="outlined-required"
          required
          name={"organizingcompany"}
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
        ></TextField>
        <TextField
          name="domain"
          fullWidth
          label="Domain"
          id="outlined-required"
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
export default Fdpform;
