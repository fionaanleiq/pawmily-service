import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostRepository } from "./post.repository";
import { PostController } from "./post.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "./post.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Post.name, schema: PostSchema}])
    ],
    controllers: [PostController],
    providers: [PostService, PostRepository],
    exports: [],
})
export class PostModule {}