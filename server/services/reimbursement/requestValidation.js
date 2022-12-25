import { Joi } from "celebrate";

export const reimbursementValidator = {
  requestReimbursement: {
    body: Joi.object().keys({
      certificate_id: Joi.string().required(),
      bankDetails: Joi.object().required().keys({
        accountNumber: Joi.string().required(),
        IFSCode: Joi.string().required(),
      }),
      amountToReimbursement: Joi.string().required(),
      reimbursementDetails: Joi.object(),
      certificateUrl: Joi.object().required().keys({
        url: Joi.string().required(),
        filename: Joi.string().required(),
        type: Joi.string().required(),
      }),
      department: Joi.string().required(),
    }),
  },
};
