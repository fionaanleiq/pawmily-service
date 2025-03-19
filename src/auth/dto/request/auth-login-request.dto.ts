import { IsNotEmpty, IsString } from "class-validator";

export class AuthLoginRequestDto {
    
    @IsString()
    @IsNotEmpty()
    emailAddress: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}