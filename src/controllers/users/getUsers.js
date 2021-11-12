const { User } = require('../../models');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.findUsers();

    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = getUsers;
