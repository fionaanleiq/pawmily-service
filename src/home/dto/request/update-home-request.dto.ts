import { PartialType } from "@nestjs/mapped-types";
import { CreateHomeRequestDto } from "./create-home-request.dto";

export class UpdateHomeRequestDto extends PartialType(CreateHomeRequestDto) {}