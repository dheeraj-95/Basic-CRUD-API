const bcrypt = require('bcrypt');
require('dotenv').config({ path: '../.env' })

/* Generate Hash using salt */ 
const generateHash = (plainTextPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(plainTextPassword, process.env.salt)
            .then(hash => {
                resolve(hash);
            })
            .catch(err => reject(err))
    });
};

/* Validate hash */ 
const validateHash = (plainTextPassword, passwordHash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainTextPassword, passwordHash)
            .then(result => resolve(result))
            .catch(err => reject(err))
    });
};

module.exports = { generateHash, validateHash };