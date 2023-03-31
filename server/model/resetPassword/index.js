import mongoose from "mongoose";

const resetPasswordSchema = new mongoose.Schema(
  {
    moodleId: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "onModel",
      required: true,
    },
    onModel: {
      type: String,
      required: true,
      enum: ["User", "Admin"],
    },
    resetCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ResetPassword = mongoose.model("ResetPassword", resetPasswordSchema);

export default ResetPassword;
