import { BadRequestException, Body, Controller, Delete, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, ParseFilePipeBuilder, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { HomeService } from "./home.service";
import { GetHomeResponseDto } from "./dto/response/get-home-response.dto";
import { CreateHomeRequestDto } from "./dto/request/create-home-request.dto";
import { BaseResponse } from "src/shared/dto/response/base-response.dto";
import { UpdateHomeRequestDto } from "./dto/request/update-home-request.dto";
import { DeleteResult } from "mongoose";
import { FileFieldsInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { UploadService } from "src/upload/upload.service";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { RolesGuard } from "src/shared/guards/roles.guard";
import { ROLE_TYPE } from "src/user/user.schema";
import { Roles } from "src/shared/decorators/roles.decorator";

@Controller('home')
@UseGuards(JwtGuard, RolesGuard)
@Roles(ROLE_TYPE.ADMIN)
export class HomeController {
    constructor(private homeService: HomeService,
        private uploadService: UploadService
    ) { }

    @Roles(ROLE_TYPE.USER)
    @Get('/view')
    async getHome(): Promise<BaseResponse<GetHomeResponseDto[]>> {
        const retrievedHomes = await this.homeService.getHome();
        return {
            message: retrievedHomes.length ? 'Fetched All Home Content' : 'No Home Content Available',
            data: retrievedHomes
        }
    }

    @Roles(ROLE_TYPE.USER)
    @Get('/view/:id')
    async getOneHome(@Param('id') id: string): Promise<BaseResponse<GetHomeResponseDto>> {
        const retrievedHome = await this.homeService.getOneHome(id);
        return {
            message: 'Fetched Home Content',
            data: retrievedHome
        }
    }

    @Post('/create')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'main_img', maxCount: 1 },
        { name: 'sub_img', maxCount: 1 },
    ]))
    async createHome(
        @Body() createHomeRequestDto: CreateHomeRequestDto,
        @UploadedFiles(new ParseFilePipeBuilder()
            // .addFileTypeValidator({
            //     fileType: 'png',
            // })
            // .addMaxSizeValidator({
            //     maxSize: 30000
            // })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            }),
        ) files?: { main_img?: Express.Multer.File, sub_img: Express.Multer.File }): Promise<BaseResponse<GetHomeResponseDto>> {
        const createdHome = await this.homeService.createHome(createHomeRequestDto, files);
        return {
            message: 'Created Home Content',
            data: createdHome
        }
    }

    @Patch('/edit')
    async editHome(@Param('id') id: string, updateHomeRequestDto: UpdateHomeRequestDto): Promise<BaseResponse<GetHomeResponseDto>> {
        const editedHome = await this.homeService.editHome(id, updateHomeRequestDto);
        return {
            message: 'Updated Home Content',
            data: editedHome
        }
    }

    @Delete('delete/:id')
    async deleteOneHome(@Param('id') id: string): Promise<BaseResponse<GetHomeResponseDto>> {
        const deletedHome = await this.homeService.deleteOneHome(id);
        return {
            message: 'Delete Home Content',
            data: deletedHome
        }
    }

    @Delete('delete')
    async deleteHome(): Promise<BaseResponse<DeleteResult>> {
        const deletedHomes = await this.homeService.deleteHome();
        return {
            message: 'Delete All Home Content',
            data: deletedHomes
        }
    }
}