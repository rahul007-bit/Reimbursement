import Reimbursement from "../../model/reimbursement/model.js";
import logger from "../../config/logger.js";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import config from "../../config/index.js";
import Admin from "../../model/admin/model.js";
import sendMail from "../mail/sendMail.js";

export const createReimbursement = async ({
  certificate_id,
  user_id,
  bankDetails,
  amountToReimburse,
  reimbursementDetails,
  certificateUrl,
  department,
  email,
}) => {
  try {
    await Reimbursement.create({
      certificate: certificate_id,
      user_id,
      bankDetails,
      amountToReimburse,
      reimbursementDetails,
      certificateUrl,
      department,
    });
    // get the sub-admin for the department
    const admin = await Admin.findOne({ role: "sub_admin", department });

    let mailDetailsAdmin = {
      from: process.env.email,
      to: config.admin.email,
      subject: `New Reimbursement Request from ${email}`,
      text: `
      New Reimbursement Request from ${email}.\n
      Amount to be reimbursed: ${amountToReimburse}\n
      Reimbursement Details:\n
      \tCertificate Name: ${reimbursementDetails.certificate_name}\n
      `,
    };
    if (admin) {
      mailDetailsAdmin.to = admin.email;
      sendMail(mailDetailsAdmin)
        .then((response) => {
          logger.info("Mail sent to admin");
        })
        .catch((error) => {
          logger.error(error);
        });
    } else {
      sendMail(mailDetailsAdmin)
        .then(() => {
          logger.info("Mail sent to admin");
        })
        .catch((error) => {
          logger.error(error);
        });
    }

    let mailDetailsUser = {
      from: process.env.email,
      to: email,
      subject: `Reimbursement Request Submitted Successfully for ${reimbursementDetails.certificate_name}`,
      text: `Reimbursement Request Submitted Successfully for ${reimbursementDetails.certificate_name}`,
    };
    return sendMail(mailDetailsUser)
      .then(() => {
        logger.info("Mail sent to user");
        return {
          success: true,
          message: "Successfully Request your reimbursement!!",
          status: 200,
        };
      })
      .catch((error) => {
        logger.error(error);
        return {
          success: false,
          message: error.message,
          status: 500,
        };
      });
  } catch (error) {
    logger.error(error);
    return { success: false, message: error.message, status: 500 };
  }
};

export const getReimbursement = async (query) => {
  try {
    let params = Object.create(null);

    if (query.createdAt) {
      let date = new Date(query.createdAt);
      let result = new Date(date.getTime() + 24 * 60 * 60 * 1000);
      params["startDate"] = date;
      params["endDate"] = result;
    }

    if (query._id) {
      params["_id"] = mongoose.Types.ObjectId(query._id);
    }

    if (query.certificate_id) {
      params["certificate"] = mongoose.Types.ObjectId(query.certificate_id);
    }

    if ("approvedBySubAdmin" in query) {
      params["approvedBySubAdmin"] = query.approvedBySubAdmin;
    }

    if ("approvedByAdmin" in query) {
      params["approvedByAdmin"] = query.approvedByAdmin;
    }

    if (query.userId) {
      params["user_id"] = mongoose.Types.ObjectId(query.userId);
    }

    if (query.status) {
      params["status"] = query.status;
    }
    if (query.not_status) {
      params["status"] = { $ne: query.not_status };
    }

    if (query.department) {
      params["department"] = query.department;
    }

    if (query.certificate_name) {
      params["reimbursementDetails.certificate_name"] =
        query.reimbursementDetails.certificate_name;
    }

    if (query.assignToReimburse) {
      params["assignToReimburse"] = mongoose.Types.ObjectId(
        query.assignToReimburse
      );
    }

    const results = await Reimbursement.find({
      $or: [params],
    });

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

    if (query.not_status) {
      params["status"] = { $ne: query.not_status };
    }

    if (query.department) {
      params["user.department"] = query.department;
    }

    if (query.certificate_name) {
      params["reimbursementDetails.certificate_name"] = query.certificate_name;
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

export const approveReimbursement = async ({
  reimburse_id,
  admin,
  assignedTo,
  isApproved,
  remarks,
}) => {
  try {
    const result = await Reimbursement.findOne({ _id: reimburse_id });

    if (!result) {
      return {
        status: 404,
        success: false,
        message: "Reimbursement Not Found!",
      };
    }
    let mailDetails = {
      from: config.admin.email,
      to: result.reimbursementDetails.email,
    };

    if (admin.role === "sub_admin") {
      result.remarks.bySubAdmin = remarks;
      if (isApproved) {
        result.approvedBySubAdmin = true;
        result.status = "In Progress";

        mailDetails.subject = "Reimbursement Approved by Head of Department";
        mailDetails.text = `Your Reimbursement has been approved by the Head of Department. Please wait for the approval from the Admin`;
        await result.save();

        return sendMail(mailDetails)
          .then(() => {
            return {
              status: 200,
              success: true,
              message: "Reimbursement Approved",
            };
          })
          .catch((err) => {
            console.log(err);
            return {
              status: 500,
              success: false,
              message: err.message,
            };
          });
      } else {
        result.approvedBySubAdmin = false;
        result.status = "Rejected";
        mailDetails.subject = "Reimbursement Rejected by Head of Department";
        mailDetails.text = `Your Reimbursement has been rejected by the Head of Department. Please contact the Admin for more details`;
        await result.save();

        return sendMail(mailDetails)
          .then(() => {
            return {
              status: 200,
              success: true,
              message: "Reimbursement Rejected",
            };
          })
          .catch((err) => {
            console.log(err);
            return {
              status: 500,
              success: false,
              message: err.message,
            };
          });
      }
    }
    if (admin.role === "admin") {
      result.remarks.byAdmin = remarks;
      if (isApproved) {
        if (!assignedTo) {
          return {
            status: 404,
            success: false,
            message: "Please assign someone to this reimbursement",
          };
        }
        const assignedToReceptionist = await Admin.findOne({ _id: assignedTo });
        if (!assignedToReceptionist) {
          return {
            status: 404,
            success: false,
            message: "It seems the assigned person is not a receptionist",
          };
        }

        result.assignToReimburse = assignedTo;
        result.approvedByAdmin = true;

        result.status = "In Progress";
        await result.save();
        mailDetails.subject = "Reimbursement Approved by Admin";
        mailDetails.text = `Your Reimbursement has been approved by the Admin. Please wait for the final approval from the Receptionist`;

        return sendMail(mailDetails)
          .then(() => {
            return {
              status: 200,
              success: true,
              message: "Reimbursement Approved",
            };
          })
          .catch((err) => {
            console.log(err);
            return {
              status: 500,
              success: false,
              message: err.message,
            };
          });
      }
      result.approvedByAdmin = false;
      result.status = "Rejected";
      mailDetails.subject = "Reimbursement Rejected by Admin";
      mailDetails.text = `Your Reimbursement has been rejected by the Admin. Please contact the Admin for more details`;
      await result.save();

      return sendMail(mailDetails)
        .then(() => {
          return {
            status: 200,
            success: true,
            message: "Reimbursement Rejected",
          };
        })
        .catch((err) => {
          console.log(err);
          return {
            status: 500,
            success: false,
            message: err.message,
          };
        });
    }
    if (admin.role === "receptionist") {
      if (!admin._id === result.assignToReimburse) {
        return {
          status: 404,
          success: false,
          message: "You are not assigned to this reimbursement",
        };
      }
      result.remarks.byReceptionist = remarks;
      if (isApproved) {
        result.approvedByReceptionist = true;
        result.status = "Approved";
        await result.save();
        mailDetails.subject =
          "Congratulation your Reimbursement has been approved";
        mailDetails.text = `Congratulation your Reimbursement has been approved.`;

        return sendMail(mailDetails)
          .then(() => {
            return {
              status: 200,
              success: true,
              message: "Reimbursement Approved",
            };
          })
          .catch((err) => {
            console.log(err);
            return {
              status: 500,
              success: false,
              message: err.message,
            };
          });
      }
      result.approvedByReceptionist = false;
      result.status = "Rejected";
      mailDetails.subject = "Reimbursement Rejected by Receptionist";
      mailDetails.text = `Your Reimbursement has been rejected by the Receptionist. Please contact the Admin for more details`;
      await result.save();

      return sendMail(mailDetails)
        .then(() => {
          return {
            status: 200,
            success: true,
            message: "Reimbursement Rejected",
          };
        })
        .catch((err) => {
          console.log(err);
          return {
            status: 500,
            success: false,
            message: err.message,
          };
        });
    }
    return {
      status: 401,
      success: false,
      message: "You are not authorized to approve this reimbursement",
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

export const approveReimbursementReceptionist = async (id) => {
  try {
    const result = await Reimbursement.findOne({
      _id: id,
    });
    result.status = "Approved";
    result.approvedByReceptionist = true;
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
      to: result.reimbursementDetails.email,
      subject: `Congratulation your ${result.reimbursementDetails.certificate_name} reimbursement has been approved by receptionist`,
      text: `Congratulation your ${result.reimbursementDetails.certificate_name} reimbursement has been approved by receptionist`,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        return {
          status: 500,
          success: false,
          message: err.message,
        };
      } else {
        return {
          status: 200,
          success: true,
          message: "Record has been updated",
        };
      }
    });
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

export const deleteReimbursement = async (id) => {
  try {
    await Reimbursement.findOne({ _id: id }).remove();
    return {
      status: 200,
      success: true,
      message: "Record has been deleted successfully",
    };
  } catch (error) {}
};

export const getReimbursementsCertificateStatusCount = async () => {
  const data = await Reimbursement.aggregate([
    // sum of all the status and push certificate name in array with same status
    {
      $group: {
        _id: {
          status: "$status",
          certificate: "$reimbursementDetails",
          id: "$_id",
        },
        count: { $sum: 1 },
      },
    },
    // sum of all the as status of certificate name
    {
      $group: {
        _id: "$_id.certificate.certificate_name",
        count: { $sum: "$count" },
        status: {
          $push: {
            status: "$_id.status",
            id: "$_id.id",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        certificate_name: "$_id",
        count: 1,
        status: 1,
      },
    },
  ]);
  return {
    status: "200",
    message: "Success",
    success: true,
    data,
  };
};
