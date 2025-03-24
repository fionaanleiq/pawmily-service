import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsIn, IsNotEmpty, IsString, ValidateIf } from "class-validator";
import { toProperCase } from "src/shared/utils/shared.utils";
import { ROLE_TYPE, roleList, STATUS_TYPE, statusList } from "src/user/user.schema";
import { AutoMap } from "@automapper/classes";



export class AddUserRequestDto {

    @IsString()
    @IsNotEmpty()
    @Transform(({value}) => toProperCase(value))
    @ApiProperty({example: 'Jane Doe', description: "This is the user's fullname."})
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example: 'janedoe@example.com', description: "This is the user's email address."})
    @AutoMap()
    emailAddress: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'eme', description: "This is the user's password."})
    password: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({value}) => value.toUpperCase())
    @IsIn(roleList)
    @ApiProperty({example: ROLE_TYPE.ADMIN, description: "This is the user's role"})
    role: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({value}) => value.toUpperCase())
    @IsIn(statusList)
    @ApiProperty({example: STATUS_TYPE.ACTIVE, description: "This is the user's status"})
    status: string;

    @ValidateIf(o => o.following)
    @IsString()
    @IsNotEmpty()
    following?: string;

    @ValidateIf(o => o.follower)
    @IsString()
    @IsNotEmpty()
    follower?: string;
}