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

//TODO - try to refactor to a function. Function style didint work to pass the status as param. 
const morganStackServerError = JSON.stringify({
  url: ':method - :url',
  status: '500',
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
  skip: (req, res) => {
    return req.url === '/favicon.ico' || req.status === 500;
  }
});

const httpLoggerForServerErrorInterceptor = morgan(morganStackServerError, {
  stream: myStream,
  immediate: true,
  skip: (req, res) => {
    return req.url === '/favicon.ico' || req.status < 499;
  }
});

module.exports = { httpLoggerInterceptor, httpLoggerForServerErrorInterceptor };
