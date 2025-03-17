import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from "@nestjs/jwt";

import * as dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + `/.env.${process.env.NODE_ENV}` })

const accessSecret = process.env.ACCESS_SECRET_KEY;
const accessExpireIn = process.env.ACCESS_EXPIRE_IN;

export default registerAs(
    'jwt',
    (): JwtSignOptions => ({
        secret: accessSecret,
        expiresIn: accessExpireIn
    })
)