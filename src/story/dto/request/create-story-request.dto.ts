import { Transform, Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsNotEmpty, IsString, ValidateIf, ValidateNested } from "class-validator";
import { ImageList } from "src/story/story.schema";

export class CreateStoryRequestDto {
    // @ValidateIf(o => o.title)
    @IsString()
    @IsNotEmpty()
    title: string;

    // @ValidateIf(o => o.shortDescription)
    @IsString()
    @IsNotEmpty()
    shortDescription: string;

    // @ValidateIf(o => o.description)
    @IsString()
    @IsNotEmpty()
    description: string;

    @ValidateIf(o => o.images)
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested()
    @Type(() => ImageList)
    images?: ImageList[];

    // @ValidateIf(o => o.isFeatured)
    @IsNotEmpty()
    @Transform(({ value }) => Boolean(value))
    @IsBoolean()
    isFeatured: boolean;
}