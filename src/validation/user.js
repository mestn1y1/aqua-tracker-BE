import Joi from 'joi';
import { emailRegexp } from '../constants/users.js';
export const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const userInfoUpdatedSchema = Joi.object({
  name: Joi.string().max(32),
  email: Joi.string().pattern(emailRegexp).messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email must not be empty.',
    'string.pattern.base': "Email must be in the format 'example@example.com'.",
  }),
  outdatedPassword: Joi.string().min(8).max(64),
  newPassword: Joi.string().min(8).max(64),
  gender: Joi.string().valid('male', 'female').messages({
    'any.only': "Gender must be either 'male' or 'female'.",
  }),
  daylyNorm: Joi.number().min(500).max(15000),
});

export const userRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).email().required().messages({
    'string.pattern.base': 'Email format is invalid',
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().min(8).max(64).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'string.max': 'Password can be up to 64 characters',
    'string.empty': 'Password is required',
  }),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required',
  }),

  password: Joi.string().min(8).max(64).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'string.max': 'Password can be up to 64 characters',
    'string.empty': 'Password is required',
  }),
});
