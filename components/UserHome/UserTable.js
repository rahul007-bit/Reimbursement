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

const columns = [
  { id: "Certificate_name", label: "Certificate Name", minWidth: 170 },
  { id: "Apply_at", label: "Apply At", minWidth: 100 },
  {
    id: "passed",
    label: "Passed At",
    minWidth: 170,
    align: "right",
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Status",
    label: "Status",
    minWidth: 170,
    align: "right",
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

// const rows = [
//   createData("India", "IN", 1324171354, 3287263),
//   createData("China", "CN", 1403500365, 9596961),
//   createData("Italy", "IT", 60483973, 301340),
//   createData("United States", "US", 327167434, 9833520),
//   createData("Canada", "CA", 37602103, 9984670),
//   createData("Australia", "AU", 25475400, 7692024),
//   createData("Germany", "DE", 83019200, 357578),
//   createData("Ireland", "IE", 4857000, 70273),
//   createData("Mexico", "MX", 126577691, 1972550),
//   createData("Japan", "JP", 126317000, 377973),
//   createData("France", "FR", 67022000, 640679),
//   createData("United Kingdom", "GB", 67545757, 242495),
//   createData("Russia", "RU", 146793744, 17098246),
//   createData("Nigeria", "NG", 200962417, 923768),
//   createData("Brazil", "BR", 210147125, 8515767),
// ];

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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell>{row1.certificate_name}</TableCell>
                    <TableCell>{"27-Sep"}</TableCell>
                    <TableCell>{"Pending"}</TableCell>
                    <TableCell>{row1.amountToReimbursement}</TableCell>
                    <TableCell>{"Pending"}</TableCell>
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
