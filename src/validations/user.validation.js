import Joi from "joi"

const userRegisterValidation = Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().required().min(6).max(20),
    role:Joi.string().valid('student', 'owner','newUser'),
    idProof:Joi.string().allow(null, ''),
    verified:Joi.boolean().allow(null, ''),
    avatar:Joi.string().allow(null, '')

})
export {userRegisterValidation}