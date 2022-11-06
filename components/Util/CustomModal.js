import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";

const CustomModal = ({
  openModal,
  setOpenModal,
  selected,
  usedIn,
  loadingButton,
  handleApprove,
}) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      onClose={() => setOpenModal(false)}
      open={openModal}
      scroll={"paper"}
    >
      {/*{openModal && (*/}
      <DialogTitle>Reimbursement details</DialogTitle>
      {selected && (
        <DialogContent dividers>
          <Divider variant={"fullWidth"} sx={{ mb: 3 }} />
          <Stack spacing={2}>
            <TextField
              label={"certificate Name"}
              value={selected.certificate_name}
            />
            <TextField
              label={"Reimbursement Amount"}
              value={selected.amountToReimbursement}
            />
            {Object.entries(selected.additionalDetails).map((data, i) => (
              <TextField
                label={data[0]}
                key={i}
                value={selected.additionalDetails[data[0]]}
              />
            ))}
            <TextField
              label={"Account Number"}
              value={selected.bankDetails.accountNumber}
            />
            <TextField label={"IFSCode"} value={selected.bankDetails.IFSCode} />
          </Stack>
        </DialogContent>
      )}
      <DialogActions>
        {selected &&
          (selected.certificateUrl ? (
            <Link href={selected.certificateUrl.url} target={"_blank"}>
              <Button
                color={"warning"}
                variant={"contained"}
                size={"small"}
                sx={{ width: 200, m: 2 }}
              >
                Download Certificate
              </Button>
            </Link>
          ) : (
            <Typography>Certificate is not Provided</Typography>
          ))}
        {usedIn === "admin" && (
          <LoadingButton
            loading={loadingButton}
            onClick={handleApprove}
            sx={{ m: 2 }}
            variant={"contained"}
          >
            Approve
          </LoadingButton>
        )}
      </DialogActions>
      {/*)}*/}
    </Dialog>
  );
};

export default CustomModal;
