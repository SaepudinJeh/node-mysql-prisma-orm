const { User } = require('../../models');

const updateBio = async (req, res, next) => {
  try {
    const { idUser } = req.params;

    const payloadBio = req.body.bio;

    const payload = {
      id: idUser,
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
