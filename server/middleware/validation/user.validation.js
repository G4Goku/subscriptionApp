const Joi = require('joi');
const constants =require('../../utils/constants')

const authValidation = {
    register: (req, res, next) => {
        const userRegisterSchema = Joi.object({
            userName: Joi.string()
                .min(2)
                .max(20)
                .required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        });
        const { error } = userRegisterSchema.validate(req.body);
        validationError(error,res,next)
    },
    login: (req, res, next) => {
        const userLoginSchema = Joi.object({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required()
        });
        const { error } = userLoginSchema.validate(req.body);
        validationError(error,res,next)
    }
};

const validationError = (error,res,next)=>{
    if (error) return res.status(400).json({ error: error.details[0].message, message: constants.BAD_REQUEST });
        next();
}

module.exports = authValidation;
