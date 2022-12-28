import React, { useState } from "react";
import { useRouter } from "next/router";

import {
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import axios from "axios";
import { submit } from "../../Hooks/apiHooks";
import { useAtom } from "jotai";
import { snackBarAtom } from "../../store";
export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [, setSnackBar] = useAtom(snackBarAtom);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const body = {
      moodleId: data.get("moodleId"),
      password: data.get("password"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      type: data.get("type"),
      department: data.get("department"),
    };

    // validation here
    if (
      body.moodleId === "" ||
      body.password === "" ||
      body.firstName === "" ||
      body.lastName === "" ||
      body.email === "" ||
      body.type === "" ||
      body.department === ""
    ) {
      setSnackBar({
        type: "error",
        message: "Please fill all the required fields",
        open: true,
      });
      setLoading(false);
      return;
    }

    submit("user/sign_up", body)
      .then((response) => {
        if (response.success || response.status === 200) {
          setSnackBar({
            open: true,
            type: "success",
            message: response.message,
          });
          router.push("/login");
        } else if (response.validation) {
          setSnackBar({
            open: true,
            type: "error",
            message: response.validation.body.message,
          });
        } else {
          setSnackBar({
            open: true,
            type: "error",
            message: response.message,
          });
        }
      })
      .catch((error) => {
        setSnackBar({
          type: "error",
          message: error.message ? error.message : "Oops! Something went wrong",
          open: true,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Paper sx={{ p: 3, py: 4, mt: 8, mx: 1 }} variant={"outlined"}>
        <Box>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h4">
                Sign up
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Moodle ID"
                      name="moodleId"
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl required sx={{ width: 1 }}>
                      <InputLabel>You are?</InputLabel>
                      <Select
                        label="You are? *"
                        name="type"
                        // onChange={handleChange}
                      >
                        <MenuItem value={"student"}>Student</MenuItem>
                        <MenuItem value={"teacher"}>Teacher</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl required sx={{ width: 1 }}>
                      <InputLabel>Department</InputLabel>
                      <Select
                        label="Department"
                        name="department"
                        // onChange={handleChange}
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
                </Grid>
                <LoadingButton
                  loading={loading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </LoadingButton>
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
              </Box>
            </Box>
          </Container>
        </Box>
      </Paper>
    </div>
  );
}
