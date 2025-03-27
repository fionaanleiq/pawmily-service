import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AboutUs } from "./about-us.schema";
import { Model } from "mongoose";
import { CreateAboutUsRequestDto } from "./dto/request/create-about-us-request.dto";

@Injectable()
export class AboutUsRepository {
    constructor (@InjectModel(AboutUs.name) private aboutUsModel: Model<AboutUs>) {}
    
    async createAboutUs (createAboutUsRequestDto: CreateAboutUsRequestDto) {
        return await this.aboutUsModel.create(createAboutUsRequestDto);
    }

    async editAboutUs () {
        
    }
}