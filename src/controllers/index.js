const userUpdate = require('./users/updateUser');
const getUsers = require('./users/getUsers');
const getUserById = require('./users/getUserById');
const createUser = require('./users/createUser');
const deleteUserById = require('./users/deleteUserById');
const updateBio = require('./users/updateBio');

module.exports = {
  updateBio,
  userUpdate,
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
};
