import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

const Logout = () => {
  const router = useRouter();
  const [cookies, _, removeCookie] = useCookies();
  useEffect(() => {
    localStorage.removeItem("auth-token");
    sessionStorage.clear();
    removeCookie("auth_token");
    sessionStorage.clear();
    removeCookie("loginType");
    router.push("login");
  }, [removeCookie, router]);
  return <></>;
};

export default Logout;
