import { IsNotEmpty, IsString } from "class-validator";
import { AuthLoginRequestDto } from "./auth-login-request.dto";

export class AuthChangePasswordRequestDto extends AuthLoginRequestDto {
    @IsString()
    @IsNotEmpty()
    newPassword: string;
}