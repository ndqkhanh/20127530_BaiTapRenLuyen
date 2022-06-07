const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router
  .route('/:userId')
  .get(auth('getUser'), validate(userValidation.getUser), userController.getUser)
  .post(auth('updateUser'), validate(userValidation.updateUser), userController.updateUser);

module.exports = router;
