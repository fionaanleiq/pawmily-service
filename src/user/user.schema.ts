import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

export enum ROLE_TYPE {
    USER='USER',
    ADMIN='ADMIN'
}

export enum STATUS_TYPE {
    ACTIVE='ACTIVE',
    INACTIVE='INACTIVE'
}

export const roleList = Object.values(ROLE_TYPE);
export const statusList = Object.values(STATUS_TYPE);

@Schema({timestamps: true})
export class User {
    @Prop({required: [true, 'Required'], type: String})
    fullName: string;

    @Prop({required: [true, 'Required'], type: String})
    emailAddress: string;

    @Prop({required: [true, 'Required'], type: String})
    password: string;

    @Prop({required: [true, 'Required'], type: String, enum: roleList })
    role: string;

    @Prop({required: [true, 'Required'], type: String, enum: statusList })
    status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);