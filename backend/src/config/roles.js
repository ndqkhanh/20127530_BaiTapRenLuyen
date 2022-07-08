const allRoles = {
  user: [
    'getProfile',
    'getUser',
    'updateUser',
    'createQuestion',
    'deleteQuestion',
    'updateQuestion',
    'createAnswer',
    'voteAnswer',
    'searchQuestion',
    'updateAnswer',
    'deleteAnswer',
    'pickCorrectAnswer',
    'getLatestFeed',
  ],

  moderator: ['approveDeclineQuestion', 'getPendingQuestions', 'banUser', 'getMetrics', 'getUsers'],

  admin: ['listConfigurations', 'setConfiguration', 'getAllAnswersAndVotings'],
};

allRoles.moderator = [...allRoles.moderator, ...allRoles.user];
allRoles.admin = [...allRoles.admin, ...allRoles.moderator];

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
