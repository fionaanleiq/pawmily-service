import { configValidationObject } from "./validation.config";

export const configOptions = {
    isGlobal: true,
    envFilePath: `./.env.${process.env.NODE_ENV}`,
    validationSchema: configValidationObject
};