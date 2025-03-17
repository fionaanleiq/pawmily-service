import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { AuthLoginRequestDto } from "./dto/auth-login-request.dto";
import { ConfigService, ConfigType } from "@nestjs/config";
import jwtConfig from "./config/jwt.config";
import refreshJwtConfig from "./config/refresh-jwt.config";

@Injectable()
export class AuthService {
    constructor (
        private readonly jwtService: JwtService,
        @Inject() private readonly jwtTokenConfig: ConfigType<typeof jwtConfig>,
        @Inject() private readonly refreshTokenConfig: ConfigType<typeof refreshJwtConfig>
    ) {}
    async validateUser(authLoginRequestDto: AuthLoginRequestDto): Promise<any> {
        // Get user password from database

        if (await compare(authLoginRequestDto.password, user.password)) {
            const userObject = {
                name: user.fullName,
                role: user.role,
                _id: user._id
            };
            const accessToken = this.jwtService.sign(userObject, this.jwtTokenConfig);
            const refreshToken = this.jwtService.sign(userObject, this.refreshTokenConfig)
            return { accessToken, refreshToken };
        }
        return null;
    }
}