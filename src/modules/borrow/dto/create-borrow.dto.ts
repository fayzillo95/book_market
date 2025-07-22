import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateBorrowDto {
    @ApiProperty({example : 1})
    @IsNumber()
    userId : number

    @ApiProperty({example : 1})
    @IsNumber()
    bookId : number

}
