const { User } = require('../../models');

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findUserById(Number(id));

    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = getUserById;
