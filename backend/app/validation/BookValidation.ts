import Joi from "joi";

const createBook = Joi.object({
    name: Joi.string().required(),
    statusrent_id: Joi.number().required()
})

const updateBook = Joi.object({
    name: Joi.string(),
    statusrent_id: Joi.number()
})

export default {
    createBook,
    updateBook
}
