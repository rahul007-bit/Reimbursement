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
      type: data.get("type"),
    };
    submit("user/sign_up", body)
      .then((response) => {
        if (response.success || response.status === 200) {
          setSnackBar({
            open: true,
            type: "success",
            message: response.message,
          });
          router.push("/login");
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
      <Paper sx={{ p: 3, py: 6, mt: 8 }} elevation={3}>
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
                      name="password"
                      label="Password"
                      type="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl required sx={{ width: 1 }}>
                      <InputLabel id="demo-simple-select-required-label">
                        You are?
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        label="You are? *"
                        name="type"
                        // onChange={handleChange}
                      >
                        <MenuItem value={"student"}>Student</MenuItem>
                        <MenuItem value={"teacher"}>Teacher</MenuItem>
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
