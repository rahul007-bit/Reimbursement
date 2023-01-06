import Certificate from "../certificate/model.js";
import Reimbursement from "../reimbursement/model.js";
const resolvers = {
  Query: {
    getReimbursements: async () => {
      const data = await Reimbursement.find({});
      return data;
    },
    getReimbursement: async (_, { id }) => {
      const data = await Reimbursement.findById(id);
      return data;
    },
    getReimbursementsCount: async () => {
      const data = await Reimbursement.aggregate([
        // sum of all the certificate name
        {
          $group: {
            _id: "$reimbursementDetails.certificate_name",
            count: { $sum: 1 },
          },
        },

        {
          $project: {
            _id: 0,
            count: 1,
            certificate_name: "$_id",
          },
        },
      ]);

      console.log(data);
      return {
        status: "200",
        message: "Success",
        success: true,
        data,
      };
    },
    getReimbursementsStatusCount: async () => {
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
        {
          $group: {
            _id: "$_id.status",
            count: { $sum: "$count" },
            certificate_name: {
              // push object in array with name
              $push: {
                name: "$_id.certificate.certificate_name",
                id: "$_id.id",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            status: "$_id",
            count: 1,
            certificate_name: 1,
          },
        },
      ]);
      return {
        status: "200",
        message: "Success",
        success: true,
        data,
      };
    },

    getReimbursementsCertificateStatusCount: async () => {
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
    },

    getReimbursementsDepartmentWiseStatus: async () => {
      // sum of all the status and push certificate name in array with same status and department wise
      const data = await Reimbursement.aggregate([
        {
          $group: {
            _id: {
              status: "$status",
              certificate: "$reimbursementDetails",
              id: "$_id",
              department: "$department",
            },
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: { status: "$_id.status", department: "$_id.department" },
            count: { $sum: "$count" },
            certificate_name: {
              $push: {
                name: "$_id.certificate.certificate_name",
                id: "$_id.id",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            status: "$_id.status",
            department: "$_id.department",
            count: 1,
            certificate_name: 1,
          },
        },
      ]);
      console.log(data);
      return {
        status: "200",
        message: "Success",
        success: true,
        data,
      };
    },

    getReimbursementsDepartmentWise: async () => {
      const data = await Reimbursement.aggregate([
        {
          $group: {
            _id: {
              department: "$department",
              certificate: "$reimbursementDetails",
              id: "$_id",
            },
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: "$_id.department",
            count: { $sum: "$count" },
            certificate_name: {
              $push: {
                name: "$_id.certificate.certificate_name",
                id: "$_id.id",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            department: "$_id",
            count: 1,
            certificate_name: 1,
          },
        },
      ]);
      console.log(data);
      return {
        status: "200",
        message: "Success",
        success: true,
        data,
      };
    },

    getCertificates: async () => {
      const data = await Certificate.find({});
      return data;
    },
    getCertificate: async (_, { id }) => {
      const data = await Certificate.findById(id);
      return data;
    },
  },
};

export default resolvers;
