import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import React from "react";

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
    userData
      ? userData.type === "user"
        ? `user/getReimburse${status ? `?status=${status}` : ""}`
        : `receptionist/reimbursements`
      : "",
    [userData]
  );

  return (
    <>
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
            <UserTable data={data} userData={userData} />
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
