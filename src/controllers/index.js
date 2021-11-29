const userUpdate = require('./users/updateUser');
const getUsers = require('./users/getUsers');
const getUserById = require('./users/getUserById');
const deleteUserById = require('./users/deleteUserById');
const updateBio = require('./users/updateBio');

module.exports = {
  updateBio,
  userUpdate,
  getUsers,
  getUserById,
  deleteUserById,
};
