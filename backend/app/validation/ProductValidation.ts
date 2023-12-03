import Joi from "joi";

const createProduct = Joi.object({
    store_id: Joi.number().required(),
    name: Joi.string().required(),
    miniDescription: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    files: Joi.array().items(),
})

const updateProduct = Joi.object({
    store_id: Joi.number(),
    name: Joi.string(),
    miniDescription: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    stock: Joi.number(),
    files: Joi.array().items(),
})

export default {
    createProduct,
    updateProduct
}