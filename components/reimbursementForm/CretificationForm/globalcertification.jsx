import React from "react";
import { Stack, Box, TextField, Typography, Autocomplete } from "@mui/material";

const GlobalCertification = ({ handleChange }) => {
  return (
    <>
      <Stack direction={{ sm: "column", md: "row" }} gap={2}>
        <TextField
          fullWidth
          label="Name of Certification"
          id="outlined-required"
          required
          name={"courseName"}
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
        ></TextField>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[{ label: "First Half" }, { label: "Second half" }]}
          sx={{ minWidth: "200px" }}
          renderInput={(params) => (
            <TextField {...params} label="Academic Year" />
          )}
          onChange={(e, v) =>
            handleChange("additionalDetails", {
              academic_Year: v ? v.label : "",
            })
          }
        />
      </Stack>
      <Typography variant="h8" gutterBottom>
        Duration
      </Typography>
      <Stack direction={{ sm: "column", lg: "row" }} gap={2}>
        <TextField
          fullWidth
          label="Course Start Date"
          id="outlined-required"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          name={"courseStartDate"}
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
          required
        ></TextField>
        <TextField
          fullWidth
          label="Course End Date"
          name="courseEndDate"
          id="outlined-required"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          required
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
        ></TextField>
        <TextField
          fullWidth
          label="Exam Date"
          id="outlined-required"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          name={"examDate"}
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
          required
        ></TextField>
      </Stack>
      <Stack direction={{ sm: "column", md: "row" }} gap={2}>
        <TextField
          fullWidth
          label="Certification Id"
          id="outlined-required"
          required
          name={"certificationId"}
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
        ></TextField>
        <TextField
          fullWidth
          label="Domain"
          id="outlined-required"
          required
          name="domain"
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
        ></TextField>
      </Stack>
      <Stack direction={{ sm: "column", md: "row" }} gap={2}>
        <TextField
          fullWidth
          label="Reimbursement Amount"
          id="outlined-required"
          name={"amountToReimbursement"}
          required
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        ></TextField>

        <TextField
          fullWidth
          label="Applied through"
          id="outlined-required"
          name={"Applied_through"}
          required
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
        ></TextField>
      </Stack>

      <Stack direction={{ sm: "column", md: "row" }} gap={2}>
        <TextField
          fullWidth
          label="Recommendation"
          id="outlined-required"
          required
          name="recommendation"
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
        ></TextField>
        <TextField
          fullWidth
          label="Any Remarks"
          id="outlined-required"
          required
          name="remark"
          onChange={(e) =>
            handleChange("additionalDetails", {
              [e.target.name]: e.target.value,
            })
          }
        ></TextField>
      </Stack>
    </>
  );
};

export default GlobalCertification;
