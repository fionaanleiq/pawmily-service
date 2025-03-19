import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt"
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport"
import { ACCESS_EXPIRE_IN, ACCESS_SECRET_KEY } from "src/config/constants.config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import jwtConfig from "./config/jwt.config";
import refreshJwtConfig from "./config/refresh-jwt.config";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
    imports: [
        ConfigModule.forFeature(jwtConfig),
        ConfigModule.forFeature(refreshJwtConfig),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    signOptions: { expiresIn: configService.get<string>(ACCESS_EXPIRE_IN) },
                    secret: configService.get<string>(ACCESS_SECRET_KEY)
                };
            },
            inject: [ConfigService],
            global: true,
        }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: []
})
export class AuthModule {}