import Joi from "joi";

const createUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    birthday_date: Joi.date().required(),
    country_id: Joi.number().required(),
    state_id: Joi.number().required(),
    city_id: Joi.number().required(),
    timezone: Joi.string().required()
})

const updateUser = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(8),
    first_name: Joi.string(),
    last_name: Joi.string(),
    birthday_date: Joi.date(),
    country_id: Joi.number(),
    state_id: Joi.number(),
    city_id: Joi.number(),
    timezone: Joi.string()
})

const updateForPublic = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
})

export default {
    createUser,
    updateUser,
    updateForPublic
}
