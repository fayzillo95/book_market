import { PartialType } from "@nestjs/mapped-types";
import { createAuthorDto } from "./create-author.dto";


export class UpdateAuthorDto extends PartialType(createAuthorDto){}