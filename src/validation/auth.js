import Joi from "joi";
import { emailRegexp } from "../constants/user.js";

export const authRegisterSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

export const authLoginSchema = Joi.object({
    // username: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

export const requestResetEmailSchema = Joi.object({ //з конспекту
    email: Joi.string().email().required(),
})

