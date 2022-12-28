import React, { useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import { Alert, AlertTitle, Slide, Snackbar } from "@mui/material";
import { useAtom } from "jotai";
import { snackBarAtom } from "../../store";

const Snack = () => {
  const [userOnline, setUserOnline] = useState(true);
  const [{ open, type, message }, setSnackBar] = useAtom(snackBarAtom);

  useEffect(() => {
    window.addEventListener("online", () => {
      setUserOnline(true);
    });
    window.addEventListener("offline", () => setUserOnline(false));
    return () => {
      window.removeEventListener("online", () => setUserOnline(true));
      window.removeEventListener("offline", () => setUserOnline(false));
    };
  }, []);

  const handleClose = () => {
    setSnackBar({ type: "", message: "", open: false });
  };
  return (
    <>
      {open && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            variant={"filled"}
            onClose={handleClose}
            severity={type}
            sx={{ width: "100%" }}
          >
            {/*<AlertTitle>{type === "success" ? "Success" : "Error"}</AlertTitle>*/}
            {message}
          </Alert>
        </Snackbar>
      )}

      <Snackbar
        open={!userOnline}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        // onClose={}
      >
        <Alert variant={"filled"} severity={"error"} sx={{ width: "100%" }}>
          You are offline
        </Alert>
      </Snackbar>
    </>
  );
};

export default Snack;
