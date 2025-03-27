import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";
import { AboutUsSection, Statistics } from "src/about-us/about-us.schema";
import { ImageList } from "src/story/story.schema";

export class CreateAboutUsRequestDto {
    @IsArray()
    @ArrayNotEmpty()
    @Type(() => AboutUsSection)
    section: AboutUsSection[];

    @IsArray()
    @ArrayNotEmpty()
    @Type(() => Statistics)
    statistics: Statistics[];

    @IsArray()
    @ArrayNotEmpty()
    @Type(() => ImageList)
    images?: ImageList[];

    @IsString()
    @IsNotEmpty()
    mission: string;

    @IsString()
    @IsNotEmpty()
    vision: string;
}