import { Joi } from "celebrate";
const requestValidator = {
  // Login
  signIn: {
    body: Joi.object().keys({
      moodleId: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  // create new account
  signUp: {
    body: Joi.object().keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      moodleId: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      type: Joi.string().required(),
    }),
  },
};

export default requestValidator;
