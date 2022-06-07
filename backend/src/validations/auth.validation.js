const Joi = require('joi');
const { password, username } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    username: Joi.string().required().custom(username),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    profilepictureurl: Joi.string().required(),
  }),
};

module.exports = {
  register,
};
