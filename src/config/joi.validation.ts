import * as Joi from 'joi';

export const joiValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  MYSQL_PORT: Joi.required(),
  MYSQL_USER: Joi.required(),
  MYSQL_DB_NAME: Joi.required(),
  MYSQL_ROOT_PASSWORD: Joi.required(),
  JWT_SECRET: Joi.required(),
});
