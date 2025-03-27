import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { Story } from "./story.schema";
import { GetStoryResponseDto } from "./dto/response/get-story-response.dto";

@Injectable()
export class StoryProfile extends AutomapperProfile {
    constructor(
        @InjectMapper() mapper: Mapper
    ) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Story, GetStoryResponseDto,
                forMember(
                    (dest) => dest.id,
                    mapFrom(
                        (src) => src._id
                    )
                ),
                forMember(
                    (dest) => dest.title,
                    mapFrom(
                        (src) => src.title
                    )
                ),
                forMember(
                    (dest) => dest.shortDescription,
                    mapFrom(
                        (src) => src.shortDescription
                    )
                ),
                forMember(
                    (dest) => dest.images,
                    mapFrom(
                        (src) => src.images
                    )
                )
            )
        }
    }
}
