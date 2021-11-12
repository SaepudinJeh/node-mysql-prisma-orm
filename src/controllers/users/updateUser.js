const { User } = require('../../models');

const updateUser = async (req, res, next) => {
  try {
    const {
      id, name, email, bio,
    } = req.body;

    const payload = {
      id,
      name,
      email,
      profile: {
        create: { bio },
      },
    };

    const user = new User(payload);

    await user.updateUser().then((result) => {
      res.json(result);
    }).catch((error) => {
      next(error);
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateUser;
