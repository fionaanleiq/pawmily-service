import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { Comment, Post, PostSchema } from "./post.schema";
import { GetPostsResponseDto } from "./dto/response/get-posts-response.dto";
import { CommentPostResponseDto } from "./dto/response/comment-post-response.dto";

@Injectable()
export class PostProfile extends AutomapperProfile {
    constructor(
        @InjectMapper() mapper: Mapper
    ) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Comment, CommentPostResponseDto,
                forMember(
                    (dest) => dest.id,
                    mapFrom(
                        (src) => src._id
                    )
                ),
                forMember(
                    (dest) => dest.content,
                    mapFrom(
                        (src) => src.content
                    )
                ),
                forMember(
                    (dest) => dest.likes,
                    mapFrom(
                        (src) => src.likes
                    )
                ),
                forMember(
                    (dest) => dest.likes,
                    mapFrom(
                        (src) => src.likes
                    )
                ),
                // forMember(
                //     (dest) => dest ,
                //     mapFrom(
                //         (src) => src.comments
                //     )
                // )
            )
        }
    }
}