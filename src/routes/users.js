const router = require('express').Router();
const {
  userUpdate, getUsers, getUserById, createUser, deleteUserById, updateBio,
} = require('../controllers');

const { verifyAccessToken } = require('../middlewares');

router
  .get('/users', getUsers)
  .get('/user/:id', getUserById)
  .post('/user', verifyAccessToken, createUser)
  .delete('/user/:id', deleteUserById)
  .patch('/user', verifyAccessToken, userUpdate)
  .patch('/bio', verifyAccessToken, updateBio);

module.exports = router;
