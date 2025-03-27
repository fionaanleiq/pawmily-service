import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ImageList } from "src/story/story.schema";

export type AboutUsDocument = HydratedDocument<AboutUs>

export class Statistics {
    @Prop({required: [true, 'Required'], type: String})
    title: string;

    @Prop({required: [true, 'Required'], type: Number})
    statistic: number;
}

export class AboutUsSection {
    @Prop({required: [true, 'Required'], type: String})
    title: string;

    @Prop({required: [true, 'Required'], type: String})
    subtitle: string;

    @Prop({required: [true, 'Required'], type: String})
    description: string;
}

@Schema()
export class AboutUs {
    @Prop({required: [true, 'Required'], type: [AboutUsSection]})
    section: AboutUsSection[];

    @Prop({required: [true, 'Required'], type: [Statistics]})
    statistics: Statistics[];

    @Prop({required: [true, 'Required'], type: [ImageList]})
    images: ImageList[];

    @Prop({required: [true, 'Required'], type: String})
    mission: string;

    @Prop({required: [true, 'Required'], type: String})
    vision: string;

}

export const AboutUsSchema = SchemaFactory.createForClass(AboutUs);