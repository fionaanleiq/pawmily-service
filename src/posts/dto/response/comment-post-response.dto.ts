import mongoose from "mongoose";
import { CommentPostRequestDto } from "../request/comment-post-request.dto";
import { AutoMap } from "@automapper/classes";

export class CommentPostResponseDto extends CommentPostRequestDto {
    @AutoMap()
    id: mongoose.Types.ObjectId;
    @AutoMap()
    likes?: string[] | undefined;
    @AutoMap()
    createdAt: Date;
}