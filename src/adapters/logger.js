const winston = require('winston');

const logger = winston.createLogger({
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, stack }) => {
          const text = `${level.toUpperCase()} - ${timestamp} - ${message}`;
          return stack ? text + '\n' + stack : text;
        })
      )
    })
  ]
});

logger.errorCatch = function (error) {  
  let errorMessage = error;
  if (error.stack) {
    const splitStack = error.stack.split('\n');
    const cleanStack = splitStack[0] + splitStack[1];
    errorMessage = `${error.message} - ${cleanStack}`;    
  }

  logger.error(errorMessage);
};

module.exports = logger;
