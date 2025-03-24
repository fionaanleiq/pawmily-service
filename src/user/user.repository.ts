import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose, { Model } from "mongoose";
import { AddUserRequestDto } from "./dto/request/add-user-request.dto";
import { UpdateUserRequestDto } from "./dto/request/update-user-request.dto";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async addUser(addUserRequestDto: AddUserRequestDto) {
        return await this.userModel.create(addUserRequestDto);
    }

    async updateUser(id: mongoose.Types.ObjectId, updateUserRequestDto: any) {
        console.log(updateUserRequestDto)
        return await this.userModel.findByIdAndUpdate(id, {...updateUserRequestDto}, { new: true, runValidators: true })
    }

    async getOneUser(id: mongoose.Types.ObjectId) {
        console.log('repo', id)
        return await this.userModel.findById(id).lean();
    }

    async getUsers(query?: any) {
        return await this.userModel.find(query).sort('createdBy');
    }

    async deleteOneUser(id: mongoose.Types.ObjectId) {
        return await this.userModel.findByIdAndDelete(id);
    }

    async deleteUsers() {
        return await this.userModel.deleteMany();
    }

    async getUserByEmail(emailAddress: string) {
        return await this.userModel.findOne({ emailAddress })
    }

    async getAllFollowers(id: mongoose.Types.ObjectId) {
        console.log(id)
        return await this.userModel.findById(id).select('followers -_id');
    }

    async getAllFollowing(id: mongoose.Types.ObjectId) {
        console.log(id)
        return await this.userModel.findById(id).select('following -_id').lean();
    }
}