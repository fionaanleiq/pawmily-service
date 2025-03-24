import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { AddUserRequestDto } from "./dto/request/add-user-request.dto";
import mongoose from "mongoose";
import { UpdateUserRequestDto } from "./dto/request/update-user-request.dto";
import { UserResponseDto } from "./dto/response/add-user-response.dto";
import { STATUS_TYPE, User, UserDocument } from "./user.schema";
import { parseId } from "src/shared/utils/shared.utils";
import { hash } from "bcrypt";
import { BaseResponse } from "src/shared/dto/response/base-response.dto";

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
        const updatedUser = await this.userRepository.updateUser(parseId(id), updateUserRequestDto);
        // console.log(updatedUser);
        return this.classMapper.map(updatedUser, User, UserResponseDto);
    }

    async getOneUser(id: string) {
        console.log('getOneuserwithdto', id)
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
        return await this.classMapper.map(deletedUser, User, UserResponseDto)
    }

    async deleteUsers() {
        return await this.userRepository.deleteUsers();
    }

    async getUserByEmail(emailAddress: string): Promise<UserDocument | null> {
        const user = await this.userRepository.getUserByEmail(emailAddress);
        return user;
    }

    async getUserName(id: string) {
        console.log('getuserservice', id)
        const user = await this.getOneUser(id);
        return user.fullName;
    }

    async followUnfollowUser(id: string, user: any): Promise<BaseResponse<UserResponseDto>> {
        // console.log('id', user)
        if (id === user.id) throw new ConflictException('You cannot follow yourself');
        const userAccFollowed = await this.userRepository.getOneUser(parseId(id));
        if (!userAccFollowed) throw new NotFoundException('User to Follow is Not Found');
        const userAccFollowing = await this.userRepository.getOneUser(user.id);
        // console.log('helowww', userAccFollowing)
        if (!userAccFollowing) throw new NotFoundException('User Following is Not Found');
        
        let query = {};
        let flag = true;

        if (userAccFollowed?.followers?.includes(user.id)) {
            flag = false;
            query = { '$pull': { followers: user.id } };
        } else {
            query = { '$addToSet': { followers: user.id } };
        }
        console.log('query1', query);
        const userFollowedResult = await this.updateUser(id, query);
        // console.log('res', userFollowedResult)

        if (userAccFollowing?.following?.includes(id)) {
            query = { '$pull': { following: id } };
        } else {
            query = { '$addToSet': { following: id } };
        }
        console.log('query2', query);
        await this.updateUser(user.id, query);

        return {
            message: flag ? 'Followed user' : 'Unfollowed user',
            data: userFollowedResult
        };
    }

    async getAllFollowers(id: string): Promise<any> {
        if (!id) throw new BadRequestException('Missing Param ID');
        const followerResult = await this.userRepository.getAllFollowers(parseId(id));
        return followerResult?.followers;
    }

    async getAllFollowing(id: string): Promise<any> {
        if (!id) throw new BadRequestException('Missing Param ID');
        const followingResult = await this.userRepository.getAllFollowing(parseId(id));
        return followingResult?.following;
    }
}