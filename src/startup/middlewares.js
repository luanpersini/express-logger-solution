
const express = require('express');
const requestLoggerMiddleware = require('../middlewares/http-logger-interceptor');


module.exports = function(app) {
  app.use(express.json())
  app.use(requestLoggerMiddleware);
}