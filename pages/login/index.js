import React, { useState } from "react";
import Header from "../../components/header/header";
import Form from "../../components/LoginForm/form";
import Head from "next/head";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import Layout from "../../components/Layout";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const [snackType, setSnackType] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [cookies] = useCookies();
  const [message, setMessage] = useState("");
  const handleClose = () => {
    setOpen(false);
    setSnackType("");
    setMessage("");
  };

  return (
    <Layout title={"Login"}>
      <div className="w-full h-full mt-10">
        <Form
          setMessage={setMessage}
          setSnackType={setSnackType}
          setOpen={setOpen}
        />
      </div>
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
    </Layout>
  );
};

export default Login;
