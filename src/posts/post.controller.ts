import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostRequestDto } from "./dto/request/create-post-request.dto";
import { MetadataDto } from "src/shared/dto/metadata.dto";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { RolesGuard } from "src/shared/guards/roles.guard";
import { Roles } from "src/shared/decorators/roles.decorator";
import { ROLE_TYPE } from "src/user/user.schema";
import { EditPostRequestDto } from "./dto/request/edit-post-request.dto";
import { CommentPostRequestDto } from "./dto/request/comment-post-request.dto";

@UseGuards(JwtGuard, RolesGuard)
@Controller('post')
@Roles(ROLE_TYPE.ADMIN, ROLE_TYPE.USER)
export class PostController {
    constructor(
        private readonly postService: PostService
    ) {}

    @Post('create')
    async createPost (@Req() req, @Body() addPostRequestDto: CreatePostRequestDto) {
        return await this.postService.createPost(req.user, addPostRequestDto);
    }

    @Patch('edit/:id')
    async editPost (@Param('id') id: string, @Body() editPostRequestDto: EditPostRequestDto) {
        if(!id) throw new BadRequestException('Missing ID Parameter');
        if(!Object.keys(editPostRequestDto).length) throw new BadRequestException('Missing Fields for Update');
        return await this.postService.editPost(id, editPostRequestDto);
    }

    @Get('view/:id')
    async getOnePost (@Param('id') id: string) {
        if(!id) throw new BadRequestException('Missing ID Parameter');
        return await this.postService.getOnePost(id);
    }
    
    @Get('view')
    async getAllPosts () {
        return await this.postService.getAllPosts();
    }

    @Delete('delete/:id')
    async deleteOnePost (@Param('id') id: string) {
        return await this.postService.deleteOnePost(id);
    }

    @Delete('delete')
    async deleteAllPosts () {
        return await this.postService.deleteAllPosts();
    }

    @Patch('like/:id')
    async likePost (@Param('id') id: string, @Req() req) {
        return await this.postService.likePost(id, req.user);
    }

    @Patch('comment/:id')
    async commentPost (@Param('id') id: string, @Req() req, @Body() commentPostRequestDto: CommentPostRequestDto) {
        return await this.postService.commentPost(id, req.user, commentPostRequestDto);
    }
}