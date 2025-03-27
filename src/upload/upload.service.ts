import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { APP_PORT } from "src/config/constants.config";
import { UploadFilesRequestDto } from "./dto/response/upload-files-request.dto";

@Injectable()
export class UploadService {
    constructor(private configService: ConfigService) { }

    uploadImage(files: any): any {
        console.log(files)
        return `http://localhost:${this.configService.get<string>(APP_PORT)}/uploads/${files.filename}`
        // typeof files === 'object' 
        // ? (Object.keys(files)).map((key) => {
        //     return { [key]: `http://localhost:${this.configService.get<string>(APP_PORT)}/uploads/${files[key][0].filename}` }
        // })
        // : 
    }
}

// UploadFilesRequestDto<typeof files>[]