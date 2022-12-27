import mongoose from "mongoose";

const Reimbursement_Schema = new mongoose.Schema(
  {
    certificate: { type: mongoose.Schema.Types.ObjectId, ref: "Certificate" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bankDetails: {
      accountNumber: String,
      IFSCode: String,
    },
    certificateUrl: Object,
    amountToReimburse: String,
    status: {
      type: String,
      enum: ["PENDING", "In Progress", "Approved", "Rejected"],
      default: "PENDING",
    },
    reimbursementDetails: Object,
    department: String,
    assignToReimburse: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    approvedBySubAdmin: {
      type: Boolean,
      default: false,
    },
    approvedByAdmin: {
      type: Boolean,
      default: false,
    },
    approvedByReceptionist: {
      type: Boolean,
      default: false,
    },
    remarks: {
      bySubAdmin: String,
      byAdmin: String,
      byReceptionist: String,
    },
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
