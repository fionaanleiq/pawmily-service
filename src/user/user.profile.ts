import { createMap, forMember, mapFrom, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { UserResponseDto } from "./dto/response/add-user-response.dto";
import { User } from "./user.schema";

@Injectable()
export class UserProfile extends AutomapperProfile {
    constructor (
        @InjectMapper() mapper: Mapper
    ) {
        super(mapper);
    }

    override get profile () {
        return (mapper) => {
            createMap(mapper, User, UserResponseDto, 
                forMember(
                    (dest) => dest.fullName,
                mapFrom(
                    (src) => src.fullName
                )
                )
            )
        }
    }
}