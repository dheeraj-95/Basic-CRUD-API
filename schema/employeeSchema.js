const Joi = require('joi'); // It is an object schema description language and object validator.

const employeeSchema = Joi.object({
    employeeId : Joi.number().min(4).required(),

    employeeName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    qualification : Joi.string()
        .alphanum()
        .required(),

    employeeEmail: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
        .required(),

    contactNumber : Joi.number().min(10).required(),

    isEmployerAssigned : Joi.boolean(),

    oldEmployerName : Joi.string().alphanum().min(3).max(30),

    newEmployerName : Joi.string().alphanum().min(3).max(30),

    employerName : Joi.string(),
});

module.exports = { employeeSchema };