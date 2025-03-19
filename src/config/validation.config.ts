import * as Joi from 'joi';

export const configValidationObject = Joi.object({
    NODE_ENV: Joi.string(),
    APP_PORT: Joi.number().port().default(2000),
    CONTAINER_PORT: Joi.number().port().default(1000),
    ACCESS_SECRET_KEY: Joi.string().required(),
    DATABASE_USERNAME: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required()
});