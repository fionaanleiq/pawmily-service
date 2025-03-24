import mongoose from "mongoose";
import { CommentPostResponseDto } from "./comment-post-response.dto";
import { AutoMap } from "@automapper/classes";

export class GetPostsResponseDto {
    @AutoMap()
    id: mongoose.Types.ObjectId;
    @AutoMap()
    description: string;
    @AutoMap()
    likes: string[];
    @AutoMap(() => [CommentPostResponseDto])
    comments: CommentPostResponseDto[];
    @AutoMap()
    createdAt: Date;
    @AutoMap()
    createdBy: string;
}