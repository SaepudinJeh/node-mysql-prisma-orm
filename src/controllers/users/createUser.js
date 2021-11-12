/* eslint-disable consistent-return */
const createError = require('http-errors');
const { User } = require('../../models');

const createUser = async (req, res, next) => {
  if (req.body === null) {
    return next(createError.NotFound());
  }

  const {
    name, email, bio, id,
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

  await user.save().then((result) => {
    res.json(result);
  }).catch((error) => {
    next(error);
  });
};

module.exports = createUser;
