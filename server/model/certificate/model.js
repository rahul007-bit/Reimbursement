import mongoose from "mongoose";

const Certificate_Schema = new mongoose.Schema(
  {
    certificate_name: String,
    questions: [
      {
        question: String,
        id: String,
        options: [],
        type: String,
        checkbox: [],
        dropDown: [],
        required: Boolean,
      },
    ],
  },
  {
    typeKey: "$type",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Certificate = mongoose.model("Certificate", Certificate_Schema);
export default Certificate;
