import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { ConflictException, Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { AddUserRequestDto } from "./dto/request/add-user-request.dto";
import mongoose from "mongoose";
import { UpdateUserRequestDto } from "./dto/request/update-user-request.dto";
import { UserResponseDto } from "./dto/response/add-user-response.dto";
import { User } from "./user.schema";
import { parseId } from "src/shared/utils/shared.utils";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository,
        @InjectMapper() private classMapper: Mapper
    ) { }

    async addUser(addUserRequestDto: AddUserRequestDto): Promise<UserResponseDto> {
        const existingUser = await this.getUserByEmail(addUserRequestDto.emailAddress);
        if (existingUser) throw new ConflictException('Email address already used.');
        const addedUser = await this.userRepository.addUser(addUserRequestDto);
        return this.classMapper.map(addedUser, User, UserResponseDto)
    }

    async updateUser(id: string, updateUserRequestDto: UpdateUserRequestDto): Promise<UserResponseDto> {
        const updatedUser = await this.userRepository.updateUser(parseId(id), updateUserRequestDto)
        return this.classMapper.map(updatedUser, User, UserResponseDto);
    }

    async getOneUser(id: string) {
        return await this.userRepository.getOneUser(parseId(id));
    }

    async getUsers(query?: any) {
        return await this.userRepository.getUsers(query);
    }

    async deleteOneUser(id: string) {
        return await this.userRepository.deleteOneUser(parseId(id));
    }

    async deleteUsers() {
        return await this.userRepository.deleteUsers();
    }

    async getUserByEmail(emailAddress: string) {
        return await this.userRepository.getUserByEmail(emailAddress);
    }
}