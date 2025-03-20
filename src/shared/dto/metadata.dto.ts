import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsString, MaxDate, ValidateIf } from "class-validator";
import mongoose from "mongoose";
import { User } from "src/user/user.schema";

export class MetadataDto {

    @IsNotEmpty()
    @Transform(({value}) => new mongoose.Types.ObjectId(value))
    createdBy: mongoose.Types.ObjectId;

    @IsDate()
    @IsNotEmpty()
    @MaxDate(() => new Date())
    createdAt: Date;

    @ValidateIf(o => o.editedAt)
    @IsDate()
    @IsNotEmpty()
    @MaxDate(() => new Date())
    editedAt?: Date;
}