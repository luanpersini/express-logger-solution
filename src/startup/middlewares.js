
const express = require('express');
const requestLoggerMiddleware = require('../middlewares/http-logger-interceptor');
const traceIdMiddleware =  require('../middlewares/TraceIdMiddleware');

module.exports = function(app) {
  app.use(express.json());
  app.use(traceIdMiddleware);
  app.use(requestLoggerMiddleware);
}