import { AutoMap } from "@automapper/classes";
import mongoose from "mongoose";
import { ImageList } from "src/story/story.schema";

export class GetStoryResponseDto {
    @AutoMap()
    id: mongoose.Types.ObjectId;

    @AutoMap()
    title: string;

    @AutoMap()
    shortDescription: string;

    @AutoMap()
    images: ImageList[];
}