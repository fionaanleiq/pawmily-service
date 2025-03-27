import { PartialType } from "@nestjs/mapped-types";
import { CreateAboutUsRequestDto } from "./create-about-us-request.dto";

export class EditAboutUsRequestDto extends PartialType(CreateAboutUsRequestDto) {

}