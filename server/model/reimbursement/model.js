import mongoose from "mongoose";

const Reimbursement_Schema = new mongoose.Schema(
  {
    certificate_name: String,
    // certificate: { type: mongoose.Schema.Types.ObjectId, ref: "Certificate" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bankDetails: {
      accountNumber: String,
      IFSCode: String,
    },
    certificateUrl: Object,
    // recipientUrl: String,
    amountToReimbursement: String,
    status: {
      type: String,
      enum: ["PENDING", "In Process", "Approved"],
      default: "PENDING",
    },
    additionalDetails: { type: Object, default: {} },
    department: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Reimbursement = new mongoose.model("Reimbursement", Reimbursement_Schema);
export default Reimbursement;
