import React from "react";
import MuiAlert from "@mui/material/Alert";
import { Alert, Snackbar } from "@mui/material";
import { useAtom } from "jotai";
import { snackBarAtom } from "../../store";

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert ref={ref} variant="filled" {...props} />;
// });
const Snack = () => {
  const [{ open, type, message }, setSnackBar] = useAtom(snackBarAtom);
  const handleClose = () => {
    setSnackBar({ type: "", message: "", open: false });
  };
  return (
    <>
      {open && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            variant={"standard"}
            onClose={handleClose}
            severity={type}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Snack;
