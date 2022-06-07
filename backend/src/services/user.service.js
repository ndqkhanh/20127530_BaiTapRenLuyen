const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const ApiError = require('../utils/ApiError');

const createUser = async (userBody) => {
  const saltRounds = 10;

  userBody.password = await bcrypt.hash(userBody.password, saltRounds);

  const checkUsername = await prisma.users.findUnique({
    where: {
      username: userBody.username,
    },
  });

  if (checkUsername) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }

  const user = await prisma.users.create({
    data: userBody,
  });

  return user;
};

const getUserById = async (id) => {
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  });
  user.numOfQuestions = await prisma.questions.count({
    where: {
      uid: id,
    },
  });
  user.numOfAnswers = await prisma.answers.count({
    where: {
      uid: id,
    },
  });
  return user;
};

const getUserByUsername = async (username) => {
  return prisma.users.findUnique({
    where: {
      username,
    },
  });
};

const updateUserById = async (userId, updateBody) => {
  const checkUserExists = await getUserById(userId);
  if (!checkUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const user = await prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      name: updateBody.name,
      profilepictureurl: updateBody.profilepictureurl,
    },
  });
  return user;
};

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
  updateUserById,
};
