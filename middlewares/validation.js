/* added for Sprint 15 */

const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.email");
};

const validateCreateItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    weather: Joi.string().valid("hot", "warm", "cold").required().messages({
      "string.empty": 'A "weather" type must be selected',
    }),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    // avatar can't be required to allow for situation mentioned in
    // Sprint 14 of creating a user logo w/ first letter of their
    // first name if no avatar is provided
    avatar: Joi.string().custom(validateURL).messages({
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    email: Joi.string().required().email(validateEmail).message({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid url',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(validateEmail).message({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid url',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().length(24).hex().required().messages({
      "string.empty": 'The "id" field must be filled in',
      "string.hex": 'The "id" must be a hexadecimal value',
      "String.length": 'The "id" must be 24 characters',
    }),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.empty": 'The "name" field must be filled in',
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    // avatar can't be required to allow for situation mentioned in
    // Sprint 14 of creating a user logo w/ first letter of their
    // first name if no avatar is provided
    avatar: Joi.string().custom(validateURL).messages({
      "string.uri": 'The "imageUrl" field must be a valid URL',
    }),
  }),
});

module.exports = {
  validateCreateItem,
  validateCreateUser,
  validateLogin,
  validateItemId,
  validateUpdateProfile,
};
