import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import { submit, useFetch } from "../../../Hooks/apiHooks";
import { useAtom } from "jotai";
import { snackBarAtom } from "../../../store";
import CustomModal from "../../Util/CustomModal";
import client from "../../../apolloClient";
import { useCookies } from "react-cookie";

const columns = [
  { id: uuid(), label: "Certificate Name", align: "center", minWidth: 170 },
  { id: uuid(), label: "Applied At", align: "center", minWidth: 100 },
  { id: uuid(), label: "Applied by", align: "center", minWidth: 200 },
  { id: uuid(), label: "Institute Id", align: "center", minWidth: 200 },
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
    label: "Actions",
    minWidth: 170,
    align: "center",
  },
];

const ViewRequestTable = ({ userData: currentUserData }) => {
  const [reload, setReload] = useState(false);

  const { loading, data, error } = useFetch(
    "reimbursement/fullInfo?not_status=Approved" +
      `${
        currentUserData.type === "sub_admin"
          ? `&department=${currentUserData.user.department}`
          : ""
      }`,
    [reload]
  );

  const [page, setPage] = React.useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [row, setRow] = React.useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loadingButton, setLoadingButton] = useState(false);
  const [userData, setUserData] = useState([]);

  const [receptionistList, setReceptionistList] = useState([]);

  const [, setSnackBar] = useAtom(snackBarAtom);
  const [cookies] = useCookies(["loginType"]);

  useEffect(() => {
    if (!loading) {
      if (error) {
        setRow([]);
        setUserData([]);
      } else {
        const reimburseData = data.data;
        setRow(reimburseData);
        setUserData(
          reimburseData.map((d) => [
            d.certificate_name,
            new Date(d.created_at).toLocaleDateString(),
            d.user[0]?.first_name,
            d.user[0]?.moodleId,
            d.amountToReimbursement,
            d.status,
            d.bankDetails.accountNumber,
            d.bankDetails.IFSCode,
          ])
        );
      }
    }
  }, [loading, data, error]);

  useEffect(() => {
    setCount(userData.length);
  }, [userData]);

  useEffect(() => {
    const loginType = cookies.loginType;
    if (loginType === "admin") {
      submit("get/receptionist", {}, "GET")
        .then((response) => {
          if (response.success) {
            setReceptionistList(
              response.data.map((d) => ({ label: d.first_name, value: d._id }))
            );
          } else {
            setSnackBar({
              type: "error",
              open: true,
              message: response.message,
            });
            setReceptionistList([]);
          }
        })
        .catch((error) => {
          setSnackBar({
            type: "error",
            open: true,
            message: error.message,
          });
          setReceptionistList([]);
        });
    }
  }, [cookies.loginType, setSnackBar]);

  const handleChangePage = (event, newPage) => {
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
      if (!details.assignToReimburse) {
        details.assignedTo = { value: "", label: "" };
      }
      return details;
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

      if (cookies.loginType === "admin" && selected.assignedTo.value === "") {
        setSnackBar({
          type: "error",
          open: true,
          message: "Please select a receptionist",
        });
        setLoadingButton(false);

        return;
      }

      if (cookies.loginType === "admin") {
        body.assignedTo = selected.assignedTo.value;
        body.approvedByAdmin = true;
      }

      if (cookies.loginType === "sub_admin") {
        body.approvedBySubAdmin = true;
      }

      submit("reimbursement/approve", body)
        .then((response) => {
          if (response.status === 200 || response.success) {
            setReload((prevState) => !prevState);
            setOpenModal(false);
            setSnackBar({
              type: "success",
              open: true,
              message: response.message,
            });
            client.resetStore();
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
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
          minHeight: 830,
        }}
      >
        <Box sx={{ maxWidth: "1200px", width: 1 }}>
          <Card
            variant={"outlined"}
            sx={{
              m: 1,
            }}
          >
            <CardContent>
              <Typography variant={"h6"} fontWeight={"bold"}>
                Reimbursement Requests
              </Typography>
              <Divider variant={"middle"} />

              <Box sx={{ my: 2 }}>
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
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row1) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row1._id}
                              >
                                <TableCell align="center">
                                  {row1.reimbursementDetails.certificate_name}
                                </TableCell>
                                <TableCell align="center">
                                  {new Date(
                                    row1.created_at
                                  ).toLocaleDateString()}
                                </TableCell>
                                <TableCell align="center">
                                  {row1.user[0]?.first_name}
                                </TableCell>
                                <TableCell align="center">
                                  {row1.user[0]?.moodleId}
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
                                    <Typography variant={"button"}>
                                      View Request
                                    </Typography>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Box
                    sx={{ display: "flex", width: 1, justifyContent: "center" }}
                  >
                    <CircularProgress />
                  </Box>
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
            </CardContent>
          </Card>
        </Box>
        <CustomModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          selected={selected}
          handleApprove={handleApprove}
          loadingButton={loadingButton}
          receptionistList={receptionistList}
          usedIn={cookies.loginType}
          setSelected={setSelected}
        />
      </Box>
    </>
  );
};

export default ViewRequestTable;
