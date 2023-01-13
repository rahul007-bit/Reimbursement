import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";

const CustomTable = ({
  handleRemove,
  handleEdit,
  showAction = false,
  count,
  rowsPerPage = 10,
  setRowsPerPage,
  page,
  setPage,
  columns,
  row,
  tableFor,
}) => {
  const [columnsState, setColumnsState] = React.useState([]);

  useEffect(() => {
    if (columns) {
      setColumnsState(
        columns.map((column) => ({
          id: uuid(),
          label: column,
          align: "center",
          minWidth: 200,
        }))
      );
    }
  }, [columns, tableFor]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columnsState.map((column) => (
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
                    key={row1._id ? row1._id : row1.id}
                  >
                    <TableCell align="center">{row1.first_name}</TableCell>
                    <TableCell align="center">{row1.moodleId}</TableCell>
                    <TableCell align="center">{row1.email}</TableCell>
                    {tableFor !== "receptionist" && (
                      <TableCell align="center">{row1.department}</TableCell>
                    )}
                    {showAction && (
                      <TableCell align="center">
                        <Button
                          variant={"contained"}
                          size={"small"}
                          sx={{
                            mx: 1,
                          }}
                          onClick={() => handleEdit(row1)}
                        >
                          <Typography variant={"button"}>Edit</Typography>
                        </Button>
                        <Button
                          // variant={"contained"}
                          onClick={handleRemove(row1._id)}
                          size={"small"}
                        >
                          <Typography variant={"button"}>Remove</Typography>
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        sx={{
          width: "100%",
        }}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default CustomTable;
