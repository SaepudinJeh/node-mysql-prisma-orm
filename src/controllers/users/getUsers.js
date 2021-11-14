const createError = require('http-errors');

const { User } = require('../../models');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.findUsers();

    if (users.length === 0) {
      next(createError.ServiceUnavailable('No Data!'));
    }

    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = getUsers;
