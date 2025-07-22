import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { fullNameTransformer } from "src/core/types/user.type";

export class CreateUserDto{
    @ApiProperty({
        example : " Fayzillo Ummatov "
    })
    @IsString()
    @IsNotEmpty()
    @Transform((e) => fullNameTransformer(e))
    fullName : string

    @ApiProperty({
        example : "example@gmail.com"
    })
    @IsEmail()
    @Transform((e)=> e.value.trim())
    email : string
    
}