import React from "react";
import Header from "../components/header/header";
import Form from "../components/Signup/signup";

const Signup = () => {
  return (
    <div className="w-screen h-screen flex justify-center flex-col">
      <Header />
      <Form />
    </div>
  );
};

export default Signup;
