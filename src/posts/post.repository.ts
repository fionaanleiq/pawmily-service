import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Post } from "./post.schema";
import mongoose, { Model } from "mongoose";
import { CreatePostRequestDto } from "./dto/request/create-post-request.dto";
import { EditPostRequestDto } from "./dto/request/edit-post-request.dto";
import { MetadataDto } from "../shared/dto/metadata.dto";

@Injectable()
export class PostRepository {
    constructor(
        @InjectModel(Post.name) private postModel: Model<Post>
    ) { }

    async createPost(addPostRequestDto: CreatePostRequestDto) {
        return await this.postModel.create(addPostRequestDto);
    }

    async editPost(id: mongoose.Types.ObjectId, editPostRequestDto: EditPostRequestDto) {
        console.log(editPostRequestDto)
        const query = editPostRequestDto.likedBy
            ? { '$addToSet': { likes: editPostRequestDto.likedBy } }
            : editPostRequestDto.comment
                ? { '$push': { comments: editPostRequestDto.comment } }
                : { '$set': { description: editPostRequestDto.description } };

        console.log(query);
        return await this.postModel.findByIdAndUpdate(id, {...query}, { new: true, runValidators: true });
    }

    async getOnePost(id: mongoose.Types.ObjectId) {
        return await this.postModel.findById(id);
    }

    async getAllPosts() {
        return await this.postModel.find().sort('createdAt');
    }

    async deleteOnePost(id: mongoose.Types.ObjectId) {
        return await this.postModel.findByIdAndDelete(id);
    }

    async deleteAllPosts() {
        return await this.postModel.deleteMany();
    }

    async likePost(id: mongoose.Types.ObjectId, editPostRequestDto: EditPostRequestDto) {
        return await this.postModel.findByIdAndUpdate(id, { '$set': { description: editPostRequestDto.description } }, { new: true, runValidators: true });
    }
}