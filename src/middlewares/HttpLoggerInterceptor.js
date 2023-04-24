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

const morganStack = JSON.stringify({
  url: ':method - :url',
  status: ':status',
  traceId: ':traceId',
  userAgent: ':user-agent',
  remoteAddr: ':remote-addr',
  remoteUser: ':remote-user',
  referrer: ':referrer',
  responseTime: ':response-time[0] ms',
  body: ':body'
});

const httpLoggerInterceptor = morgan(morganStack, {
  stream: myStream,
  skip: function (req, res) {
    req.url === '/favicon.ico';
  }
});

module.exports = { httpLoggerInterceptor };
