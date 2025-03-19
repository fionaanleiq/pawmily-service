import { Body, Controller, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { LocalGuard } from "./guards/local.guard";
import { AuthService } from "./auth.service";
import { AuthLoginResponseDto } from "./dto/response/auth-login-response.dto";
import { AuthSignupRequestDto } from "./dto/request/auth-signup-request.dto";
import { AuthChangePasswordRequestDto } from "./dto/request/auth-change-password-request.dto";
import { BaseResponse } from "src/shared/dto/response/base-response.dto";

@Controller('auth')
export class AuthController {
    constructor (
        private readonly authService: AuthService
    ) {}

    @Post('login')
    @UseGuards(LocalGuard)
    async login (@Req() req) : Promise<AuthLoginResponseDto> {
        return req.user;
    } 

    @Post('signup')
    async signup(@Body() authSignupRequestDto: AuthSignupRequestDto) : Promise<AuthLoginResponseDto> {
        return await this.authService.signup(authSignupRequestDto);
    }

    @Patch('change-password')
    async changePassword (@Body() authChangePasswordRequestDto: AuthChangePasswordRequestDto) : Promise<BaseResponse<any>> {
        const updatedUser = await this.authService.changePassword(authChangePasswordRequestDto);
        return {
            message: 'Successfully changed password',
            data: updatedUser
        }
    }
}