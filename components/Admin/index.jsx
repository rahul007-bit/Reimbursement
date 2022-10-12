import React from "react";
import { useState, useEffect } from "react";
import TotalRecord from "./TotalRecord";
import Dashboard from "./Dashboard";
import { Divider } from "@mui/material";
const AdminDashboard = () => {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.type === "admin") setAdmin(true);
  }, []);

  if (!admin) return <></>;
  return (
    <>
      <TotalRecord />
      <Divider sx={{ my: 3 }} variant="middle" />
      <Dashboard />
    </>
  );
};

export default AdminDashboard;
