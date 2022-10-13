import React, { useState } from "react";
import Header from "../components/header/header";
import Form from "../components/LoginForm/form";
import Head from "next/head";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const router = useRouter();

  const [snackType, setSnackType] = useState("");
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem("auth-token"));
  }, []);
  const [message, setMessage] = useState("");
  const handleClose = () => {
    setOpen(false);
    setSnackType("");
    setMessage("");
  };

  if (token) {
    router.push("/");
    return <></>;
  }
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="w-screen h-screen">
        <Header />
        <Form
          setMessage={setMessage}
          setSnackType={setSnackType}
          setOpen={setOpen}
        />

        {open && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={snackType}
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        )}
      </div>
    </>
  );
};

export default Login;
