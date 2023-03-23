import React, { createRef, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { submit, useFetch } from "../../Hooks/apiHooks";
import CSVFileValidator from "csv-file-validator";
import { useAtom } from "jotai";
import { snackBarAtom } from "../../store";
import SplitButton from "../Util/SplitButton";
import CustomTable from "../Util/CustomTable";
import DialogBoxShowTable from "./Dashboard/DialogBox";
import Confirmation from "../Util/Confirmation";
import AddUserModal from "./AddUserModal";

const columns = [
  { label: "User Name", align: "center", minWidth: 170 },
  { label: "Institute Id", align: "center", minWidth: 100 },
  { label: "Email Id", align: "center", minWidth: 200 },
  { label: "Department", align: "center", minWidth: 200 },
  { label: "Action", align: "center", minWidth: 200 },
];

const UserTable = ({ usedFor, userData }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [, setSnackBar] = useAtom(snackBarAtom);
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [removeUser, setRemoveUser] = useState(null);

  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [addUserFormData, setAddUserFormData] = useState({
    firstName: "",
    lastName: "",
    moodleId: "",
    email: "",
    department: "",
  });
  const [addUserLoadingButton, setAddUserLoadingButton] = useState(false);

  const fileRef = createRef();

  const [row, setRow] = useState([]);
  const [reload, setReload] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const { loading, data } = useFetch(
    usedFor === "sub_admin"
      ? "get/sub_admin"
      : usedFor === "receptionist"
      ? "get/receptionist"
      : "getUser" +
        `${
          usedFor === "sub_admin"
            ? `?department=${userData.user.department}`
            : ""
        }`,
    [reload]
  );

  const [dialogTableData, setDialogTableData] = useState([]);
  const [dialogTableHeaders, setDialogTableHeaders] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (!loading && data) {
      const reimburseData =
        usedFor === "sub_admin"
          ? data.data
          : usedFor === "receptionist"
          ? data.data
          : data.user;
      setRow(reimburseData);
      setCount(reimburseData.length);
    }
  }, [loading, data, usedFor]);

  const handleClick = () => {
    fileRef.current.click();
  };

  const getFile = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const newConfig = {
        headers: config.headers.filter((item) =>
          usedFor === "receptionist" && item.name === "Department"
            ? false
            : !(usedFor === "students" && item.name === "Role")
        ),
      };

      CSVFileValidator(file, newConfig)
        .then((csvData) => {
          // console.log(csvData);
          if (!csvData.inValidData.length > 0) {
            const header = columns.map((column) => column.label);
            setDialogTableHeaders(header.filter((item) => item !== "Action"));
            setDialogTableData(csvData.data);
            setOpenDialog(true);
          } else {
            setSnackBar({
              type: "error",
              message: csvData.inValidData[0].message,
              open: true,
            });
          }
        })
        .catch((err) => {
          setSnackBar({
            type: "error",
            message: err.message,
            open: true,
          });
        })
        .finally(() => {
          event.target.value = "";
        });
    }
  };

  const submitTable = () => {
    let endpoint = "";
    let role = "";
    if (usedFor === "sub_admin") {
      role = "subAdmins";
      endpoint = "add/sub_admins";
      // add role to dialogTableData
      dialogTableData.forEach((item) => {
        item.role = "sub_admin";
      });
    } else if (usedFor === "receptionist") {
      role = "receptionists";
      endpoint = "add/receptionists";
      // add role to dialogTableData
      dialogTableData.forEach((item) => {
        item.role = "receptionist";
      });
    } else {
      role = "users";
      endpoint = "addUsers";
    }

    submit(endpoint, {
      [role]: dialogTableData,
    })
      .then((response) => {
        if (response.success || response.status === 200) {
          setSnackBar({
            type: "success",
            message: "User added successfully",
            open: true,
          });
          setReload((prev) => !prev);
          setOpenDialog(false);
          setDialogTableData([]);
          setDialogTableHeaders([]);
        } else {
          setSnackBar({
            type: "error",
            message: response.validation
              ? response.validation.body.message
              : response.message,
            open: true,
          });
        }
      })
      .catch((err) => {
        setSnackBar({
          type: "error",
          message: err.message,
          open: true,
        });
      })
      .finally(() => {});
  };

  const cancelTable = () => {
    setOpenDialog(false);
    setDialogTableData([]);
    setDialogTableHeaders([]);
    fileRef.current.value = "";
  };

  const downloadCSV = () => {
    // create a csv file with the headers
    const columns = [
      "First Name",
      "Last Name",
      "Email Id",
      "Institute Id",
      "Department",
      "Password",
      // "Role",
    ];
    const csv =
      columns
        .filter((column) =>
          usedFor === "receptionist" && column === "Department"
            ? false
            : !(usedFor === "students" && column === "Role")
        )
        .join(",") + "\n";

    // console.log(csv);
    const csvData = new Blob([csv], { type: "text/csv" });
    const csvUrl = URL.createObjectURL(csvData);
    const tempLink = document.createElement("a");
    tempLink.setAttribute("href", csvUrl);
    tempLink.setAttribute("download", "sample.csv");
    tempLink.click();
  };

  const handleRemove = (id) => () => {
    setOpenModal(true);
    setRemoveUser(id);
  };

  const handleClose = () => {
    setOpenModal(false);
    setRemoveUser(null);
    setLoadingRemove(false);
  };

  const remove = () => {
    setLoadingRemove(true);
    // delete/admin
    submit(
      usedFor === "students" ? "user/remove" : "delete/admin",
      { [usedFor === "students" ? "user_id" : "admin_id"]: removeUser },
      "delete"
    ).then((res) => {
      if (res.status === 200 || res.success) {
        setSnackBar({ type: "success", open: true, message: res.message });
        handleClose();
        setReload((prevState) => !prevState);
      } else {
        setLoadingRemove(false);
        setSnackBar({
          type: "error",
          open: true,
          message: res.message ? res.message : res.error,
        });
      }
    });
  };

  const onSubmitAddUser = (event) => {
    event.preventDefault();
    setAddUserLoadingButton(true);
    console.log(addUserFormData);
    //   check operationMode
    if (addUserFormData._id) {
      //   update/receptionist update/admin update/user

      const url =
        usedFor === "receptionist"
          ? "update/receptionist"
          : usedFor === "sub_admin"
          ? "update/admin"
          : "update/user";

      return submit(url, addUserFormData, "PUT")
        .then((res) => {
          if (res.status === 200 || res.success) {
            setSnackBar({ type: "success", open: true, message: res.message });
            handleCloseAddUserModal();
            setReload((prevState) => !prevState);
          } else {
            setAddUserLoadingButton(false);
            setSnackBar({
              type: "error",
              open: true,
              message: res.validation
                ? res.validation.body.message
                : res.message,
            });
          }
        })
        .catch((err) => {
          setSnackBar({
            type: "error",
            open: true,
            message: err.message,
          });
        })
        .finally(() => {
          setAddUserLoadingButton(false);
        });
    } else {
      //   add/receptionist  add/sub_admin addUsers
      const url =
        usedFor === "receptionist"
          ? "add/receptionist"
          : usedFor === "sub_admin"
          ? "add/sub_admin"
          : "addUsers";
      let body = {};
      if (usedFor === "students") {
        body.user = addUserFormData;
      } else if (usedFor === "receptionist") {
        body = {
          ...addUserFormData,
        };
        delete body.department;
      } else {
        body = {
          ...addUserFormData,
        };
      }
      return submit(url, body)
        .then((res) => {
          if (res.status === 200 || res.success) {
            setSnackBar({ type: "success", open: true, message: res.message });
            setReload((prevState) => !prevState);
            handleCloseAddUserModal();
          } else {
            setSnackBar({
              type: "error",
              open: true,
              message: res.validation
                ? res.validation.body.message
                : res.message,
            });
          }
        })
        .catch((err) => {
          setSnackBar({
            type: "error",
            open: true,
            message: err.message,
          });
        })
        .finally(() => {
          setAddUserLoadingButton(false);
        });
    }
  };

  const handleCloseAddUserModal = () => {
    setOpenAddUserModal(false);
    setAddUserFormData({
      firstName: "",
      lastName: "",
      email: "",
      moodleId: "",
      department: "",
      password: "",
    });
    setAddUserLoadingButton(false);
  };

  const handleEditUser = (user) => {
    setAddUserFormData((prevState) => ({ ...prevState, ...user }));
    setOpenAddUserModal(true);
  };

  return (
    <Box>
      <Stack direction={"row"} gap={1} alignItems={"center"} marginTop={1}>
        <Button
          variant={"contained"}
          sx={{ my: 2 }}
          onClick={() => setOpenAddUserModal(true)}
        >
          <Typography variant={"button"}>
            Add {usedFor.replace("_", " ")}
          </Typography>
        </Button>
        <SplitButton
          handleClickArray={[handleClick, downloadCSV]}
          options={["Upload CSV", "Download Sample CSV"]}
        />
      </Stack>
      <input
        type="file"
        className={"hidden"}
        id={"file"}
        ref={fileRef}
        accept={".csv"}
        onChange={getFile}
      />
      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {!loading ? (
          <CustomTable
            columns={
              usedFor === "receptionist"
                ? ["User Name", "Institute Id", "Email Id", "Action"]
                : [
                    "User Name",
                    "Institute Id",
                    "Email Id",
                    "Department",
                    "Action",
                  ]
            }
            row={row}
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            setPage={setPage}
            handleRemove={handleRemove}
            handleEdit={handleEditUser}
            showAction={true}
            tableFor={usedFor}
          />
        ) : (
          <CircularProgress />
        )}
      </Box>
      <Confirmation
        openModal={openModal}
        handleClose={handleClose}
        remove={remove}
        loadingRemove={loadingRemove}
      />
      {openDialog && (
        <DialogBoxShowTable
          openModal={openDialog}
          setOpenModal={setOpenDialog}
          handleClick={submitTable}
          tableData={dialogTableData}
          tableHeaders={dialogTableHeaders}
          cancelTable={cancelTable}
          tableFor={usedFor}
        />
      )}
      <AddUserModal
        usedFor={usedFor}
        addUserLoadingButton={addUserLoadingButton}
        handleCloseAddUserModal={handleCloseAddUserModal}
        addUserFormData={addUserFormData}
        onSubmitAddUser={onSubmitAddUser}
        openAddUserModal={openAddUserModal}
        setAddUserFormData={setAddUserFormData}
        operationMode={addUserFormData._id ? "edit" : "add"}
      />
    </Box>
  );
};

export default UserTable;
const config = {
  headers: [
    {
      name: "First Name",
      inputName: "first_name",
      required: true,
      requiredError: function (headerName, rowNumber, columnNumber) {
        return `${headerName} is required in the ${rowNumber} row / ${columnNumber} column`;
      },
    },
    {
      name: "Last Name",
      inputName: "last_name",
      required: false,
    },
    {
      name: "Email Id",
      inputName: "email",

      validateError: function (headerName, rowNumber, columnNumber) {
        return `${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
      },
    },

    {
      name: "Institute Id",
      inputName: "moodleId",
      required: true,
      unique: true,
      uniqueError: function (headerName) {
        return `${headerName} is not unique`;
      },
    },
    {
      name: "Department",
      inputName: "department",
    },
    {
      name: "Password",
      inputName: "password",
      required: true,
    },
    // {
    //   name: "Role",
    //   inputName: "role",
    //   required: true,
    // },
  ],
};
