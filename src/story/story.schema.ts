import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type StoryDocument = HydratedDocument<Story>;

export class ImageList {
    @Prop({required: [true, 'Required'], type: Number})
    order: number;

    @Prop({required: [true, 'Required'], type: String})
    url: string;
}

@Schema({timestamps: true})
export class Story {
    _id: mongoose.Types.ObjectId;

    @Prop({required: [true, 'Required'], type: String})
    title: string;

    @Prop({required: [true, 'Required'], type: String})
    shortDescription: string;

    @Prop({required: [true, 'Required'], type: String})
    description: string;

    @Prop({required: [true, 'Required'], type: [ImageList]})
    images?: ImageList[];
    
    @Prop({required: [true, 'Required'], type: Boolean})
    isFeatured: boolean;
}

export const StorySchema = SchemaFactory.createForClass(Story);