import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Story } from "./story.schema";
import mongoose, { Model } from "mongoose";
import { CreateStoryRequestDto } from "./dto/request/create-story-request.dto";
import { EditStoryRequestDto } from "./dto/request/edit-story-request.dto";

@Injectable()
export class StoryRepository {
    constructor(@InjectModel(Story.name) private storyModel : Model<Story>) {}

    async getAllStories () {
        return await this.storyModel.find().sort({'createdAt': -1});
    }

    async getOneStory(id: mongoose.Types.ObjectId) {
        return await this.storyModel.findById(id);
    }

    async createStory(createStoryRequestDto :CreateStoryRequestDto) {
        return await this.storyModel.create(createStoryRequestDto);
    }

    async editStory(id: mongoose.Types.ObjectId, editStoryRequestDto: EditStoryRequestDto) {
        return await this.storyModel.findByIdAndUpdate(id, editStoryRequestDto, { new: true, runValidators: true});
    }

    async deleteOneStory(id: mongoose.Types.ObjectId) {
        return await this.storyModel.findByIdAndDelete(id);
    }

    async deleteStories() {
        return await this.storyModel.deleteMany();
    }
}