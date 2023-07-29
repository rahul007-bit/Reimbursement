import {
  Box,
  Button,
  Chip,
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
import { useCookies } from "react-cookie";
import { useAtom } from "jotai";
import { snackBarAtom } from "../../store";
import { submit } from "../../Hooks/apiHooks";
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

export default function UserTable({ data, user: usedIn = "User", userData }) {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [count, setCount] = useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [row, setRow] = React.useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loadingButton, setLoadingButton] = useState(false);

  const [_, setSnackBar] = useAtom(snackBarAtom);

  useEffect(() => {
    if (data?.data) {
      setRow(data.data);
      setCount(data.data.length);
    } else {
      setRow([]);
    }
  }, [data]);
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
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
  const handleApprove = (isApproved) => {
    try {
      setLoadingButton(true);
      const body = {
        reimburse_id: selected._id,
        isApproved,
        remarks: selected.remarks,
      };

      body.approvedByReceptionist = true;

      submit("receptionist/reimbursements", body)
        .then((response) => {
          if (response.status === 200 || response.success) {
            setOpenModal(false);
            setSnackBar({
              type: "success",
              open: true,
              message: response.message,
            });
            client.resetStore();
            router.reload();
          } else {
            setSnackBar({
              type: "error",
              open: true,
              message: response.message,
            });
          }
        })
        .finally(() => setLoadingButton(false));
    } catch (error) {
      setSnackBar({ type: "error", open: true, message: error.message });
      setLoadingButton(false);
    }
  };

  return (
    <Paper sx={{ width: 1, overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 540 }}>
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
                      {row1.reimbursementDetails.certificate_name}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(row1.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      {row1.amountToReimburse}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={row1.status}
                        color={
                          row1.status === "PENDING"
                            ? "warning"
                            : row1.status === "Approved"
                            ? "success"
                            : row1.status === "In Progress"
                            ? "info"
                            : "error"
                        }
                      />
                    </TableCell>
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
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <CustomModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        selected={selected}
        setSelected={setSelected}
        handleApprove={handleApprove}
        usedIn={userData?.type}
        loadingButton={loadingButton}
      />
    </Paper>
  );
}
