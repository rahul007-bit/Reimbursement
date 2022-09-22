import React from "react";
import ReimbursementForm from "../components/reimbursementForm/ReimbursementForm";
import HeaderBar from "../components/header/header";

const Reimbursement = () => {
  return (
    <>
      <div className="h-auto">
        <HeaderBar />
        <ReimbursementForm />
      </div>
    </>
  );
};

export default Reimbursement;
