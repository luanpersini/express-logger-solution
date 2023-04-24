const express = require('express');
const { httpLoggerInterceptor } = require('../middlewares/HttpLoggerInterceptor');
const traceIdMiddleware = require('../middlewares/TraceIdMiddleware');

module.exports = function (app) {
  app.use(express.json());
  app.use(traceIdMiddleware);
  app.use(httpLoggerInterceptor);
};
