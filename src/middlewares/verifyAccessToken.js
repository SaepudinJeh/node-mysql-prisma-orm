const createError = require('http-errors');
const jwtDecode = require('jwt-decode');

const verifyAccessToken = async (req, res, next) => {
  try {
    if (!req.get('Authorization')) {
      next(createError.Unauthorized());
    }

    const getToken = await req.get('Authorization').split(' ')[1];
    const decode = jwtDecode(getToken, { Headers: true });

    req.user = { _id: decode._id, email: decode.email };

    next();
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      res.status(error.status).send({ message: error.message });
      return;
    }
    next();
  }
};

module.exports = verifyAccessToken;
