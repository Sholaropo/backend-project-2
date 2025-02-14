import Joi, { ObjectSchema } from "joi";

export const branchSchema: ObjectSchema = Joi.object({
    id: Joi.string()
        .optional()
        .messages({ "string.empty": "Branch ID cannot be empty" }),
    name: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
    }),
    address: Joi.string().required().messages({
        "any.required": "Address is required",
        "string.empty": "Address cannot be empty",
    }),
    phone: Joi.string().required().messages({
        "any.required": "Phone is required",
        "string.empty": "Phone cannot be empty",
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
});

export const deleteBranchSchema: ObjectSchema = Joi.object({
    id: Joi.string()
        .required()
        .messages({ "string.empty": "Branch ID cannot be empty" }),
});