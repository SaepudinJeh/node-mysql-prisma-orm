/* eslint-disable consistent-return */
const createError = require('http-errors');
const ObjectId = require('bson-objectid');
const { User } = require('../../models');
const { newUserValidate } = require('../../validators');

const createUser = async (req, res, next) => {
  try {
    const { id, username, email } = req.body;

    const checkId = ObjectId.isValid(id);

    // Check bson id
    if (!checkId) {
      return next(createError.BadGateway('Invalid ID!'));
    }

    const payload = newUserValidate.validate({
      id,
      email,
      username,
    });

    // Check Validator value
    if (payload.error) {
      return next(createError.BadRequest(payload.error.message));
    }

    const user = new User(payload.value);

    const newUser = await user.save();

    res.json({
      message: 'successfully',
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
