import mongoose from "mongoose";

const Certificate_Schema = new mongoose.Schema({
  certificate_name: String,
  requiredField: [
    {
      placeholder: { type: String, default: "" },
      inputType: {
        type: String,
        enum: ["text", "tel", "select", "password"],
        default: "text",
      },
      isRequired: Boolean,
      options: [{ value: String, label: String }],
    },
  ],
});

const Certificate = mongoose.model("Certificate", Certificate_Schema);
export default Certificate;
