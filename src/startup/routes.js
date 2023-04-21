
const test = require('../routes/test');
const error = require('../middlewares/error');


module.exports = function(app) {  
  app.use('/test', test);  
  app.use(error); //error must be the last middleware  
}