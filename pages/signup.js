import React, { useState } from "react";
import Header from "../components/header/header";
import Form from "../components/Signup/signup";
import Head from "next/head";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Signup = () => {
  const [snackType, setSnackType] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = () => {
    setOpen(false);
    setSnackType("");
    setMessage("");
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className="w-screen h-screen flex justify-center flex-col">
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

export default Signup;
