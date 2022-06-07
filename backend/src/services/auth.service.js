const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');

const loginUserWithUsernameAndPassword = async (username, password) => {
  const user = await userService.getUserByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect username or password');
  }
  return user;
};

module.exports = {
  loginUserWithUsernameAndPassword,
};
