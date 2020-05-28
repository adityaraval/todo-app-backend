const Joi = require('@hapi/joi');

const sendCustomErrorMessages = (field, errors)=> {
  errors.forEach(err => {
    switch (err.code) {
    case 'any.empty':
      err.message = `${field} cannot be an empty field`;
      break;
    case 'any.required':
      err.message = `${field} is a required field`;
      break;
    case 'string.base':
      err.message = `${field} should be a type of \'text\'`;
      break;
    case 'string.pattern.base':
      err.message = `${field} is not a valid value`;
    default:
      break;
    }
  });
  return errors;
};

const validateUserSignup = Joi.object().keys({
  email: Joi.string().email().required().error(errors => sendCustomErrorMessages('email', errors)),
  name: Joi.string().min(2).max(30).required().error(errors => sendCustomErrorMessages('name', errors)),
  password: Joi.string().min(6).max(30).required().error(errors => sendCustomErrorMessages('password', errors)),
});

const validateUserLogin = Joi.object().keys({
  email: Joi.string().email().required().error(errors => sendCustomErrorMessages('email', errors)),
  password: Joi.string().min(6).max(30).required().error(errors => sendCustomErrorMessages('password', errors)),
});

const validateUserProfile = Joi.object().keys({
  email: Joi.string().email().required().error(errors => sendCustomErrorMessages('email', errors)),
  name: Joi.string().min(2).max(30).required().error(errors => sendCustomErrorMessages('name', errors)),
});

const validateUserPassword = Joi.object().keys({
  password: Joi.string().min(6).max(30).required().error(errors => sendCustomErrorMessages('password', errors)),
});

const validateTodoCreate = Joi.object().keys({
  title: Joi.string().required().error(errors => sendCustomErrorMessages('title', errors)),
  date: Joi.date().required(),
});

const validateTodoUpdate = Joi.object().keys({
  title: Joi.string().required().error(errors => sendCustomErrorMessages('title', errors)),
  date: Joi.date().required(),
});

const validateTodoParams = Joi.object({
  id: Joi.number().integer().required().error(errors => sendCustomErrorMessages('id', errors))
});

module.exports = {
  validateUserSignup,
  validateUserLogin,
  validateUserProfile,
  validateUserPassword,

  validateTodoCreate,
  validateTodoUpdate,
  validateTodoParams
}