import React from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";

const UserForm = ({
  onSubmit,
  usedFor,
  loading,
  onChange,
  formData,
  operationMode,
}) => {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            label="First Name"
            autoFocus
            value={formData.firstName || formData.first_name}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            value={formData.lastName || formData.last_name}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Moodle ID"
            name="moodleId"
            value={formData.moodleId}
            disabled={operationMode === "edit"}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Email ID"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required={operationMode !== "edit"}
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl required sx={{ width: 1 }}>
            <InputLabel>
              {usedFor === "signUp" ? "You are? " : "Role"}
            </InputLabel>
            <Select
              label={usedFor === "signUp" ? "You are? " : "Role"}
              name={
                usedFor === "signUp" || usedFor === "students" ? "type" : "role"
              }
              onChange={onChange}
              value={formData.type || formData.role}
            >
              {(usedFor === "students" || usedFor === "signUp") && (
                <MenuItem value={"student"}>Student</MenuItem>
              )}
              {(usedFor === "students" || usedFor === "signUp") && (
                <MenuItem value={"teacher"}>Teacher</MenuItem>
              )}
              {(usedFor === "sub_admin" || usedFor === "receptionist") && (
                <MenuItem value={"sub_admin"}>Sub Admin</MenuItem>
              )}
              {(usedFor === "sub_admin" || usedFor === "receptionist") && (
                <MenuItem value={"receptionist"}>Receptionist</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        {usedFor !== "receptionist" && (
          <Grid item xs={12} sm={6}>
            <FormControl required sx={{ width: 1 }}>
              <InputLabel>Department</InputLabel>
              <Select
                label="Department"
                name="department"
                onChange={onChange}
                value={formData.department}
              >
                <MenuItem value={"IT"}>IT</MenuItem>
                <MenuItem value={"CS"}>CS</MenuItem>
                <MenuItem value={"EXTC"}>EXTC</MenuItem>
                <MenuItem value={"CIVIL"}>CIVIL</MenuItem>
                <MenuItem value={"MECH"}>MECH</MenuItem>
                <MenuItem value={"AI/ML"}>AI/ML</MenuItem>
                <MenuItem value={"DS"}>DS</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>
      <LoadingButton
        loading={loading}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {usedFor === "signUp" ? "Sign Up" : "Add"}
      </LoadingButton>
      {usedFor === "signUp" && (
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href={"/login"}>
              <Typography
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
                variant={"caption"}
              >
                Already have an account? Sign in
              </Typography>
            </Link>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default UserForm;
