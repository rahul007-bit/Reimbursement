import { Joi } from "celebrate";

export const forgot_password = {
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export const reset_password = {
  body: Joi.object().keys({
    id: Joi.string().required(),
    code: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
