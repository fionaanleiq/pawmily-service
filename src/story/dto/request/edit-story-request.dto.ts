import { PartialType } from "@nestjs/mapped-types";
import { CreateStoryRequestDto } from "./create-story-request.dto";

export class EditStoryRequestDto extends PartialType(CreateStoryRequestDto) {}