import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { Post, PostDocument } from "./post.schema";
import { GetPostsResponseDto } from "./dto/response/get-posts-response.dto";

@Injectable()
export class PostProfile extends AutomapperProfile {
    constructor(
        @InjectMapper() mapper: Mapper
    ) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Post, GetPostsResponseDto,
                forMember(
                    (dest) => dest.id,
                    mapFrom(
                        (src) => src._id
                    )
                ),
                forMember(
                    (dest) => dest.description,
                    mapFrom(
                        (src) => src.description
                    )
                ),
                forMember(
                    (dest) => dest.likes,
                    mapFrom(
                        (src) => src.likes
                    )
                ),
                // forMember(
                //     (dest) => dest.comments,
                //     mapFrom(
                //         (src) => src.comments
                //     )
                // ),
                forMember(
                    (dest) => dest.createdAt,
                    mapFrom(
                        (src) => src.createdAt
                    )
                ),
                // forMember(
                //     (dest) => dest.createdBy,
                //     mapFrom(
                //         (src) => src.createdBy
                //     )
                // ),
            )
        }
    }
}