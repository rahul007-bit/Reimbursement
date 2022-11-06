import React from "react";
import { useState, useEffect } from "react";
import TotalRecord from "./TotalRecord";
import Dashboard from "./Dashboard";
import {
  AppBar,
  Box,
  CircularProgress,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
import AdminTable from "./Dashboard/AdminTable";
import { _ } from "gridjs-react";
import Link from "next/link";
import { useFetch } from "../../Hooks/apiHooks";
import Layout from "../Layout";
import TabPanel, { a11yProps } from "../Util/TabPanel";

const AdminDashboard = () => {
  const tableColumn = [
    { name: "Student Name" },
    { name: "Status" },
    { name: "Requested on" },
    { name: "Action" },
  ];
  const { loading, data } = useFetch("getReimburse?status=PENDING", []);
  const [value, setValue] = useState(0);
  const [charts, setCharts] = useState([
    "status",
    "department",
    "certificate_name",
  ]);
  if (loading)
    return (
      <Box sx={{ display: "flex", w: 1 }}>
        <CircularProgress />
      </Box>
    );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position={"relative"}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Graphical View" {...a11yProps(0)} />
          <Tab label="Tabular View" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Dashboard charts={charts} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminTable columns={tableColumn} data={data} />
      </TabPanel>
    </>
  );
};

export default AdminDashboard;
