import Reimbursement from "../../model/reimbursement/model.js";
import logger from "../../config/logger.js";

export const createReimbursement = async ({
  certificate_name,
  user_id,
  bankDetails,
  amountToReimbursement,
}) => {
  try {
    await Reimbursement.create({
      certificate_name: certificate_name,
      user_id: user_id,
      bankDetails: bankDetails,
      amountToReimbursement: amountToReimbursement,
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

    if (query.postId) {
      params["_id"] = query.postId;
    }
    if (query.createdAt) {
      let date = new Date(query.createdAt);
      let result = new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000);
      params["startDate"] = date;
      params["endDate"] = result;
    }
    if (query.userId) {
      params["user_id"] = query.userId;
    }
    const sortOptions = {
      [sortBy]: sortOrder,
    };

    // const totalResults = await Reimbursement.countDocuments({
    //   $or: [
    //     params,
    //     { createdAt: { $gte: params.startDate, $lt: params.endDate } },
    //   ],
    // });

    const results = await Reimbursement.find({
      $or: [
        params,
        { createdAt: { $gte: params.startDate, $lt: params.endDate } },
      ],
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
    return { success: false, message: error.message, status: 500 };
  }
};
