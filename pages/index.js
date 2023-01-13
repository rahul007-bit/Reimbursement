import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const Index = () => {
  const router = useRouter();
  const cookies = useCookies(["auth_token", "loginType"]);
  useEffect(() => {
    if (cookies[0].auth_token) {
      if (
        cookies[0].loginType === "admin" ||
        cookies[0].loginType === "sub_admin"
      ) {
        router.push("/admin");
      } else if (
        cookies[0].loginType === "user" ||
        cookies[0].loginType === "receptionist"
      ) {
        router.push("/user");
      }
    } else router.push("/login");
  }, [cookies, router]);
  return <></>;
};

export default Index;
