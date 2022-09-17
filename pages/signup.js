import React from "react";
import Header from "../components/header/header";
import Form from "../components/Signup/signup";
import Head from "next/head";

const Signup = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className="w-screen h-screen flex justify-center flex-col">
        <Header />
        <Form />
      </div>
    </>
  );
};

export default Signup;
