import logger from "../../config/logger.js";
import Certificate from "../../model/certificate/model.js";

export const createCertificate = async ({ certificate_name, questions }) => {
  try {
    // validate certificate details
    if (!certificate_name) {
      return {
        status: 400,
        message: "Certificate name is required",
        success: false,
      };
    }
    if (questions.length === 0) {
      return {
        status: 400,
        message: "Questions are required",
        success: false,
      };
    }

    // create certificate
    const certificate = new Certificate({
      certificate_name: certificate_name,
      questions: [...questions],
    });
    await certificate.save();

    return {
      status: 200,
      message: "Certificate created successfully",
      success: true,
    };
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      message: "Internal server error",
      success: false,
    };
  }
};

export const getCertificates = async (query) => {
  try {
    const params = Object.create(null);
    if (query.certificate_id) {
      params._id = query.certificate_id;
    }
    const certificates = await Certificate.find(params);
    return {
      status: 200,
      message: "Certificates fetched successfully",
      success: true,
      data: certificates,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal server error",
      success: false,
    };
  }
};

export const deleteCertificate = async (certificate_id) => {
  try {
    const certificate = await Certificate.deleteOne({ _id: certificate_id });
    if (certificate.deletedCount === 0) {
      return {
        status: 400,
        message: "Certificate not found",
        success: false,
      };
    }
    return {
      status: 200,
      message: "Certificate deleted successfully",
      success: true,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal server error",
      success: false,
    };
  }
};
