import React from "react";
import MuiAlert from "@mui/material/Alert";
import { Alert, AlertTitle, Slide, Snackbar } from "@mui/material";
import { useAtom } from "jotai";
import { snackBarAtom } from "../../store";

const Snack = () => {
  const [{ open, type, message }, setSnackBar] = useAtom(snackBarAtom);
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
    </>
  );
};

export default Snack;
