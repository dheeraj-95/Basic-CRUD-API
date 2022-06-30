const Joi = require('joi'); // It is an object schema description language and object validator.

const employerSchema = Joi.object({
    employerId : Joi.number().min(4).required(),

    employerName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    employerEmail: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
        .required(),
    
    contactNumber : Joi.number().min(10).required(),

    employees : Joi.array().unique('employeeName', { ignoreUndefined: true })
});

module.exports = { employerSchema };