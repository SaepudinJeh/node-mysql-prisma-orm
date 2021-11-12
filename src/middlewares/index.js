const morgan = require('morgan');
const compression = require('compression');
const cors = require('cors');
const express = require('express');

module.exports = {
  middlewares: (app) => {
    app.use(compression()),
    app.use(cors()),
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json()),
    app.use(morgan('dev'))
  }
}