import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { transformerToNumber } from "src/core/types/helper";

export class UpdateBookDto {
    @ApiProperty({
        example: "Mukammal Dasturlash 1!"
    })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        example: 2021
    })
    @Transform((e) => transformerToNumber(e))
    @IsNumber()
    publishedYear: number

    @ApiProperty({
        example: 5
    })
    @Transform((e) => transformerToNumber(e))
    @IsNumber()
    count: number

    @ApiProperty({ example: "Dasturlash" })
    @IsString()
    @IsNotEmpty()
    genre: string
}
