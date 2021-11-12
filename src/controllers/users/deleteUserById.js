const { User } = require('../../models');

const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteUser = await User.deleteUser(Number(id));
    res.json(deleteUser);
  } catch (error) {
    next(error);
  }
};

module.exports = deleteUserById;
