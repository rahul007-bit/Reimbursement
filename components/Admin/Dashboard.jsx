import React from "react";
import Table from "./Dashboard/Table";
import Chats from "./Dashboard/Chats";
import { Divider } from "@mui/material";

const Dashboard = () => {
  return (
    <>
      <Chats />
      {/* <Divider sx={{ my: 5 }} variant="middle" /> */}
      {/* <Table /> */}
    </>
  );
};
export default Dashboard;
