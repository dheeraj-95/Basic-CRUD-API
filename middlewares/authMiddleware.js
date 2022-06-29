const {validateToken} = require('../services/jwtService')
const logger = require('../logging/logger');

const authMiddleWare = (req, res, next) => {
    if(validateToken(req.cookies.jwt)) { /* Validate JWT Token */
        next();
    } else {
        res.status(401).send("Unauthorized from middleware")
    }
}

const errorMiddleware = (err, req, res, next) => { /* for logging errors */
    if (err) {
        logger.error('Error Occured:', err);
        res.status(500).send("Server failed fetching response");
        next(err) /* forward to next middleware */
    }
  }

module.exports = { authMiddleWare, errorMiddleware };