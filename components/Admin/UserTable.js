import React, { createRef, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { submit, useFetch } from "../../Hooks/apiHooks";
import { v4 as uuid } from "uuid";
import CSVFileValidator from "csv-file-validator";
import { useAtom } from "jotai";
import { snackBarAtom } from "../../store";
import { LoadingButton } from "@mui/lab";

const columns = [
  { id: uuid(), label: "User Name", align: "center", minWidth: 170 },
  { id: uuid(), label: "Moodle Id", align: "center", minWidth: 100 },
  { id: uuid(), label: "Email Id", align: "center", minWidth: 200 },
  { id: uuid(), label: "Department", align: "center", minWidth: 200 },
  { id: uuid(), label: "Action", align: "center", minWidth: 200 },
];

const UserTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [, setSnackBar] = useAtom(snackBarAtom);
  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [removeUser, setRemoveUser] = useState(null);
  const fileRef = createRef();

  const [row, setRow] = useState([]);
  const [reload, setReload] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const { loading, data } = useFetch("getUser", [reload]);
  //allReimbursement
  useEffect(() => {
    if (!loading && data) {
      const reimburseData = data.user;
      setRow(reimburseData);
      setCount(reimburseData.length);
    }
  }, [loading, data]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClick = () => {
    fileRef.current.click();
  };

  const getFile = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setLoadingButton(true);
      console.log(file);
      CSVFileValidator(file, config)
        .then((csvData) => {
          if (!csvData.inValidMessages) {
            submit("addUsers", { users: csvData.data })
              .then((response) => {
                if (response.success || response.status === 200) {
                  // event.target.files.pop();
                  setSnackBar({
                    type: "success",
                    message: "User added successfully",
                    open: true,
                  });
                  setReload((prev) => !prev);
                } else {
                  setSnackBar({
                    type: "error",
                    message: response.message,
                    open: true,
                  });
                }
              })
              .finally(() => setLoadingButton(false));
            console.log(csvData.data);
          } // Array of objects from file
        })
        .catch((err) => {
          setLoadingButton(false);
          setSnackBar({
            type: "error",
            message: err.message,
            open: true,
          });
        });
    }
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
    submit("user/remove", { user_id: removeUser }, "delete").then((res) => {
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

  return (
    <div>
      <LoadingButton
        loading={loadingButton}
        variant={"contained"}
        sx={{ m: 3 }}
        onClick={handleClick}
      >
        <Typography variant={"button"}>Add User </Typography>
      </LoadingButton>
      <input
        type="file"
        className={"hidden"}
        id={"file"}
        ref={fileRef}
        accept={".csv"}
        onChange={getFile}
      />
      <Box sx={{ my: 4 }}>
        {!loading ? (
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {row
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row1) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row1._id}
                      >
                        <TableCell align="center">{row1.first_name}</TableCell>
                        <TableCell align="center">{row1.moodleId}</TableCell>
                        <TableCell align="center">{row1.email}</TableCell>
                        <TableCell align="center">{row1.department}</TableCell>
                        <TableCell align="center">
                          <Button
                            variant={"contained"}
                            onClick={handleRemove(row1._id)}
                            size={"small"}
                          >
                            <Typography variant={"button"}>Remove</Typography>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <CircularProgress />
        )}
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={openModal}
        onClose={handleClose}
        // fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>Confirmation</DialogTitle>
        {openModal && (
          <DialogContent dividers>
            <Typography>Do Your really want to remove this user??</Typography>
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
    </div>
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
      name: "Email",
      inputName: "email",

      validateError: function (headerName, rowNumber, columnNumber) {
        return `${headerName} is not valid in the ${rowNumber} row / ${columnNumber} column`;
      },
    },

    {
      name: "Moodle Id",
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
    //   name: 'Roles',
    //   inputName: 'roles',
    //   isArray: true
    // },
  ],
};
