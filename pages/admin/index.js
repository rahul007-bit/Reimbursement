import React from "react";
import AdminDashboard from "../../components/Admin";
import Header from "../../components/header/header";
import { Auth } from "../../components/Auth/index";

const AdminHome = () => {
  return (
    <>
      <Auth user={"admin"}>
        <Header />
        <AdminDashboard />
      </Auth>
    </>
  );
};

export default AdminHome;
