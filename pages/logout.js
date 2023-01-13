import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useAtom } from "jotai";
import { snackBarAtom } from "../store";

const Logout = () => {
  const router = useRouter();
  const [, , removeCookie] = useCookies();
  const [, setSnackBar] = useAtom(snackBarAtom);
  useEffect(() => {
    localStorage.removeItem("auth-token");
    sessionStorage.clear();
    setSnackBar({
      type: "success",
      message: "Logout successfully",
      open: true,
    });
    removeCookie("auth_token", { path: "/" });
    removeCookie("loginType", { path: "/" });
    router.push("login");
  }, [removeCookie, router, setSnackBar]);
  return <></>;
};

export default Logout;
