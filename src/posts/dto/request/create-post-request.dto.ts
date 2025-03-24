import { IsMongoId, IsNotEmpty, IsString, ValidateIf } from "class-validator";
import mongoose from "mongoose";

export class CreatePostRequestDto {
    @IsString()
    @IsNotEmpty()
    description: string;

    createdBy?: mongoose.Types.ObjectId;
    
    @ValidateIf(o => o.otherPost)
    @IsNotEmpty()
    otherPost?: mongoose.Types.ObjectId;
    // media?: Media[];
}