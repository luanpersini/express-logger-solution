const logger = require("../adapters/logger");
// require('express-async-errors');


module.exports = () => {    
   //We will not exit the process till: 1 - fix the existing exceptions in codebase, 2 - test the behavior of the server on azure to see if it restarts automatically
  // process.on("uncaughtException", (ex) => {
  //   logger.errorCatch(ex);
  //   //  process.exit(1); // 0 = success, 1 = uncaught exception 
  // });

  process.on("unhandledRejection", (ex) => {
    logger.error("UnhandledPromiseRejection: ", ex);
    //  process.exit(1); // 0 = success, 1 = uncaught exception
  });
};
