import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { AddUserRequestDto } from "./dto/request/add-user-request.dto";
import { UpdateUserRequestDto } from "./dto/request/update-user-request.dto";
import { UserResponseDto } from "./dto/response/add-user-response.dto";
import { BaseResponse } from "src/shared/dto/response/base-response.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('create')
    async addUser(@Body() addUserRequestDto: AddUserRequestDto): Promise<BaseResponse<UserResponseDto>> {
        if (!Object.keys(addUserRequestDto).length) throw new BadRequestException('Missing Body');
        const addedUser = await this.userService.addUser(addUserRequestDto);
        return {
            message: 'Added user',
            data: addedUser
        };
    }

    @Patch('update')
    async updateUser(@Param('id') id: string, @Body() updateUserRequestDto: UpdateUserRequestDto): Promise<BaseResponse<UserResponseDto>> {
        const updatedUser = await this.userService.updateUser(id, updateUserRequestDto);
        return {
            message: 'Updated user',
            data: updatedUser
        }
    }

    @Get('view/:id')
    async getOneUser(@Param('id') id: string): Promise<BaseResponse<UserResponseDto>> {
        const user = await this.userService.getOneUser(id);
        return {
            message: 'Fetched user',
            data: user
        }
    }

    @Get('view')
    async getUsers(@Query('query') query?: any): Promise<BaseResponse<UserResponseDto[]>> {
        const users = await this.userService.getUsers(query)
        return {
            message: users.length ? 'Fetched all users' : 'No users available',
            data: users
        };
    }

    @Delete('delete/:id')
    async deleteOneUser(@Param('id') id: string): Promise<BaseResponse<UserResponseDto>> {
        const deletedUser = await this.userService.deleteOneUser(id);
        return {
            message: 'Deleted user',
            data: deletedUser
        }
    }

    @Delete('delete')
    async deleteUsers(): Promise<BaseResponse<any>> {
        const deletedUsers = await this.userService.deleteUsers();
        return {
            message: deletedUsers.deletedCount ? 'Deleted users': 'No users deleted',
            data: deletedUsers
        }
    }
}