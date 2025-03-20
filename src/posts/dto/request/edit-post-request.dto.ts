import { PartialType } from "@nestjs/mapped-types";
import { CreatePostRequestDto } from "./create-post-request.dto";
import { ArrayNotEmpty, IsNotEmpty, ValidateIf } from "class-validator";
import { Comment } from "src/posts/post.schema";
import { CommentPostRequestDto } from "./comment-post-request.dto";

export class EditPostRequestDto extends PartialType(CreatePostRequestDto) {
    @ValidateIf(o => o.likes)
    @IsNotEmpty()
    likedBy?: String;

    @ValidateIf(o => o.comments)
    comment?: CommentPostRequestDto;
}