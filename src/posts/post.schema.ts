import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, HydrateOptions } from "mongoose";
import { User } from "src/user/user.schema";

export class Comment {
    @Prop({ required: [true, 'Required'], type: String })
    content: string;

    @Prop({ required: [true, 'Required'], type: [String], default: [] })
    likes: String[];
}

// export class MetaData {
//     @Prop({required: [true, 'Required'], type: User, ref: 'User'})
//     createdBy: User;

//     @Prop({required: [true, 'Required'], type: Date})
//     createdAt: Date;

//     @Prop({required: false, type: Date})
//     editedAt?: Date;
// }

// @Prop({required: [true, 'Required'], type: MetaData})
// metadata: MetaData

export type PostDocument = HydratedDocument<Post>;

@Schema({timestamps: true})
export class Post {

    @Prop({ required: [true, 'Required'], type: String })
    description: string;

    @Prop({ required: [true, 'Required'], type: mongoose.Types.ObjectId, ref: 'User' })
    createdBy: User;

    @Prop({ required: [true, 'Required'], type: [String] })
    likes: String[];

    @Prop({ required: false, type: [Comment] })
    comments: Comment[];

    // @Prop({required: false, type: [Media] })
    // media?: Media[];
}

export const PostSchema = SchemaFactory.createForClass(Post);