import { Controller, Post } from "@nestjs/common";

@Controller('posts')
export class PostController {
    constructor() {}

    @Post()
    async createPost () {
        
    }
}