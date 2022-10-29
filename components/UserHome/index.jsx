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
import Empty from "../Util/Empty";
export const UserHome = ({ userData, status }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(userData);
  }, [userData]);
  const { loading, data } = useFetch(
    `user/getReimburse${status ? `?status=${status}` : ""}`,
    []
  );

  return (
    <>
      {/* table part */}
      <Typography variant={"h5"} marginY={3} marginLeft={8}>
        {" "}
        {status ? `${status.toUpperCase()} Requests` : "All Requests"}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {!loading ? (
          data ? (
            <UserTable data={data} />
          ) : (
            <Empty />
          )
        ) : (
          <CircularProgress />
        )}
      </Box>
    </>
  );
};
