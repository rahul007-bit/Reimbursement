import config from "../../config/index.js";
import Admin from "../../model/admin/model.js";

const controller = Object.create(null); // {}
controller.signUp = async (req, res) => {
    const { moodleId,password } = req.body;
   const admin = await Admin.findOne({moodleId:moodleId})
   console.log(admin) 
   if(admin){
    return res.send({success:false,message:"User Already Exist with provided Moodle Id"})
   }else{
    const newAdmin=new Admin()
    const haspassword=await newAdmin.generate_hash(password);
    await Admin.create({moodleId:moodleId,password:haspassword})
    return res.send({message:"Creating"})
   }
};
controller.signIn = async (req, res) => {};
controller.updateProfile = async (req, res) => {};
controller.viewProfile = async (req, res) => {};
controller.applyReimbursement = async (req, res) => {};
controller.viewReimbursement = async (req, res) => {};
controller.deleteReimbursement = async (req, res) => {};

export default controller;
