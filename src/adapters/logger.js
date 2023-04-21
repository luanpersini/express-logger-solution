const winston = require('winston');

const logger = winston.createLogger({
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.json(), winston.format.timestamp(), winston.format.prettyPrint())
    })
  ]
});

logger.errorCatch = function (error) {
  logger.error(error.message, { stack: error });
};

module.exports = logger;
