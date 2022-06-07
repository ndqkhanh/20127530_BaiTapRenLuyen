const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService, tokenService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  delete user.password;
  res.status(httpStatus.CREATED).send({ user, tokens });
});

module.exports = {
  register,
};
