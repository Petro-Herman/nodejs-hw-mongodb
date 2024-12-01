import Joi from "joi";
import { typeList } from "../constants/contacts.js";

export const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string(),
    isFavorite: Joi.boolean(),
    contactType: Joi.string().valid(...typeList),
})
