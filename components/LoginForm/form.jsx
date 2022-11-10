import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";
import { submit } from "../../Hooks/apiHooks";
import { useAtom } from "jotai";
import { snackBarAtom } from "../../store";

export default function SignIn({ usedIn: usedFor = "user" }) {
  const [loading, setLoading] = useState(false);
  const [_, setCookies] = useCookies();
  const router = useRouter();
  const [, setSnackBar] = useAtom(snackBarAtom);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
    submit(`${usedFor}/sign_in`, {
      moodleId: data.get("moodle_id"),
      password: data.get("password"),
    })
      .then((response) => {
        // const result = response.data;
        if (response.success) {
          setSnackBar({
            type: "success",
            message: response.message,
            open: true,
          });
          const token = response.auth_token;
          setCookies("auth_token", token, { path: "/" });
          setCookies("loginType", response.type, { path: "/" });
          setTimeout(async () => {
            await router.push("/");
          }, 800);
        } else {
          setSnackBar({ type: "error", message: response.message, open: true });
        }
      })
      .catch((err) => {
        setSnackBar({ type: "error", message: err.message, open: true });
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
          mt: 8,
        }}
        elevation={3}
      >
        <Typography component="h1" variant="h4">
          {usedFor === "admin" ? "Admin Sign in" : "Sign In"}
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
            autoComplete={"on"}
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
              <Link href={"/login/admin"}>
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
