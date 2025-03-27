import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { HomeRepository } from "./home.repository";
import { CreateHomeRequestDto } from "./dto/request/create-home-request.dto";
import { UpdateHomeRequestDto } from "./dto/request/update-home-request.dto";
import { parseId } from "src/shared/utils/shared.utils";
import { GetHomeResponseDto } from "./dto/response/get-home-response.dto";
import { DeleteResult } from "mongoose";
import { UploadService } from "src/upload/upload.service";

@Injectable()
export class HomeService {
    constructor(private readonly homeRepository: HomeRepository,
        private readonly uploadService: UploadService
    ) { }

    async getHome(): Promise<GetHomeResponseDto[]> {
        return await this.homeRepository.getHome();
    }

    async getOneHome(id: string): Promise<GetHomeResponseDto | null> {
        const home = await this.homeRepository.getOneHome(parseId(id));
        if (!home) throw new NotFoundException('Home content Not Found')
        return home;
    }

    async createHome(createHomeRequestDto: CreateHomeRequestDto, files: any): Promise<GetHomeResponseDto> {
        let fileUrls;
        if (Object.keys({ ...files }).length) {
            fileUrls = this.uploadService.uploadImage(files);
        }

        createHomeRequestDto.mainContentUrl = fileUrls[0]['main_img'];
        createHomeRequestDto.subContentUrl = fileUrls[1]['sub_img'];
        console.log(createHomeRequestDto)
        return await this.homeRepository.createHome(createHomeRequestDto);
    }

    async editHome(id: string, updateHomeRequestDto: UpdateHomeRequestDto): Promise<GetHomeResponseDto | null> {
        const editedHome = await this.homeRepository.editHome(parseId(id), updateHomeRequestDto);
        if (!editedHome) throw new InternalServerErrorException('Failed to Update Home');
        return editedHome;
    }

    async deleteOneHome(id: string): Promise<GetHomeResponseDto | null> {
        const deletedHome = await this.homeRepository.deleteOneHome(parseId(id));
        if (!deletedHome) throw new InternalServerErrorException('Failed to Delete Home');
        return deletedHome;
    }

    async deleteHome(): Promise<DeleteResult> {
        return await this.homeRepository.deleteHome();
    }
}