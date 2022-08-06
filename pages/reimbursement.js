import React, { useReducer } from "react";
import ReimbursementForm from "../components/reimbursementForm/ReimbursementForm";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const Reimbursement = () => {
  const [formData, setFormData] = useReducer(formReducer, {});

  return (
    <>
      <div className="h-screen">
        <ReimbursementForm formData={formData} />
      </div>
    </>
  );
};

export default Reimbursement;
