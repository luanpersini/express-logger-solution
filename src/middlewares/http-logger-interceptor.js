const morgan = require('morgan');
const logger = require('../adapters/logger');

const myStream = {
  write: (message) => {
    logger.info(message);
  }
};

morgan.token('body', (req) => {
  if (req.body && req.body.password) {
    req.body.password = '[FILTERED]';
  }
  return JSON.stringify(req.body);
});

morgan.token('traceId', (req) => {
  return req.traceId;
});

module.exports = morgan(':traceId :method :url :body', { stream: myStream });
