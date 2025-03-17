import { AddUserRequestDto } from "./add-user-request.dto";
import { PartialType } from '@nestjs/mapped-types'

export class UpdateUserRequestDto extends PartialType(AddUserRequestDto){}