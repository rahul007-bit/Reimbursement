import Reimbursement from "../../model/reimbursement/model.js";
import logger from "../../config/logger.js";
import user from "../../controllers/user/index.js";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
export const createReimbursement = async ({
  certificate_name,
  user_id,
  bankDetails,
  amountToReimbursement,
  department,
  additionalDetails,
  // recipientUrl,
  certificateUrl,
}) => {
  try {
    await Reimbursement.create({
      certificate_name: certificate_name,
      user_id: user_id,
      bankDetails: bankDetails,
      amountToReimbursement: amountToReimbursement,
      department: department,
      additionalDetails: additionalDetails,
      certificateUrl: certificateUrl,
      // recipientUrl: recipientUrl,
    });

    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.pass,
      },
    });

    let mailDetailsUser = {
      from: process.env.email,
      to: additionalDetails.email,
      subject: `You have Successfully applied ${certificate_name} reimbursement`,
      text: `You have Successfully applied ${certificate_name} reimbursement`,
    };
    let mailDetailsAdmin = {
      from: process.env.email,
      to: "20104093@apsit.edu.in",
      subject: `You have new ${certificate_name} reimbursement Request`,
      text: `You have new ${certificate_name} reimbursement Request`,
    };

    await mailTransporter.sendMail(mailDetailsUser, function (err, data) {
      if (err) {
        console.log("Error Occurs");
        console.log(err);
      } else {
        console.log("Email sent successfully");
      }
    });
    await mailTransporter.sendMail(mailDetailsAdmin, function (err, data) {
      if (err) {
        console.log("Error Occurs");
        console.log(err);
      } else {
        console.log("Email sent successfully");
      }
    });

    return {
      success: true,
      message: "Successfully Request your reimbursement!!",
      status: 200,
    };
  } catch (error) {
    logger.error(error);
    return { success: false, message: error.message, status: 500 };
  }
};

export const getReimbursement = async (query) => {
  try {
    const sortBy = query.sortBy || "createdAt";
    const sortOrder = query.sortOrder ? parseInt(sortOrder) : 1;

    let params = Object.create(null);

    if (query.createdAt) {
      let date = new Date(query.createdAt);
      let result = new Date(date.getTime() + 24 * 60 * 60 * 1000);
      params["startDate"] = date;
      params["endDate"] = result;
    }

    if (query.userId) {
      params["user_id"] = mongoose.Types.ObjectId(query.userId);
    }

    if (query.status) {
      params["status"] = query.status;
    }

    if (query.department) {
      params["department"] = query.department;
    }

    if (query.certificate_name) {
      params["certificate_name"] = query.certificate_name;
    }

    const sortOptions = {
      [sortBy]: sortOrder,
    };

    const results = await Reimbursement.find({
      $or: [params],
    });
    console.log(results);
    if (results.length > 0)
      return {
        success: true,
        message: "Here is your Result",
        data: results,
        status: 200,
      };

    return {
      success: false,
      message: "Oops!, It Seems there is nothing to show.",
      status: 404,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message, status: 500 };
  }
};

export const ReimbursementCount = async (get) => {
  try {
    const result = await Reimbursement.aggregate([
      { $group: { _id: `$${get}`, Total: { $sum: 1 } } },
    ]);
    return {
      status: 200,
      message: "Here we go!",
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      success: false,
    };
  }
};

export const getFullReimbursementInfo = async (query) => {
  try {
    let params = Object.create(null);

    if (query.createdAt) {
      let date = new Date(query.createdAt);
      let result = new Date(date.getTime() + 24 * 60 * 60 * 1000);
      params["startDate"] = date;
      params["endDate"] = result;
    }

    if (query.userId) {
      params["user_id"] = mongoose.Types.ObjectId(query.userId);
    }

    if (query.status) {
      params["status"] = query.status;
    }

    if (query.department) {
      params["user.department"] = query.department;
    }

    if (query.certificate_name) {
      params["certificate_name"] = query.certificate_name;
    }

    const result = await Reimbursement.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $match: { ...params },
      },
    ]);
    if (result.length > 0)
      return {
        status: 200,
        success: true,
        message: "Got your data",
        data: result,
      };
    else
      return {
        success: false,
        message: "Oops!, It Seems there is nothing to show.",
        status: 404,
      };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: error.message,
    };
  }
};

export const getFullReimbursement = async () => {
  try {
    const result = await Reimbursement.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);
    return {
      status: 200,
      success: true,
      message: "Got your data",
      data: result,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: error.message,
    };
  }
};

export const approveReimbursement = async (id) => {
  try {
    const result = await Reimbursement.findOne({ _id: id });
    result.status = "Approved";
    await result.save();

    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.pass,
      },
    });

    let mailDetails = {
      from: process.env.email,
      to: result.additionalDetails.email,
      subject: `Congratulation your ${result.certificate_name} reimbursement has been approved`,
      text: `Congratulation your ${result.certificate_name} reimbursement has been approved`,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs");
        console.log(err);
      } else {
        console.log("Email sent successfully");
      }
    });

    return {
      status: 200,
      success: true,
      message: "Record has been updated",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      success: false,
      message: error.message,
    };
  }
};

export const updateReimbursement = async (id, details) => {
  try {
    await Reimbursement.findOneAndUpdate({ _id: id }, { details });
    return {
      status: 200,
      success: true,
      message: "Record has been updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      success: false,
      message: error.message,
    };
  }
};
