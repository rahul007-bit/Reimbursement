import mongoose from "mongoose";

const Certificate_Schema = new mongoose.Schema({
  certificate_name: String,
  requiredField: [Object],
});

const Certificate = mongoose.model("Certificate", Certificate_Schema);
export default Certificate;
