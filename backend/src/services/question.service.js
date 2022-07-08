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

const countQuestionInDB = async (req) =>
{
  const countQuestion = await prisma.questions.count({});
  return countQuestion;
}
const searchQuestion = async (req) =>
{
    const countQuestions = await prisma.questions.count({});
    if (req.params.offset > countQuestions / req.params.limit)
    {
        throw new ApiError (httpStatus.NOT_FOUND, "Not Found Questions Related");
    }

    const listQuestions = await prisma.questions.findMany(
        {
            skip: req.params.offset * req.params.limit,
            take: req.params.limit,
            where : {
                title : {
                   contains : req.body.keyword,
                },
            },
        }
    );

    if (!listQuestions)
    {
        throw new ApiError (httpStatus.NOT_FOUND, "There is no questions related to keywords");  
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
    question.userData = await prisma.users.findUnique({
      where: {
        id: question.uid,
      },
      select: {
        name: true,
        profilepictureurl: true,
      },
    });
  }

  const quesCount = await prisma.questions.count({
    where: {
      status: 2,
    },
  });

  return { count: quesCount, data: feed };
};

const getQuestionByID = async (req) =>
{
  const question = await prisma.questions.findUnique ({
    where : {id: req.params.questionId,},
  }); 
  return question;
}
const GetAnswersByQuestionIDPagination = async(req) => {
  const answers = await prisma.answers.findMany({
    skip: req.params.page * req.params.limit,
    take: req.params.limit,
    where : {qid: req.params.questionId,},
  });

  return answers;
};

const GetAnswersAndVotings = async (answers) => {
  answersAndvotings = []
  for (let i = 0; i < answers.length; i++)
  {
    const upvotes = await prisma.voting.findMany({
      where : {aid: answers[i].id, status : true }
    });

    const downvotes = await prisma.voting.findMany({
      where : {aid: answers[i].id, status : false }
    });

    const user = await prisma.users.findUnique({
      where : {id: answers[i].uid}
    });

    answersAndvotings.push({
      answer: answers[i], 
      count_upvotes: upvotes.length,
      count_downvotes: downvotes.length,
      minus_upvote_downvote: upvotes.length - downvotes.length,
      username: user.username,
      profilepictureurl: user.profilepictureurl})
  }

  return answersAndvotings;
};

const countAnswerByQuestionID = async (req) =>
{
  const answers = await prisma.answers.findMany({
    where : {qid: req.params.questionId,},
  });

  return answers.length;
}
module.exports = {
  createQuestion,
  deleteQuestionById,
  updateQuestion,
  searchQuestion,
  getLatestFeed,
  GetAnswersByQuestionIDPagination,
  GetAnswersAndVotings,
  countAnswerByQuestionID,
  countQuestionInDB,
  getQuestionByID,
};
