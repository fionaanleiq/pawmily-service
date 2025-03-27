import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { StoryRepository } from "./story.repository";
import { CreateStoryRequestDto } from "./dto/request/create-story-request.dto";
import { EditStoryRequestDto } from "./dto/request/edit-story-request.dto";
import { parseId } from "src/shared/utils/shared.utils";
import { DeleteResult } from "mongoose";
import { Mapper } from "@automapper/core";
import { GetStoryResponseDto } from "./dto/response/get-story-response.dto";
import { Story } from "./story.schema";
import { InjectMapper } from "@automapper/nestjs";
import { UploadService } from "src/upload/upload.service";

@Injectable()
export class StoryService {
    constructor (private readonly storyRepository: StoryRepository,
        private readonly uploadService: UploadService,
        @InjectMapper() private classMapper: Mapper
    ) {}

    async getAllStories(): Promise<GetStoryResponseDto[]> {
        const stories = await this.storyRepository.getAllStories();
        return stories.map((story) => this.classMapper.map(story, Story, GetStoryResponseDto))
    }

    async getOneStory(id: string): Promise<GetStoryResponseDto> {
        if (!id) throw new BadRequestException('Missing Param ID');
        const story = await this.storyRepository.getOneStory(parseId(id));
        if (!story) throw new NotFoundException('Story Not Found');
        return this.classMapper.map(story, Story, GetStoryResponseDto)
    }

    async createStory(createStoryRequestDto: CreateStoryRequestDto, files? : Array<Express.Multer.File>): Promise<CreateStoryRequestDto> {
        if (files?.length) {
            createStoryRequestDto.images = [];
            files.forEach((f, index) => {
                createStoryRequestDto.images?.push({
                    order: index,
                    url: this.uploadService.uploadImage(files[index])
                })
            })
        }
        console.log(createStoryRequestDto)
        return await this.storyRepository.createStory(createStoryRequestDto);
    }

    async editStory(id: string, editStoryRequestDto: EditStoryRequestDto): Promise<GetStoryResponseDto> {
        if (!id) throw new BadRequestException('Missing Param ID');
        const editedStory = await this.storyRepository.editStory(parseId(id), editStoryRequestDto);
        console.log(editedStory)
        if (!editedStory) throw new InternalServerErrorException('Failed to Update Story');
        return this.classMapper.map(editedStory, Story, GetStoryResponseDto)
    }

    async deleteOneStory(id: string): Promise<GetStoryResponseDto> {
        if (!id) throw new BadRequestException('Missing Param ID');
        const deletedStory = await this.storyRepository.deleteOneStory(parseId(id));
        if (!deletedStory) throw new InternalServerErrorException('Failed to Delete Story');
        return this.classMapper.map(deletedStory, Story, GetStoryResponseDto)
    }

    async deleteStories(): Promise<DeleteResult> {
        return await this.storyRepository.deleteStories();
    }
}