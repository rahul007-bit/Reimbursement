import * as React from "react";

import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import Link from "next/link";

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      moodle_id: data.get("moodle_id"),
      password: data.get("password"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Paper sx={{ p: 3, py: 6 }} elevation={3}>
        <Box
        // sx={{
        //   width: "90%",
        // }}
        >
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
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
                      name="moodle_id"
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
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
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
