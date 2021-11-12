const express = require('express');
const createError = require('http-errors');

const router = require('./routes');
const { middlewares } = require('./middlewares');

const app = express();

middlewares(app);
router(app);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((error, req, res, next) => {
  res.statusCode = error.statusCode;

  res.json({
    message: error.message,
    statusCode: error.statusCode,
  });
});

app.listen(3300, () => {
  console.log('🚀 Server ready at: port 3300 ...');
});
