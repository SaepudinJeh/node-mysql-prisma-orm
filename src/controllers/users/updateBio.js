const { User } = require('../../models');

const updateBio = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const payloadBio = req.body.bio;

    const payload = {
      id: _id,
      bio: payloadBio,
    };

    const bio = new User(payload);

    const bioUpdate = await bio.updateBio();

    res.json({
      message: 'successfully',
      bio: bioUpdate,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateBio;
