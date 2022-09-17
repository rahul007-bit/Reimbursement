import mongoose from "mongoose";

const Reimbursement_Schema = new mongoose.Schema({
  certificate_id: { type: mongoose.Schema.Types.ObjectId, ref: "Certificate" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bankDetails: {
    accountNumber: String,
    IFSCode: String,
  },
  amountToReimbursement: String,
});
