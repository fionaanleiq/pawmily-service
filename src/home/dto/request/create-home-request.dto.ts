import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class CreateHomeRequestDto {
    @ValidateIf(o => o.mainContentTitle)
    @IsString()
    @IsNotEmpty()
    @AutoMap()
    mainContentTitle: string;

    @ValidateIf(o => o.mainContentDescription)
    @IsString()
    @IsNotEmpty()
    @AutoMap()
    mainContentDescription: string;

    @ValidateIf(o => o.mainContentUrl)
    @IsString()
    @IsNotEmpty()
    @AutoMap()
    mainContentUrl?: string;

    @ValidateIf(o => o.subContentTitle)
    @IsString()
    @IsNotEmpty()
    @AutoMap()
    subContentTitle: string;

    @ValidateIf(o => o.subContentDescription)
    @IsString()
    @IsNotEmpty()
    @AutoMap()
    subContentDescription: string;

    @ValidateIf(o => o.subContentUrl)
    @IsString()
    @IsNotEmpty()
    @AutoMap()
    subContentUrl?: string;
}