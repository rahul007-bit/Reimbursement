import React, { useState } from "react";

const Form = () => {
  const [currentValue, setCurrentValue] = useState("");
  return (
    <div className="w-screen h-[80vh] flex justify-center items-center">
      <div className="lg:w-1/2 h-2/3 shadow-md bg-white flex flex-col justify-evenly items-center">
        <form className="flex flex-col justify-evenly items-center">
          <span>email</span>
          <input
            className=" border-red-300 border-2"
            type="email"
            name="email"
            value={currentValue}
            autoComplete="off"
            onChange={(e) => setCurrentValue(e.target.value)}
          />
          <span>Password</span>
          <input
            className=" border-red-300 border-2"
            type="password"
            name="password"
          />
        </form>
      </div>
    </div>
  );
};

export default Form;
