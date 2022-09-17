import config from "../../config/index.js";
import User from "../../model/user/model.js"

const controller = Object.create(null); // {}
controller.signUp = async (req, res) => {
    const { moodleId, password } = req.body;
    const user = await User.findOne({ moodleId: moodleId })
    if (user) {
        return res.status(400).send({ sucess: true, message: "User already exists with provided moodleId" })

    }
     else {
        const newUser = new User();
        const hashPassword= newUser.generate_hash(password);

        await User.create({
            moodleId:moodleId,password:hashPassword
        })
        return res.send({sucess:true,message:"SignUp successful"})

    }
    console.log(user);
    return res.send(user)
};
controller.signIn = async (req, res) => {
    const { moodleId, password } = req.body;
    const user = await User.findOne({ moodleId: moodleId })
    if (user == null) {
        return res.send({ sucess: false, message: "Invalid Moodleid" })
    } else {
        if (await user.valid_password(password)) {
            const userData = {}
            userData.username = user.username;
            userData.profile_pic = user.profile_pic;
            return res.send({ sucess: true, message: "Login successfull", userData: userData })
        }

    }
};
controller.updateProfile = async (req, res) => { };
controller.viewProfile = async (req, res) => { };
controller.applyReimbursement = async (req, res) => { };
controller.viewReimbursement = async (req, res) => { };
controller.deleteReimbursement = async (req, res) => { };

export default controller;
