import Joi from 'joi';

export const setWaterDaylyNormShema = Joi.object({
  curDailyNorm: Joi.number().min(1).max(15000).default(1500).messages({
    'number.base': 'The daily norm must be a number.',
    'number.min': 'The daily norm must be at least 1 ml.',
    'number.max': 'The daily norm cannot exceed 15000 ml.',
  }),
});

const waterValidationSchema = Joi.object({
  date: Joi.date().required().messages({
    'date.base': 'The date must be a valid date.',
    'any.required': 'The date is required.',
  }),
  amount: Joi.number().min(1).max(5000).messages({
    'number.base': 'The amount must be a number.',
    'number.min': 'The amount must be at least 1 ml.',
    'number.max': 'The amount cannot exceed 5000 ml.',
  }),
  curDailyNorm: Joi.number().min(1).max(15000).default(1500).messages({
    'number.base': 'The daily norm must be a number.',
    'number.min': 'The daily norm must be at least 1 ml.',
    'number.max': 'The daily norm cannot exceed 15000 ml.',
  }),
});

export default waterValidationSchema;
