import React from "react";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user && user.type === "admin") setAdmin(true);
  }, []);

  if (!admin) return <></>;
  return <>hello</>;
};

export default Dashboard;
