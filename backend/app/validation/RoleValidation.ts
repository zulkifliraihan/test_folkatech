import Joi from "joi";

const createRole = Joi.object({
    name: Joi.string().required()
})

const updateRole = Joi.object({
    name: Joi.string()
})

export default {
    createRole,
    updateRole
}
