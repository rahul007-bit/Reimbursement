import React from "react";
import Form from "../components/Signup/signup";
import Layout from "../components/Layout";

const Signup = () => {
  return (
    <Layout title={"Sign Up"}>
      <div className="w-full h-full flex justify-center flex-col mt-10">
        <Form />
      </div>
    </Layout>
  );
};

export default Signup;
