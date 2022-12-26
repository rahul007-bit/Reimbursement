import React from "react";
import { useState } from "react";
import Dashboard from "./Dashboard";
import { AppBar, Tab, Tabs } from "@mui/material";
import AdminTable from "./Dashboard/AdminTable";
import { _ } from "gridjs-react";
import TabPanel, { a11yProps } from "../Util/TabPanel";

const AdminDashboard = ({
  statusCount,
  status,
  departmentCount,
  department,
}) => {
  const tableColumn = [
    { name: "Student Name" },
    { name: "Status" },
    { name: "Requested on" },
    { name: "Action" },
  ];

  const [value, setValue] = useState(0);
  const [charts, setCharts] = useState([
    // { key: "status", name: "Requests" },
    // { key: "department", name: "Department" },
    { key: "certificate_name", name: "Certificate" },
  ]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position={"relative"} elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { background: "#fff" } }}
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Graphical View" {...a11yProps(0)} />
          <Tab label="Tabular View" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Dashboard
          charts={charts}
          statusCount={statusCount}
          status={status}
          departmentCount={departmentCount}
          department={department}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdminTable columns={tableColumn} />
      </TabPanel>
    </>
  );
};

export default AdminDashboard;
