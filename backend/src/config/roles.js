const generalRoles = ['getUser', 'updateUser', 'createAnswer', 'updateAnswer', 'deleteAnswer', 'pickCorrectAnswer'];

const allRoles = {
  user: generalRoles,
  admin: generalRoles,
  moderator: generalRoles,
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
