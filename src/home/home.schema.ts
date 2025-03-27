import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type HomeDocument = HydratedDocument<Home>;

@Schema()
export class Home {
    @Prop({required: [true, 'Required'], type: String})
    mainContentTitle: string;

    @Prop({required: [true, 'Required'], type: String})
    mainContentDescription: string;
    
    @Prop({required: false, type: String})
    mainContentUrl: string;

    @Prop({required: [true, 'Required'], type: String})
    subContentTitle: string;

    @Prop({required: [true, 'Required'], type: String})
    subContentDescription: string;

    @Prop({required: false, type: String})
    subContentUrl?: string;
}

export const HomeSchema = SchemaFactory.createForClass(Home);