const createHttpError = require('http-errors');
const { User } = require('../../models');

const updateUser = async (req, res, next) => {
  try {
    const { username, gender, phone } = req.body;

    const { _id } = req.user;

    const checkUser = await User.findUserById(_id);

    // Check User
    if (checkUser === null) {
      return next(createHttpError.BadRequest('User not found!'));
    }

    const payloadUpdate = {
      id: _id,
      username,
      gender,
      phone,
    };

    const updatedUser = new User(payloadUpdate);

    const user = await updatedUser.updateUser();

    res.json({
      message: 'Successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateUser;
