import { Stack, TextField } from "@mui/material";
import React from "react";

const PaymentDetails = ({ handleChange }) => {
  return (
    <Stack direction={{ sm: "column", md: "row" }} gap={3}>
      <TextField
        fullWidth
        label="Account Number"
        id="outlined-required"
        required
        name={"accountNumber"}
        onChange={(e) =>
          handleChange("bankDetails", {
            [e.target.name]: e.target.value,
          })
        }
      />
      <TextField
        fullWidth
        label="IFSCode"
        id="outlined-required"
        required
        name={"IFSCode"}
        onChange={(e) =>
          handleChange("bankDetails", {
            [e.target.name]: e.target.value,
          })
        }
      />
    </Stack>
  );
};

export default PaymentDetails;
