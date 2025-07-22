import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty, IsString } from "class-validator";

export class createAuthorDto{
    @ApiProperty({example : "Javlon ABDULLO"})
    @IsString()
    @IsNotEmpty()
    fullName : string

}