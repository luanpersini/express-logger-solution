const uuid = require('uuid')

module.exports = (req, res, next) => {
  req.traceId = req.headers.traceId ? req.headers.traceId.toString() : uuid.v4();
  next();
}
