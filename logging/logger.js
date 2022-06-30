const winston = require('winston'); // Winston Logger for logging

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'crud.log' })
    ]
  });

module.exports = logger;