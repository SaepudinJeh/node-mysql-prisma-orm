const router = require('express').Router();
const {
  userUpdate, getUsers, getUserById, createUser, deleteUserById, updateBio,
} = require('../controllers');

router
  .get('/users', getUsers)
  .get('/user/:id', getUserById)
  .post('/user', createUser)
  .delete('/user/:id', deleteUserById)
  .patch('/user/:id', userUpdate)
  .patch('/bio/:idUser', updateBio);

module.exports = router;
