import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTable from "../../Util/CustomTable";

const DialogBoxShowTable = ({
  openModal = false,
  setOpenModal,
  handleClick,
  tableHeaders,
  tableData,
  cancelTable,
  tableFor,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (tableData) {
      setCount(tableData.length);
    }
  }, [tableData, tableHeaders]);

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"auto"}
      onClose={() => setOpenModal(false)}
      open={openModal}
      scroll={"paper"}
    >
      <DialogTitle>CSV Table</DialogTitle>
      <DialogContent dividers>
        <CustomTable
          columns={tableHeaders.filter((header) =>
            tableFor === "receptionist" && header === "Department"
              ? false
              : true
          )}
          row={tableData}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          showAction={false}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          tableFor={tableFor}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelTable}>Cancel</Button>
        <Button onClick={handleClick} variant={"contained"}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBoxShowTable;
