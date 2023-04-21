const express = require('express');
const test = require('../routes/test');
const error = require('../middlewares/error');


module.exports = function(app) {
  app.use(express.json());
  app.use('/test', test);
  //Must be the last middleware
  app.use(error);
}