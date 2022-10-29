import React from "react";
import Form from "../../components/LoginForm/form";
import Layout from "../../components/Layout";

const LoginPage = () => {
  return (
    <Layout title={"Login"}>
      <div className="w-full h-full mt-10">
        <Form />
      </div>
    </Layout>
  );
};

export default LoginPage;
