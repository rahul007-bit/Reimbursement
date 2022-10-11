import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
const columns = [
  { id: uuid(), label: "Certificate Name", minWidth: 170 },
  { id: uuid(), label: "Apply At", minWidth: 100 },
  {
    id: uuid(),
    label: "Passed At",
    minWidth: 170,
    align: "center",
  },
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
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

export default function UserTable({ data }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [row, setRow] = React.useState([]);

  useEffect(() => {
    if (data.data) {
      setRow(data.data);
    }
  }, [data]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "90%", overflow: "hidden" }}>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row1._id}>
                    <TableCell align="center">
                      {row1.certificate_name}
                    </TableCell>
                    <TableCell align="center">{"27-Sep"}</TableCell>
                    <TableCell align="center">{"Pending"}</TableCell>
                    <TableCell align="center">
                      {row1.amountToReimbursement}
                    </TableCell>
                    <TableCell align="center">{"Pending"}</TableCell>
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
    </Paper>
  );
}
