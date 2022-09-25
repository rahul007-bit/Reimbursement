import React from "react";
import ReimbursementForm from "../components/reimbursementForm/ReimbursementForm";
import HeaderBar from "../components/header/header";
import { Auth } from "../components/Auth";
import Head from "next/head";
const Reimbursement = () => {
  return (
    <>
      <Head>
        <title>Reimbursement</title>
      </Head>
      <div className="h-auto">
        <Auth>
          <HeaderBar />
          <ReimbursementForm />
        </Auth>
      </div>
    </>
  );
};

export default Reimbursement;
