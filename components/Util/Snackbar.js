import React from "react";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { useAtom } from "jotai";
import { snackBarAtom } from "../../store";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Snack = () => {
  const [{ open, type, message }, setSnackBar] = useAtom(snackBarAtom);
  const handleClose = () => {
    setSnackBar({ type: "", message: "", open: false });
  };
  return (
    <>
      {open && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Snack;
