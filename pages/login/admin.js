import React from "react";
import Form from "../../components/LoginForm/form";
import Layout from "../../components/Layout";

const Login = () => {
  return (
    <Layout>
      <div className="w-full h-full mt-10">
        <Form usedIn="admin" />
      </div>
    </Layout>
  );
};

export default Login;
