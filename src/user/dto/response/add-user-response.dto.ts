import { OmitType } from "@nestjs/mapped-types";
import { AddUserRequestDto } from "../request/add-user-request.dto";

export class UserResponseDto extends OmitType(AddUserRequestDto, ['password'] as const) {}