import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { AddUserRequestDto } from "./dto/request/add-user-request.dto";
import { UpdateUserRequestDto } from "./dto/request/update-user-request.dto";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('create')
    async addUser(@Body() addUserRequestDto: AddUserRequestDto) {
        return await this.userService.addUser(addUserRequestDto);
    }

    @Patch('update')
    async updateUser(@Param('id') id: string, @Body() updateUserRequestDto: UpdateUserRequestDto) {
        return await this.userService.updateUser(id, updateUserRequestDto);
    }

    @Get('view/:id')
    async getOneUser(@Param('id') id: string) {
        return await this.userService.getOneUser(id);
    }

    @Get('view')
    async getUsers(@Query('query') query?: any) {
        return await this.userService.getUsers(query);
    }

    @Delete('delete/:id')
    async deleteOneUser(@Param('id') id: string) {
        return await this.userService.deleteOneUser(id);
    }

    @Delete('delete')
    async deleteUsers() {
        return await this.userService.deleteUsers();
    }
}