import React from "react";
import Dashboard from "../../components/Admin/Dashboard";
import Header from "../../components/header/header";
import { Auth } from "../../components/Auth/index";

const AdminHome = () => {
  return (
    <>
      <Auth user={"admin"}>
        <Header />
        <Dashboard />
      </Auth>
    </>
  );
};

export default AdminHome;
