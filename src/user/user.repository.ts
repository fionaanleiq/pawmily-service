import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose, { Model } from "mongoose";
import { AddUserRequestDto } from "./dto/request/add-user-request.dto";
import { UpdateUserRequestDto } from "./dto/request/update-user-request.dto";

@Injectable()
export class UserRepository {
    constructor (@InjectModel(User.name) private userModel: Model<User>) {}

    async addUser (addUserRequestDto: AddUserRequestDto) {
        return this.userModel.create(addUserRequestDto);
    }

    async updateUser (id: mongoose.Types.ObjectId, updateUserRequestDto: UpdateUserRequestDto) {
        return this.userModel.findByIdAndUpdate(id, updateUserRequestDto, {new: true, runValidators: true}) 
    }

    async getOneUser (id: mongoose.Types.ObjectId) {
        return this.userModel.findById(id);
    }

    async getUsers (query?: any) {
        return this.userModel.find(query).sort('createdBy');
    }

    async deleteOneUser (id: mongoose.Types.ObjectId) {
        return this.userModel.findByIdAndDelete(id);
    }

    async deleteUsers () {
        return this.userModel.deleteMany();
    }

    async getUserByEmail (emailAddress: string) {
        return this.userModel.findOne({emailAddress})
    }
}