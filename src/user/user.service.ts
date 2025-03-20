import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { AddUserRequestDto } from "./dto/request/add-user-request.dto";
import mongoose from "mongoose";
import { UpdateUserRequestDto } from "./dto/request/update-user-request.dto";
import { UserResponseDto } from "./dto/response/add-user-response.dto";
import { User, UserDocument } from "./user.schema";
import { parseId } from "src/shared/utils/shared.utils";
import { hash } from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        @InjectMapper() private classMapper: Mapper
    ) { }

    async addUser(addUserRequestDto: AddUserRequestDto): Promise<UserResponseDto> {
        const existingUser = await this.getUserByEmail(addUserRequestDto.emailAddress);
        if (existingUser) throw new ConflictException('Email address already used.');
        addUserRequestDto.password = await hash(addUserRequestDto.password, 10);
        const addedUser = await this.userRepository.addUser(addUserRequestDto);
        return this.classMapper.map(addedUser, User, UserResponseDto)
    }

    async updateUser(id: string, updateUserRequestDto: UpdateUserRequestDto): Promise<UserResponseDto> {
        const updatedUser = await this.userRepository.updateUser(parseId(id), updateUserRequestDto)
        return this.classMapper.map(updatedUser, User, UserResponseDto);
    }

    async getOneUser(id: string) {
        const retrievedUser = await this.userRepository.getOneUser(parseId(id));
        if (!retrievedUser) throw new NotFoundException('User Not Found');
        return this.classMapper.map(retrievedUser, User, UserResponseDto);
    }

    async getUsers(query?: any): Promise<UserResponseDto[]> {
        const retrievedUsers = await this.userRepository.getUsers(query);
        // if (!retrievedUsers.length) throw new NotFoundException('Users Not Found');
        return retrievedUsers.map(user => this.classMapper.map(user, User, UserResponseDto));
    }

    async deleteOneUser(id: string): Promise<UserResponseDto> {
        const deletedUser = await this.userRepository.deleteOneUser(parseId(id));
        return this.classMapper.map(deletedUser, User, UserResponseDto)
    }

    async deleteUsers() {
        return await this.userRepository.deleteUsers();
    }

    async getUserByEmail(emailAddress: string): Promise<UserDocument | null> {
        const user = await this.userRepository.getUserByEmail(emailAddress);
        return user;
    }

    async getUserName (id: string) {
        const user = await this.getOneUser(id);
        return user.fullName;
    }
}