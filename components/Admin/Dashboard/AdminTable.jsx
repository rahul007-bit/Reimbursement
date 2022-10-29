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
      <UserTable data={data} user={"admin"} />
    </Box>
  );
}
