import React from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import InputField from "../Forms/InputFields";
import SplitButton from "./SplitButton";

const CustomModal = ({
  openModal,
  setOpenModal,
  selected,
  setSelected,
  usedIn,
  loadingButton,
  handleApprove,
  receptionistList,
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
      <DialogTitle>
        Reimbursement details
        {selected && (
          <Box>
            {selected.approvedByAdmin && (
              <Chip
                label={"Approved by Admin"}
                color={"success"}
                sx={{
                  m: 1,
                }}
              />
            )}
            {selected.approvedBySubAdmin && (
              <Chip
                label={"Approved by Sub Admin"}
                color={"success"}
                sx={{
                  m: 1,
                }}
              />
            )}
            {selected.approvedByReceptionist && (
              <Chip
                label={"Approved by Receptionist"}
                color={"success"}
                sx={{
                  m: 1,
                }}
              />
            )}
          </Box>
        )}
      </DialogTitle>
      {selected && (
        <DialogContent dividers>
          {/* <Divider variant={"fullWidth"} sx={{ mb: 3 }} /> */}
          <Stack spacing={2}>
            <TextField
              label={"certificate Name"}
              value={selected.reimbursementDetails.certificate_name}
            />
            <TextField
              label={"Reimbursement Amount"}
              value={selected.amountToReimburse}
            />
            {selected.reimbursementDetails.questions.map((question) => (
              <InputField
                key={question.id}
                question={question}
                usedFor={"preview"}
              />
            ))}
            <TextField
              label={"Account Number"}
              value={selected.bankDetails.accountNumber}
            />

            <TextField label={"IFSCode"} value={selected.bankDetails.IFSCode} />
            {selected.remarks && <Typography>Remarks</Typography>}
            {selected.remarks?.bySubAdmin && (
              <TextField
                label={"Remarks from sub admin"}
                InputLabelProps={{ shrink: true }}
                value={selected.remarks.bySubAdmin}
              />
            )}

            {selected.remarks?.byReceptionist && (
              <TextField
                InputLabelProps={{ shrink: true }}
                label={"Remarks from receptionist"}
                value={selected.remarks.byReceptionist}
              />
            )}
            {selected.remarks?.byAdmin && (
              <TextField
                InputLabelProps={{ shrink: true }}
                label={"Remarks from admin"}
                value={selected.remarks.byAdmin}
              />
            )}

            {usedIn === "admin" && (
              <>
                <Typography>Receptionist</Typography>
                <TextField
                  label={"Assigned To"}
                  select
                  required
                  value={
                    receptionistList?.filter(
                      (receptionist) =>
                        receptionist.value === selected.assignToReimburse
                    )[0]
                  }
                  onChange={(value) => {
                    setSelected((prev) => ({
                      ...prev,
                      assignedTo: value.target.value,
                    }));
                  }}
                  name={"assignedTo"}
                  // defaultValue={selected.assignedTo || "none"}
                >
                  {receptionistList.map((receptionist) => (
                    <MenuItem key={receptionist.value} value={receptionist}>
                      {receptionist.label}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            )}
            {(usedIn === "admin" ||
              usedIn === "receptionist" ||
              usedIn === "sub_admin") && (
              <TextField
                label={"Remarks"}
                // value={selected?.remarks}
                onChange={(value) => {
                  setSelected((prev) => ({
                    ...prev,
                    remarks: value.target.value,
                  }));
                }}
                name={"remarks"}
                multiline
                rows={2}
              />
            )}
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
        {/* <LoadingButton
            loading={loadingButton}
            onClick={handleApprove}
            sx={{ m: 2 }}
            variant={"contained"}
          >
            Approve
          </LoadingButton> */}

        {(usedIn === "admin" ||
          usedIn === "receptionist" ||
          usedIn === "sub_admin") && (
          <SplitButton
            loading={loadingButton}
            handleClickArray={[
              () => handleApprove(true),
              () => handleApprove(false),
            ]}
            options={["Approve", "Reject"]}
            loadingButton={true}
          />
        )}
      </DialogActions>
      {/*)}*/}
    </Dialog>
  );
};

export default CustomModal;
