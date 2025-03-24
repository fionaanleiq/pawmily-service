import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { MetadataDto } from "src/shared/dto/metadata.dto";
import { CreatePostRequestDto } from "./dto/request/create-post-request.dto";
import { PostRepository } from "./post.repository";
import { EditPostRequestDto } from "./dto/request/edit-post-request.dto";
import { parseId } from "src/shared/utils/shared.utils";
import { CommentPostRequestDto } from "./dto/request/comment-post-request.dto";
import mongoose from "mongoose";
import { NotFoundError } from "rxjs";
import { UserService } from "src/user/user.service";
import { GetPostsResponseDto } from "./dto/response/get-posts-response.dto";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Post } from "./post.schema";

@Injectable()
export class PostService {
    constructor(private readonly postRepository: PostRepository,
        private readonly userService: UserService,
        @InjectMapper() private readonly classMapper: Mapper
    ) { }

    async createPost(user: any, addPostRequestDto: CreatePostRequestDto) {
        addPostRequestDto.createdBy = user.id;
        return await this.postRepository.createPost(addPostRequestDto)
    }

    async editPost(id: string, editPostRequestDto: EditPostRequestDto) {
        return await this.postRepository.editPost(parseId(id), editPostRequestDto);
    }

    async getOnePost(id: string) {
        return await this.postRepository.getOnePost(parseId(id));
    }

    async getAllPosts(): Promise<any> {
        const posts = await this.postRepository.getAllPosts();
        if (!posts.length) throw new NotFoundException('Posts Not Found');
        console.log(posts)

        // const data = await posts.map((post) => {
             
        // })

        // const formattedPosts = await posts.map((post) => ({
        //     ...post,
        //     ...(post.likes.map(async (like) => {
        //         console.log('like', like)
        //         return await this.userService.getUserName(String(like))
        //     })),
        //     // ...(post.comments.map(async (comment) => ({
        //     //     ...comment,
        //     //     commentedBy: await this.userService.getUserName(String(comment.commentedBy))
        //     // })))
        // }))
        
        return posts//.map((post => this.classMapper.map(post, Post, GetPostsResponseDto))) 
    }

    async deleteOnePost(id: string) {
        return await this.postRepository.deleteOnePost(parseId(id));
    }

    async deleteAllPosts() {
        return await this.postRepository.deleteAllPosts();
    }

    async likePost(id: string, user: any) {
        const editPostRequestDto: EditPostRequestDto = {}
        editPostRequestDto.likedBy = user.id
        return await this.editPost(id, editPostRequestDto);
    }

    async commentPost(id: string, user: any, commentPostRequestDto: CommentPostRequestDto) {
        const editPostRequestDto: EditPostRequestDto = {}
        commentPostRequestDto.commentedBy = user.id;
        editPostRequestDto.comment = commentPostRequestDto;
        console.log(user)
        return await this.editPost(id, editPostRequestDto);
    }
}