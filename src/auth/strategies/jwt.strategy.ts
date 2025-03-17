import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ACCESS_SECRET_KEY } from "src/config/constants.config";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
 constructor (configService: ConfigService) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: String(configService.get<string>(ACCESS_SECRET_KEY)),
    })
 }   

 validate(payload: any) {
    console.log("Inside jwt strategy")
    return payload;
 }
}