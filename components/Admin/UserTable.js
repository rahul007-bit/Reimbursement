import React, { createRef, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
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

const columns = [
  { id: uuid(), label: "User Name", align: "center", minWidth: 170 },
  { id: uuid(), label: "Moodle Id", align: "center", minWidth: 100 },
  { id: uuid(), label: "Email Id", align: "center", minWidth: 200 },
  { id: uuid(), label: "Department", align: "center", minWidth: 200 },
];

const UserTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const fileRef = createRef();
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [row, setRow] = useState([]);
  const [reload, setReload] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const { loading, data } = useFetch("getUser", [reload]);
  //allReimbursement
  useEffect(() => {
    if (!loading && data) {
      const reimburseData = data.user;
      setRow(reimburseData);
    }
  }, [loading, data]);

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
            submit("addUsers", { users: csvData.data }).then((response) => {
              if (response.success || response.status === 200) {
                // event.target.files.pop();
                setReload((prev) => !prev);
              }
            });
            console.log(csvData.data);
          } // Array of objects from file
          // Array of error messages
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Button variant={"contained"} sx={{ m: 3 }} onClick={handleClick}>
        <Typography variant={"button"}>Add User </Typography>
      </Button>
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
        count={0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default UserTable;
