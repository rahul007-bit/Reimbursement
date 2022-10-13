import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { LoadingButton } from "@mui/lab";

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
  const [message, setMessage] = useState("");
  const [snackType, setSnackType] = useState("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [row, setRow] = React.useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loadingButton, setLoadingButton] = useState(false);
  useEffect(() => {
    if (!loading && data) {
      const reimburseData = data.data;
      setRow(reimburseData);
    }
  }, [loading, data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
            setOpen(true);
            setMessage("Successfully Approved");
            setSnackType("success");
          } else {
            setOpen(true);
            setMessage(response.message);
            setSnackType("error");
          }
        })
        .finally(() => setLoadingButton(false));
    } catch (error) {
      setOpen(true);
      setLoadingButton(false);
      setSnackType("error");
      setMessage(error.message);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSnackType(null);
    setMessage("");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // width: 1,
          // height: 1,
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
                <Button variant={"contained"}>
                  <Typography variant={"button"}>Export </Typography>
                </Button>
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
                                    {row1.user[0].first_name}
                                  </TableCell>
                                  <TableCell align="center">
                                    {row1.user[0].moodleId}
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
                  count={0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Card
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              // bgcolor: "background.paper",
              boxShadow: 24,
              maxHeight: 700,
              p: 1,
              overflowY: "scroll",
            }}
          >
            {openModal && (
              <CardContent>
                <Typography variant={"h6"}>Reimbursement details</Typography>
                <Divider variant={"fullWidth"} sx={{ mb: 3 }} />
                <Stack spacing={2}>
                  <TextField
                    label={"certificate Name"}
                    value={selected.certificate_name}
                  />
                  <TextField
                    label={"Reimbursement Amount"}
                    value={selected.amountToReimbursement}
                  />
                  {/*<TextField*/}
                  {/*  label={"Course Name"}*/}
                  {/*  value={selected.certificate_name}*/}
                  {/*/>*/}
                  {Object.entries(selected.additionalDetails).map((data, i) => (
                    <TextField
                      label={data[0]}
                      key={i}
                      value={selected.additionalDetails[data[0]]}
                    />
                  ))}
                  <TextField
                    label={"Account Number"}
                    value={selected.bankDetails.accountNumber}
                  />
                  <TextField
                    label={"IFSCode"}
                    value={selected.bankDetails.IFSCode}
                  />
                  {selected.certificateUrl ? (
                    <img
                      src={selected.certificateUrl}
                      alt=""
                      width={"100px"}
                      height={"100px"}
                    />
                  ) : (
                    <Typography>Certificate is not Provided</Typography>
                  )}
                </Stack>
                <LoadingButton
                  loading={loadingButton}
                  onClick={handleApprove}
                  sx={{ m: 2 }}
                  variant={"contained"}
                >
                  Approve
                </LoadingButton>
              </CardContent>
            )}
          </Card>
        </Modal>
        {open && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={snackType}
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        )}
      </Box>
    </>
  );
};

export default ViewRequestTable;
