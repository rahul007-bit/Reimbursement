import React, { useState, useContext } from "react";
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
import axios from "axios";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";
import { submit } from "../../Hooks/apiHooks";

export default function SignIn({
  setSnackType,
  setMessage,
  setOpen,
  usedIn: usedFor = "user",
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    // axios({
    //   url: "https://reimbursementserver.herokuapp.com/api/user/sign_in",
    //   method: "POST",
    // data: {
    //   moodleId: data.get("moodle_id"),
    //   password: data.get("password"),
    // },
    // })
    submit(`${usedFor}/sign_in`, {
      moodleId: data.get("moodle_id"),
      password: data.get("password"),
    })
      .then((response) => {
        // const result = response.data;
        if (response.success) {
          setOpen(true);
          setSnackType("success");
          setMessage(response.message);
          const token = response.auth_token;
          localStorage.setItem("auth-token", token);
          console.log(response);
          setTimeout(() => {
            router.push("/");
          }, 800);
        } else {
          setSnackType("error");
          setMessage(response.message);
        }
      })
      .catch((err) => {
        // const response = err.response;
        console.log(err);
        setOpen(true);
        setSnackType("error");
        setMessage(err.message);
      })
      .finally(() => setLoading(false));
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
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <LoadingButton
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
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
            <Box
              sx={{
                display: "flex",
                width: 1,
                justifyContent: "space-between",
              }}
            >
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
              <Link href={"/admin/sign_in"}>
                <Typography
                  sx={{
                    cursor: "pointer",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                  variant={"caption"}
                >
                  {"Login as admin?"}
                </Typography>
              </Link>
            </Box>
          </Grid>
        </Box>
      </Paper>
    </Box>
    //   </div>
    // </div>
  );
}
