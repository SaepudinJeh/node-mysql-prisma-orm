const router = require('express').Router();
const {
  userUpdate, getUsers, getUserById, deleteUserById, updateBio,
} = require('../controllers');

const { verifyAccessToken } = require('../middlewares');

router
  .get('/users', getUsers)
  .get('/user/:id', getUserById)
  .delete('/user/:id', deleteUserById)
  .patch('/user', verifyAccessToken, userUpdate)
  .patch('/bio', verifyAccessToken, updateBio);

module.exports = router;
