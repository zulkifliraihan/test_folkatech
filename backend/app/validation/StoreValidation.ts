import Joi from "joi";

const createStore = Joi.object({
    name: Joi.string().required(),
    description: Joi.string()
})

const updateStore = Joi.object({
    name: Joi.string(),
    description: Joi.string()
})

export default {
    createStore,
    updateStore
}