import React from "react";
import { useState, useEffect } from "react";
import TotalRecord from "./TotalRecord";
import Dashboard from "./Dashboard";
import { Divider } from "@mui/material";
import AdminTable from "./Dashboard/AdminTable";
import { _ } from "gridjs-react";
import Link from "next/link";
import { useFetch } from "../../Hooks/apiHooks";
const AdminDashboard = () => {
  const [admin, setAdmin] = useState(false);
  const [tableData, setTableData] = useState([]);
  const tableColumn = [
    { name: "Student Name" },
    { name: "Status" },
    { name: "Requested on" },
    { name: "Action" },
  ];
  const { loading, data } = useFetch("user/getReimburse?status=PENDING", []);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.type === "admin") setAdmin(true);
  }, []);

  if (!admin) return <></>;
  return (
    <>
      <AdminTable columns={tableColumn} data={data} />
      {/* <TotalRecord /> */}
      <Divider sx={{ my: 6 }} variant="middle" />
      <Dashboard />
    </>
  );
};

export default AdminDashboard;
