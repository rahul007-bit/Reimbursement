import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import { useFetch } from "../../../Hooks/apiHooks";

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
  const { loading, data } = useFetch("reimbursement/fullInfo?get=PENDING", []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [row, setRow] = React.useState([]);

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
                                  <Button variant={"contained"}>
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
      </Box>
    </>
  );
};

export default ViewRequestTable;
