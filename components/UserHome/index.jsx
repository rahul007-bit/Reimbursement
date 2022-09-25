import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";
import UserTable from "./UserTable";

export const UserHome = () => {
  return (
    <>
      {/* top part */}
      <Box
        sx={{
          display: "flex",
          width: 1,
          height: 1 / 3,
          minHight: "200px",
          maxHeight: "200px",
          backgroundColor: "#D9D9D9",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          sx={{
            width: 1,
            height: "auto",
            aspectRatio: "1/1",
            maxWidth: "130px",
            my: 1,
          }}
        />
        <Box sx={{ display: "grid", marginX: 2 }}>
          <Typography variant={"h4"}>UserName</Typography>
          <Typography variant={"h6"}>User email</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <Link href={"/reimbursement"}>
          <Button sx={{ maxWidth: "160px" }} variant={"contained"}>
            Apply for Reimbursement
          </Button>
        </Link>
      </Box>
      {/* table part */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UserTable />
      </Box>
    </>
  );
};
