import Joi from "joi";

const updateProfile = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
})

const rentBook = Joi.object({
    book_id: Joi.number().required(),
    statusrent_id: Joi.number().required()
})

export default {
    updateProfile,
    rentBook
}
