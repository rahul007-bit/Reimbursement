import * as React from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import Link from "next/link";

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("moodle_id"),
      password: data.get("password"),
    });
  };

  return (
    // <div className="flex h-full w-full ">
    //   <div className="shadow h-fit m-auto sm:w-1/2 lg:w-2/5 w-full flex justify-evenly items-center rounded-md py-8">
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 1,
        maxHeight: "600px",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "480px",
          p: 4,
        }}
        elevation={3}
      >
        <Typography component="h1" variant="h4">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Moodle Id"
            name="moodle_id"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            {/*<Grid item xs>*/}
            {/*  <Button>*/}
            {/*    <Typography*/}
            {/*      sx={{*/}
            {/*        cursor: "pointer",*/}
            {/*        ":hover": {*/}
            {/*          textDecoration: "underline",*/}
            {/*        },*/}
            {/*      }}*/}
            {/*      variant={"caption"}*/}
            {/*    >*/}
            {/*      Forgot Password*/}
            {/*    </Typography>*/}
            {/*  </Button>*/}
            {/*</Grid>*/}
            <Grid item>
              <Link href={"/signup"}>
                <Typography
                  sx={{
                    cursor: "pointer",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                  variant={"caption"}
                >
                  {"Don't have an account? Sign Up"}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
    //   </div>
    // </div>
  );
}
