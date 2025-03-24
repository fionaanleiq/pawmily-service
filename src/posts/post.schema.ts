import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, HydrateOptions } from "mongoose";
import { User } from "src/user/user.schema";

@Schema({timestamps: true})
export class Comment {
    
    _id?: mongoose.Types.ObjectId;

    @Prop({ required: [true, 'Required'], type: String })
    content: string;

    @Prop({ required: [true, 'Required'], type: [String], default: [] })
    likes: string[];

    @Prop({ required: [true, 'Required'], type: String})
    commentedBy: string;

    createdAt: Date;
}

export type PostDocument = HydratedDocument<Post>;

@Schema({timestamps: true})
export class Post {
    _id?: mongoose.Types.ObjectId;

    @Prop({ required: [true, 'Required'], type: String })
    description: string;

    @Prop({ required: [true, 'Required'], type: mongoose.Types.ObjectId, ref: 'User' })
    createdBy: User;

    @Prop({ required: [true, 'Required'], type: [String] })
    likes: String[];

    @Prop({ required: false, type: [Comment] })
    comments: Comment[];

    createdAt?: Date;
    // @Prop({required: false, type: [Media] })
    // media?: Media[];
}

export const PostSchema = SchemaFactory.createForClass(Post);