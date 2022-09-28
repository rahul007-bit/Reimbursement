import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem("auth-token");
    sessionStorage.clear();
    router.push("login");
  }, [router]);
  return <></>;
};

export default Logout;
