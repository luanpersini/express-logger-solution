
const test = require('../routes/test');
const errorMiddleware = require('../middlewares/ErrorMiddleware');


module.exports = function(app) {  
  app.use('/test', test);  
  app.use(errorMiddleware); //error must be the last middleware  
}