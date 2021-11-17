const { User } = require('../../models');

const updateUser = async (req, res, next) => {
  try {
    const { newUsername, gender, phone } = req.body;

    const { _id, email, username } = req.user;

    const payloadUpdate = {
      id: _id,
      username: newUsername,
      gender,
      phone,
    };

    const newPayload = {
      id: _id,
      email,
      username,
    };

    const newUser = new User(newPayload);
    const updatedUser = new User(payloadUpdate);

    const checkUser = await User.findUserById(_id);

    if (checkUser === null) {
      const createNewUser = await newUser.save();

      res.json({
        createNewUser,
      });
    }

    const upUser = await updatedUser.updateUser();

    res.json(upUser);
  } catch (error) {
    next(error);
  }
};

module.exports = updateUser;
