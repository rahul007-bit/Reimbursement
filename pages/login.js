import React from "react";
import Header from "../components/header/header";
import Form from "../components/LoginForm/form";
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="w-screen h-screen">
        <Header />
        <Form />
      </div>
    </>
  );
};

export default Login;
