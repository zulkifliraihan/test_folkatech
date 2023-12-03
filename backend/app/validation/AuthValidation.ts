import Joi from "joi";

const register = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

const authentication = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

export default {
    authentication,
    register,
    login
}
