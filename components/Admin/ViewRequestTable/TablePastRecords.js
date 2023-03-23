import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
import { useFetch } from "../../../Hooks/apiHooks";
import { CSVLink } from "react-csv";

const columns = [
  { id: uuid(), label: "Certificate Name", align: "center", minWidth: 170 },
  { id: uuid(), label: "Apply At", align: "center", minWidth: 100 },
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
];
const TablePastRecords = ({ reload, Header }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [row, setRow] = useState([]);
  const [userData, setUserData] = useState([]);

  const { loading, data } = useFetch("reimbursement/fullInfo?get=Approved", [
    reload,
  ]);
  //allReimbursement
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

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant={"body1"} fontWeight={"bold"} marginTop={4}>
        All Approved Records
      </Typography>
      <Divider variant={"middle"} />
      <CSVLink data={userData} headers={Header} filename={`${Date()}-student`}>
        <Button variant={"contained"} sx={{ m: 3 }}>
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
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                          {new Date(row1.created_at).toLocaleDateString()}
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
                        <TableCell align="center">{row1.status}</TableCell>
                        <TableCell align="center">
                          {row1.bankDetails.accountNumber}
                        </TableCell>
                        <TableCell align="center">
                          {row1.bankDetails.IFSCode}
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
  );
};

export default TablePastRecords;
