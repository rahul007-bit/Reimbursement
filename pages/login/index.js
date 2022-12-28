import React, { useEffect, useState } from "react";
import Form from "../../components/LoginForm/form";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const [loginAs, setLoginAs] = useState("user");
  useEffect(() => {
    if (router.query) {
      setLoginAs(router.query.user);
    }
  }, [router]);
  return (
    <Layout title={"Login"}>
      <div className="w-full h-full mt-10">
        <Form usedIn={loginAs} setLoginAs />
      </div>
    </Layout>
  );
};

export default LoginPage;
