import { OmitType } from "@nestjs/mapped-types";
import { AddUserRequestDto } from "src/user/dto/request/add-user-request.dto";

export class AuthSignupRequestDto extends OmitType(AddUserRequestDto, ['role', 'status'] as const){}