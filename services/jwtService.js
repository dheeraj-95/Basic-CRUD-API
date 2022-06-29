require('dotenv').config({ path: '../.env' })
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

/* Creates a new JWT Token */ 
const createToken = (email) => {
    return jwt.sign({
        exp : Math.floor(Date.now() / 1000) + (30 * 60),
        email
    },secret, 
)};

/* Validate JWT Token */
const validateToken = (token) => {
    try{
        const decoded = jwt.verify(token, secret);
        return decoded;
    }catch(err) {
        console.error(err);
        return false;
    }
}

module.exports = {createToken, validateToken}