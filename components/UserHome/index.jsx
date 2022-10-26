import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import UserTable from "./UserTable";
import { useFetch } from "../../Hooks/apiHooks";
import { useState } from "react";
import { useEffect } from "react";
export const UserHome = ({ userData }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(userData);
  }, [userData]);
  const { loading, data } = useFetch("user/getReimburse", []);

  return (
    <>
      {/* top part */}

      <Box
        sx={{
          display: "flex",
          width: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <Link href={"/user/reimbursement"}>
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
        {!loading ? data && <UserTable data={data} /> : <CircularProgress />}
      </Box>
    </>
  );
};
