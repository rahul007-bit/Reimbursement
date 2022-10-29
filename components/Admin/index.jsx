import React from "react";
import { useState, useEffect } from "react";
import TotalRecord from "./TotalRecord";
import Dashboard from "./Dashboard";
import { Box, CircularProgress, Divider } from "@mui/material";
import AdminTable from "./Dashboard/AdminTable";
import { _ } from "gridjs-react";
import Link from "next/link";
import { useFetch } from "../../Hooks/apiHooks";
import Layout from "../Layout";

const AdminDashboard = () => {
  const tableColumn = [
    { name: "Student Name" },
    { name: "Status" },
    { name: "Requested on" },
    { name: "Action" },
  ];
  const { loading, data } = useFetch("getReimburse?status=PENDING", []);
  if (loading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <AdminTable columns={tableColumn} data={data} />
      <Divider sx={{ my: 6 }} variant="middle" />
      <Dashboard />
    </>
  );
};

export default AdminDashboard;
