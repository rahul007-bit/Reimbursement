import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import UserForm from "../Forms/UserForm";
import SliderTransition from "../Util/SlideTransition";

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
    <Dialog
      open={openAddUserModal}
      TransitionComponent={SliderTransition}
      onClose={handleCloseAddUserModal}
      keepMounted
    >
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
