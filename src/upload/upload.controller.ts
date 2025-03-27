import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { Express } from 'express'
import { APP_PORT } from "src/config/constants.config";
import { BaseResponse } from "src/shared/dto/response/base-response.dto";
import { UploadService } from "./upload.service";

@Controller('upload')
export class UploadController {
    constructor(private configService: ConfigService,
        private uploadService: UploadService
    ) { }

    @Post('uploadImage')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadImage(@UploadedFiles(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: 3000000 }),
            new FileTypeValidator({ fileType: 'image/png' })
        ]
    })) files: any): Promise<BaseResponse<any>> {
        console.log(files);
        const fileUrls = this.uploadService.uploadImage(files);
        return {
            message: 'Successfully uploaded image',
            data: fileUrls
        }
    }
}