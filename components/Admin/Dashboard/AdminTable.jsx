import { Box, Typography } from "@mui/material";
import React from "react";
import UserTable from "../../UserHome/UserTable";

export default function AdminTable({ data }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mx: {
          sm: 2,
          md: 4,
          lg: 8,
        },
        my: 8,
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" marginBottom={4}>
        Reimbursement Request
      </Typography>
      <UserTable data={data} user={"admin"} />
    </Box>
  );
}
