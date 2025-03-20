import { IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";

export class CreatePostRequestDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    createdBy?: mongoose.Types.ObjectId
    // media?: Media[];
}