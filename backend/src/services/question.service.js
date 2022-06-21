const { PrismaClient, Prisma } = require('@prisma/client');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const prisma = new PrismaClient();

const createQuestion = async (req) => {
  const userId = req.user.id;
  const question = prisma.questions.create({
    data: {
      uid: userId,
      content: req.body.content,
      title: req.body.title,
    },
  });
  return question;
};

const deleteQuestionById = async (questionId) => {
  const existQuestion = await prisma.questions.findUnique({
    where: {
      id: questionId,
    },
  });

  if (!existQuestion) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question Not Found');
  }

  const deleteQuestion = await prisma.questions.delete({
    where: {
      id: questionId,
    },
  });

  return deleteQuestion;
};

const updateQuestion = async (req) => {
  const { questionId } = req.params;
  const question = await prisma.questions.findUnique({
    where: {
      id: questionId,
    },
  });

  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question Not Found');
  }

  const newTitle = req.body.title;
  const newContent = req.body.content;

  const updatedQuestion = await prisma.questions.update({
    where: {
      id: questionId,
    },
    data: {
      content: newContent,
      title: newTitle,
    },
  });

  return updatedQuestion;
};

const searchQuestion = async (req) => {
  const listQuestions = await prisma.answers.findMany({
    cursor: {
      id: req.params.offset,
    },
    take: req.params.limit,
    where: {
      body: {
        search: req.body.keyword,
      },
    },
  });

  if (!listQuestions) {
    throw new ApiError(httpStatus.NOT_FOUND, 'There is no questions related to keywords');
  }

  return listQuestions;
};

const getLatestFeed = async (page) => {
  const configuration = await prisma.configuration.findUnique({
    where: {
      slug: 'NUM_OF_QUESTIONS_IN_FEED',
    },
  });

  let numFeed = 10;
  try {
    numFeed = parseInt(configuration.value);
  } catch (error) {
    console.log('Not a number', error);
  }

  const feed = await prisma.questions.findMany({
    skip: page * numFeed,
    take: numFeed,
    where: {
      status: 2,
    },
    orderBy: {
      updated_at: 'desc',
    },
  });

  for (let i = 0; i < feed.length; i++) {
    const question = feed[i];
    question.numOfAnswers = await prisma.answers.count({
      where: {
        qid: question.id,
      },
    });
    const answer = await prisma.answers.findFirst({
      where: {
        qid: question.id,
        correct: true,
      },
    });
    question.correctAnswerExists = !!answer;
  }

  return feed;
};

module.exports = {
  createQuestion,
  deleteQuestionById,
  updateQuestion,
  searchQuestion,
  getLatestFeed,
};
