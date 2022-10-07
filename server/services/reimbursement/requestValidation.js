import { Joi } from "celebrate";

export const reimbursementValidator = {
  requestReimbursement: {
    body: Joi.object().keys({
      certificate_name: Joi.string().required(),
      bankDetails: Joi.object().required().keys({
        accountNumber: Joi.string().required(),
        IFSCode: Joi.string().required(),
      }),
      amountToReimbursement: Joi.string().required(),
      additionalDetails: Joi.object(),
    }),
  },
};
