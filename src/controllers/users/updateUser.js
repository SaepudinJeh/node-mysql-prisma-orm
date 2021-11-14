const { User } = require('../../models');

const updateUser = async (req, res, next) => {
  try {
    const {
      name, email, bio, gender, phone,
    } = req.body;

    const { id } = req.params;

    const payload = {
      id,
      name,
      email,
      gender,
      phone,
      profile: {
        create: { bio },
      },
    };

    const user = new User(payload);

    const checkUser = await User.findUserById(id);

    if (checkUser === null) {
      const createNewUser = await user.save();

      res.json({
        createNewUser,
      });
    }

    const upUser = await user.updateUser();

    res.json(upUser);
  } catch (error) {
    next(error);
  }
};

module.exports = updateUser;
