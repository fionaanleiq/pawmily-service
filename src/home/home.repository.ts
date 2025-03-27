import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Home } from "./home.schema";
import mongoose, { Model } from "mongoose";
import { CreateHomeRequestDto } from "./dto/request/create-home-request.dto";
import { UpdateHomeRequestDto } from "./dto/request/update-home-request.dto";

@Injectable()
export class HomeRepository {
    constructor(
        @InjectModel(Home.name) private homeModel: Model<Home>
    ) { }

    async getHome() {
        return await this.homeModel.find().lean();
    }

    async getOneHome(id: mongoose.Types.ObjectId) {
        return await this.homeModel.findById(id).lean();
    }

    async createHome(createHomeRequestDto: CreateHomeRequestDto) {
        return await this.homeModel.create(createHomeRequestDto);
    }

    async editHome(id: mongoose.Types.ObjectId, updateHomeRequestDto: UpdateHomeRequestDto) {
        return await this.homeModel.findByIdAndUpdate(id, updateHomeRequestDto);
    }

    async deleteOneHome(id: mongoose.Types.ObjectId) {
        return await this.homeModel.findByIdAndDelete(id);
    }

    async deleteHome() {
        return await this.homeModel.deleteMany();
    }
}