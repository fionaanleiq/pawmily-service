import { registerAs } from "@nestjs/config";
import { JwtSignOptions } from "@nestjs/jwt";

import * as dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + `/.env.${process.env.NODE_ENV}` })

const refreshSecret = process.env.REFRESH_SECRET_KEY;
const refreshExpireIn = process.env.REFRESH_EXPIRE_IN;

export default registerAs(
    'refresh-jwt',
    (): JwtSignOptions => ({
        secret: refreshSecret,
        expiresIn: refreshExpireIn
    })
)