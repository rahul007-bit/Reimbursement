import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import CustomModal from "../Util/CustomModal";
const columns = [
  { id: uuid(), label: "Certificate Name", align: "center", minWidth: 170 },
  { id: uuid(), label: "Apply At", align: "center", minWidth: 100 },

  {
    id: uuid(),
    label: "Amount",
    minWidth: 170,
    align: "center",
  },
  {
    id: uuid(),
    label: "Status",
    minWidth: 170,
    align: "center",
  },
  {
    id: uuid(),
    label: "Account Number",
    minWidth: 170,
    align: "center",
  },
  {
    id: uuid(),
    label: "IFSCode",
    minWidth: 170,
    align: "center",
  },
  {
    id: uuid(),
    label: "Action",
    minWidth: 170,
    align: "center",
  },
];

export default function UserTable({ data, user: usedIn = "User" }) {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [row, setRow] = React.useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    if (data?.data) {
      setRow(data.data);
    }
  }, [data]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClick = () => {
    if (usedIn === "admin") {
      router.replace("/admin/view_request");
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const showModal = (details) => () => {
    setOpenModal(true);
    setSelected(() => {
      // delete values.additionalDetails;
      return {
        ...details,
      };
    });
  };

  return (
    <Paper sx={{ width: "90%", overflow: "hidden", my: { md: 3 } }}>
      {usedIn === "admin" ? (
        <>
          <Typography variant="h5" margin={1}>
            Reimbursement Request
          </Typography>
          <Button onClick={handleClick} sx={{ m: 1.5 }} variant="contained">
            Open Request Page
          </Button>
        </>
      ) : null}
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
                    className={`${usedIn === "admin" ? "cursor-pointer" : ""}`}
                  >
                    <TableCell align="center">
                      {row1.certificate_name}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(row1.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      {row1.amountToReimbursement}
                    </TableCell>
                    <TableCell align="center">{row1.status}</TableCell>
                    <TableCell align="center">
                      {row1.bankDetails.accountNumber}
                    </TableCell>
                    <TableCell align="center">
                      {row1.bankDetails.IFSCode}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant={"contained"}
                        onClick={showModal(row1)}
                        size={"small"}
                      >
                        <Typography variant={"button"}>View Request</Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <CustomModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        selected={selected}
        usedIn={"user"}
      />
    </Paper>
  );
}
