import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { AddUserRequestDto } from "./dto/request/add-user-request.dto";
import { UpdateUserRequestDto } from "./dto/request/update-user-request.dto";
import { UserResponseDto } from "./dto/response/add-user-response.dto";
import { BaseResponse } from "src/shared/dto/response/base-response.dto";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { RolesGuard } from "src/shared/guards/roles.guard";
import { ROLE_TYPE } from "./user.schema";
import { Roles } from "src/shared/decorators/roles.decorator";

@Controller('user')
@UseGuards(JwtGuard, RolesGuard)
@Roles(ROLE_TYPE.USER)
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

    @Patch(['follow/:id', 'unfollow/:id'])
    async followUnfollowUser(@Param('id') id: string, @Req() req): Promise<BaseResponse<UserResponseDto>> {
        return await this.userService.followUnfollowUser(id, req.user);
    }

    @Get('view/:id/followers') 
    async getAllFollowers (@Param('id') id: string): Promise<BaseResponse<UserResponseDto[]>> {
        if (!id) throw new BadRequestException('Missing Param ID');
        const followersResult = await this.userService.getAllFollowers(id);
        
        return {
            message: followersResult.length ? 'Fetched all followers ' : 'No followers found',
            data: followersResult || []
        }
    }

    @Get('view/:id/following')
    async getAllFollowing(@Param('id') id: string): Promise<BaseResponse<UserResponseDto[]>> {
        const followingResult = await this.userService.getAllFollowing(id);
        return {
            message: followingResult.length ? 'Fetched all following users ' : 'No following users found',
            data: followingResult || []
        }
    }
}