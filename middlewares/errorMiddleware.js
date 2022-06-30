const logger = require('../logging/logger');

const errorMiddleware = (err, req, res, next) => { /* for logging errors */
    if (err) {
        logger.error('Error Occured:', err);
        res.status(res.statusCode || 500);
        res.json({
            message: err.message,
            stack: err.stack
        });
        next(err) /* forward to next middleware */
    }
  }

module.exports = errorMiddleware;