import { BadRequestException, ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { AuthLoginRequestDto } from "./dto/request/auth-login-request.dto";
import { ConfigService, ConfigType } from "@nestjs/config";
import jwtConfig from "./config/jwt.config";
import refreshJwtConfig from "./config/refresh-jwt.config";
import { UserService } from "src/user/user.service";
import { ROLE_TYPE, STATUS_TYPE, User, UserDocument } from "src/user/user.schema";
import { UserRepository } from "src/user/user.repository";
import { AuthSignupRequestDto } from "./dto/request/auth-signup-request.dto";
import { hash } from "bcrypt";
import { AuthChangePasswordRequestDto } from "./dto/request/auth-change-password-request.dto";
import { AuthLoginResponseDto } from "./dto/response/auth-login-response.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly userRepository: UserRepository,
        @Inject(jwtConfig.KEY) private readonly jwtTokenConfig: ConfigType<typeof jwtConfig>,
        @Inject(refreshJwtConfig.KEY) private readonly refreshTokenConfig: ConfigType<typeof refreshJwtConfig>
    ) { }

    generateTokens (user: UserDocument): AuthLoginResponseDto {
        const userObject = {
            emailAddress: user.emailAddress,
            role: user.role,
            status: user.status,
            id: user._id
        }
        const accessToken = this.jwtService.sign(userObject, this.jwtTokenConfig);
        const refreshToken = this.jwtService.sign(userObject, this.refreshTokenConfig)
        return { accessToken, refreshToken };
    }

    async validateUser(authLoginRequestDto: AuthLoginRequestDto): Promise<any> {
        // Get user password from database
        const user = await this.userService.getUserByEmail(authLoginRequestDto.emailAddress);
        if (user && await compare(authLoginRequestDto.password, user.password)) {
            return this.generateTokens(user);
        }
        return null;
    }

    async signup(authSignupRequestDto: AuthSignupRequestDto) {
        const user = await this.userService.getUserByEmail(authSignupRequestDto.emailAddress);
        if (user) throw new ConflictException('Email address already exists');
        authSignupRequestDto.password = await hash(authSignupRequestDto.password, 10);
        const addedUser = await this.userRepository.addUser({ ...authSignupRequestDto, status: STATUS_TYPE.ACTIVE, role: ROLE_TYPE.USER });
        if (!addedUser) throw new InternalServerErrorException('Failed to add user');
        return this.generateTokens(addedUser);
    }

    async changePassword(authChangePasswordRequestDto: AuthChangePasswordRequestDto) {
        const { emailAddress, password, newPassword } = authChangePasswordRequestDto;
        const user = await this.userService.getUserByEmail(emailAddress);
        if (!user) throw new NotFoundException('User Not Found');
        if (await compare(password, user.password)) {
            const hashedPassword = await hash(newPassword, 10)
            return await this.userService.updateUser(String(user._id), {password: hashedPassword})
        } else throw new UnauthorizedException('Incorrect password')
    }
}