import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import { submit, useFetch } from "../../../Hooks/apiHooks";
import MuiAlert from "@mui/material/Alert";
import { LoadingButton } from "@mui/lab";
import { CSVLink } from "react-csv";
import Link from "next/link";
import { useAtom } from "jotai";
import { snackBarAtom } from "../../../store";
import CustomModal from "../../Util/CustomModal";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const columns = [
  { id: uuid(), label: "Certificate Name", align: "center", minWidth: 170 },
  { id: uuid(), label: "Apply At", align: "center", minWidth: 100 },
  { id: uuid(), label: "Applied by", align: "center", minWidth: 200 },
  { id: uuid(), label: "Moodle Id", align: "center", minWidth: 200 },
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

const ViewRequestTable = () => {
  const [reload, setReload] = useState(false);
  const { loading, data } = useFetch("reimbursement/fullInfo?get=PENDING", [
    reload,
  ]);
  const [page, setPage] = React.useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [row, setRow] = React.useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loadingButton, setLoadingButton] = useState(false);
  const [userData, setUserData] = useState([]);
  const [, setSnackBar] = useAtom(snackBarAtom);
  useEffect(() => {
    if (!loading && data) {
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
  }, [loading, data]);
  useEffect(() => {
    setCount(userData.length);
  }, [userData]);
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
      return {
        ...details,
      };
    });
  };

  const handleApprove = () => {
    try {
      setLoadingButton(true);
      submit("reimbursement/approve", {
        reimburse_id: selected._id,
      })
        .then((response) => {
          if (response.status === 200 || response.success) {
            setReload((prevState) => !prevState);
            setOpenModal(false);
            setSnackBar({
              type: "success",
              open: true,
              message: "Successfully Approved",
            });
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

  const Header = [
    "Certificate Name",
    "Applied At",
    "Applied By",
    "Moodle Id",
    "Amount",
    "Status",
    "Account Number",
    "IFSCode",
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ maxWidth: "1200px", my: 5, width: 1 }}>
          <Card>
            <CardContent>
              <Typography variant={"body1"} fontWeight={"bold"} marginTop={4}>
                Reimbursement Requests
              </Typography>
              <Divider variant={"middle"} />
              <Box sx={{ m: 3 }}>
                <CSVLink
                  data={userData}
                  headers={Header}
                  filename={`${Date()}-student`}
                >
                  <Button variant={"contained"}>
                    <Typography variant={"button"}>Export </Typography>
                  </Button>
                </CSVLink>

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
                                    {row1.certificate_name}
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
                                    {row1.amountToReimbursement}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row1.status}
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
              </Box>
              {/*<TablePastRecords reload={reload} Header={Header} />*/}
              {/*<AllRecords reload={reload} Header={Header} />*/}
            </CardContent>
          </Card>
        </Box>
        <CustomModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          selected={selected}
          handleApprove={handleApprove}
          loadingButton={loadingButton}
          usedIn={"admin"}
        />
      </Box>
    </>
  );
};

export default ViewRequestTable;
