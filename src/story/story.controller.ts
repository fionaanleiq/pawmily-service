import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseFilePipeBuilder, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { GetStoryResponseDto } from "./dto/response/get-story-response.dto";
import { StoryService } from "./story.service";
import { parseId } from "src/shared/utils/shared.utils";
import { CreateStoryRequestDto } from "./dto/request/create-story-request.dto";
import { EditStoryRequestDto } from "./dto/request/edit-story-request.dto";
import { BaseResponse } from "src/shared/dto/response/base-response.dto";
import { DeleteResult } from "mongoose";
import { Roles } from "src/shared/decorators/roles.decorator";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { RolesGuard } from "src/shared/guards/roles.guard";
import { ROLE_TYPE } from "src/user/user.schema";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller('story')
@UseGuards(JwtGuard, RolesGuard)
@Roles(ROLE_TYPE.ADMIN)
export class StoryController {
    constructor(private readonly storyService: StoryService) { }

    @Roles(ROLE_TYPE.USER)
    @Get('view')
    async getAllStories(): Promise<BaseResponse<GetStoryResponseDto[]>> {
        const stories = await this.storyService.getAllStories();
        return {
            message: stories.length ? 'Fetched All Stories' : 'No Stories Available',
            count: stories.length,
            data: stories
        }
    }

    @Roles(ROLE_TYPE.USER)
    @Get('view/:id')
    async getOneStory(@Param('id') id: string): Promise<BaseResponse<GetStoryResponseDto>> {
        const story = await this.storyService.getOneStory(id);
        return {
            message: 'Fetched Story',
            data: story
        }
    }

    @Post('create')
    @UseInterceptors(FilesInterceptor('files'))
    async createStory(@Body() createStoryRequestDto: CreateStoryRequestDto,
        @UploadedFiles(new ParseFilePipeBuilder()
            // .addFileTypeValidator({
            //     fileType: 'png',
            // })
            // .addMaxSizeValidator({
            //     maxSize: 30000
            // })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                fileIsRequired: false,
            }),
        ) files?: Array<Express.Multer.File>
    ): Promise<BaseResponse<CreateStoryRequestDto>> {
        console.log(files)
        const createdStory = await this.storyService.createStory(createStoryRequestDto, files);
        return {
            message: 'Created Story',
            data: createdStory
        }
    }

    @Patch('edit/:id')
    @UseInterceptors(FilesInterceptor('files'))
    async editStory(@Param('id') id: string, @Body() editStoryRequestDto: EditStoryRequestDto,
        @UploadedFiles(new ParseFilePipeBuilder()
            // .addFileTypeValidator({
            //     fileType: 'png',
            // })
            // .addMaxSizeValidator({
            //     maxSize: 30000
            // })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                fileIsRequired: false,
            }),
        ) files?: Array<Express.Multer.File>
    ): Promise<BaseResponse<GetStoryResponseDto>> {
        const editedStory = await this.storyService.editStory(id, editStoryRequestDto);
        return {
            message: 'Edited Story',
            data: editedStory
        }
    }

    @Delete('delete/:id')
    async deleteOneStory(@Param('id') id: string): Promise<BaseResponse<GetStoryResponseDto>> {
        const deletedStory = await this.storyService.deleteOneStory(id);
        return {
            message: 'Deleted Story',
            data: deletedStory
        }
    }

    @Delete('delete')
    async deleteStories(): Promise<BaseResponse<DeleteResult>> {
        const deletedStories = await this.storyService.deleteStories();
        return {
            message: 'Deleted All Stories',
            data: deletedStories
        }
    }
}