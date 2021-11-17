/* eslint-disable no-unused-expressions */
const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const createError = require('http-errors');
// Dependencies JWKS
const expressJwt = require('express-jwt');
const jwksClient = require('jwks-rsa');

const verifyAccessToken = require('./verifyAccessToken');

module.exports = {
  middlewares: (app) => {
    app.use(compression());
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(morgan('dev'));

    // First Check Authenticated
    app.use(
      expressJwt({
        secret: jwksClient.expressJwtSecret({
          jwksUri: 'https://api.ulin-app.xyz/auth/.well-known/jwks.json',
          cache: true,
          rateLimit: true,
        }),
        algorithms: ['RS256'],
        credentialsRequired: true,
      }),
    );

    // Handling Error Authenticated
    app.use((err, req, res, next) => {
      if (err.name === 'UnauthorizedError') {
        res.status(err.status).send({ message: err.message });
        return createError.Unauthorized();
      }
      next();
    });
  },
  verifyAccessToken,
};
