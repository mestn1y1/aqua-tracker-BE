import Joi from 'joi';

export const setWaterDaylyNormShema = Joi.object({
  curDaylyNorm: Joi.number().min(1).max(15000).default(1500).messages({
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
  amount: Joi.number()
    .min(1)
    .max(5000) // Максимальна кількість води - 5000 мл
    // .required() // Тому що коли робиться запис про випиту воду, к-сть випитої води має бути обов'язково вказана
    .messages({
      'number.base': 'The amount must be a number.',
      'number.min': 'The amount must be at least 1 ml.',
      'number.max': 'The amount cannot exceed 5000 ml.',
      //   'any.required': 'The amount is required.',
    }),
  curDaylyNorm: Joi.number().min(1).max(15000).default(1500).messages({
    'number.base': 'The daily norm must be a number.',
    'number.min': 'The daily norm must be at least 1 ml.',
    'number.max': 'The daily norm cannot exceed 15000 ml.',
  }),
  servings: Joi.number().integer().min(0).messages({
    'number.base': 'The number of servings must be a number.',
    'number.integer': 'The number of servings must be an integer.',
    'number.min': 'The number of servings must be at least 0.',
  }),
});

export const addWaterSchema = Joi.object({
  date: Joi.date().required(),
  amount: Joi.number().required(),
  servings: Joi.number(),
});

export default waterValidationSchema;
