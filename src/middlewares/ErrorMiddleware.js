const logger = require('../adapters/logger');

module.exports = function(err, req, res, next){
  logger.errorCatch(err);

  res.status(500).send('Something failed in the server. Please try again or contact the Support team.');  
}