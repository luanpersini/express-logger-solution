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
  traceId: ":traceId",    
  url: ":method - :url",  
  status: ":status", 
  userAgent: ":user-agent", 
  remoteAddr: ":remote-addr", 
  remoteUser: ":remote-user", 
  referrer: ":referrer",  
  responseTime: ":response-time[0] ms",
  body: ":body"  
}); 

module.exports = morgan(morganStack, { stream: myStream, skip: (req, res) => { return req.url === "/favicon.ico"} });
