import React, { useState } from "react";
import Header from "../components/header/header";
import Form from "../components/Signup/signup";
import Head from "next/head";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Layout from "../components/Layout";

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
    <Layout title={"Sign Up"}>
      <div className="w-full h-full flex justify-center flex-col mt-10">
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
    </Layout>
  );
};

export default Signup;
