import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import UserForm from "../Forms/UserForm";

const AddUserModal = ({
  openAddUserModal,
  handleCloseAddUserModal,
  addUserFormData,
  setAddUserFormData,
  addUserLoadingButton,
  onSubmitAddUser,
  usedFor,
  operationMode,
}) => {
  return openAddUserModal ? (
    <Dialog open={openAddUserModal} onClose={handleCloseAddUserModal}>
      <DialogContent>
        <UserForm
          usedFor={usedFor}
          formData={addUserFormData}
          onSubmit={onSubmitAddUser}
          loading={addUserLoadingButton}
          operationMode={operationMode}
          onChange={(e) =>
            setAddUserFormData({
              ...addUserFormData,
              [e.target.name]: e.target.value,
            })
          }
        />
      </DialogContent>
    </Dialog>
  ) : null;
};

export default AddUserModal;
