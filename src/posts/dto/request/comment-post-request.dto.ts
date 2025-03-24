import { IsArray, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class CommentPostRequestDto {
    @IsString()
    @IsNotEmpty()
    content: string;

    @ValidateIf(o => o.likes)
    @IsArray()
    likes?: string[] | undefined;

    @ValidateIf(o => o.commentedBy)
    @IsString()
    @IsNotEmpty()
    commentedBy?: string;
}