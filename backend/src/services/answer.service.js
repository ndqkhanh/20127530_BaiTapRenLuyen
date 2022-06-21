const httpStatus = require('http-status');
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../utils/ApiError');

const createAnswer = async (req) => {
  const checkQuestionExists = await prisma.questions.findUnique({
    where: {
      id: req.body.qid,
    },
  });
  if (!checkQuestionExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Question does not exist');
  }
  // Check if the question is approved
  if (checkQuestionExists.status !== 2) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Question is not approved');
  }
  const userid = req.user.id;
  const answer = prisma.answers.create({
    data: {
      qid: req.body.qid,
      content: req.body.content,
      uid: userid,
    },
  });
  return answer;
};

const changeAnswer = async (req) => {
  const checkAnswerExists = await prisma.answers.findUnique({
    where: {
      id: req.params.answerId,
    },
  });
  if (!checkAnswerExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Answer does not exist');
  }
  const answer = prisma.answers.update({
    where: {
      id: req.params.answerId,
    },
    data: {
      content: req.body.content,
    },
  });
  return answer;
};

const pickCorrectAnswerById = async (req) => {
  const checkAnswerExists = await prisma.answers.findUnique({
    where: {
      id: req.params.answerId,
    },
  });
  if (!checkAnswerExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Answer does not exist');
  }
  const checkOwnQuestion = await prisma.questions.findUnique({
    where: {
      id: checkAnswerExists.qid,
    },
  });
  if (checkOwnQuestion.uid !== req.user.id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are not the owner of this question');
  };
  const answer = prisma.answers.update({
    where: {
      id: req.params.answerId,
    },
    data: {
      correct: req.body.correct === true ? true : null,
    },
  });
  return answer;
};

const delAnswerById = async (answerId) => {
  const deleteAnswer = await prisma.answers.delete({
    where: {
      id: answerId,
    },
  });
  if (!deleteAnswer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Answer not found');
  }
  return deleteAnswer;
};

module.exports = {
  createAnswer,
  changeAnswer,
  delAnswerById,
  pickCorrectAnswerById,
};
