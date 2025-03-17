import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class AddUserRequestDto {

    // @ValidateIf(o => o.fullName)
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'Jane Doe', description: "This is the user's fullname."})
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example: 'janedoe@example.com', description: "This is the user's email address."})
    emailAddress: string;
    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example: 'eme', description: "This is the user's password."})
    password: string;
}