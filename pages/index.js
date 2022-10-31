import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const Index = () => {
  const router = useRouter();
  const cookies = useCookies(["auth_token", "loginType"]);
  useEffect(() => {
    if (cookies[0].auth_token) router.push(`/${cookies[0].loginType}`);
    else router.push("/login");
  }, [cookies, router]);
  return <></>;
};

export default Index;
