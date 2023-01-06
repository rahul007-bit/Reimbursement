import { Joi } from "celebrate";

export const sub_admin = {
  addSubAdmins: {
    body: Joi.object().keys({
      subAdmins: Joi.array()
        .items({
          first_name: Joi.string().required(),
          last_name: Joi.string().required(),
          email: Joi.string().required(),
          moodleId: Joi.string().required(),
          password: Joi.string().required(),
          role: Joi.string().required().valid("sub_admin"),
          department: Joi.string().required(),
        })
        .required(),
    }),
  },
  addSubAdmin: {
    body: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      moodleId: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().required().valid("sub_admin"),
      department: Joi.string().required(),
    }),
  },
};

export const receptionist = {
  addReceptionists: {
    body: Joi.object().keys({
      receptionists: Joi.array()
        .items({
          first_name: Joi.string().required(),
          last_name: Joi.string().required(),
          email: Joi.string().required(),
          moodleId: Joi.string().required(),
          password: Joi.string().required(),
          role: Joi.string().required().valid("receptionist"),
        })
        .required(),
    }),
  },
  addReceptionist: {
    body: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      moodleId: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().required().valid("receptionist"),
    }),
  },
};
