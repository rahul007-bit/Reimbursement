import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

function Confirmation({
  openModal = false,
  handleClose,
  remove,
  loadingRemove,
}) {
  return (
    <Dialog
      open={openModal}
      onClose={handleClose}
      // fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle>Confirmation</DialogTitle>
      {openModal && (
        <DialogContent dividers>
          <Typography>Do Your really want to remove??</Typography>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <LoadingButton
          variant={"contained"}
          loading={loadingRemove}
          color={"error"}
          onClick={remove}
        >
          Yes
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default Confirmation;
