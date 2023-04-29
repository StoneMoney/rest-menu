const allRoles = {
  user: ['getItems'],
  admin: ['getUsers', 'getItems', 'manageUsers', 'manageItems'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
