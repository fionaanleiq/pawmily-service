import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt"
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport"
import { ACCESS_EXPIRE_IN, ACCESS_SECRET_KEY } from "src/config/constants.config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        ConfigModule,
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
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: []
})
export class AuthModule {}