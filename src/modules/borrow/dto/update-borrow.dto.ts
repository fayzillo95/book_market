import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ReturningBorrowDto{
    @ApiProperty({example : 1})
    @IsNumber()
    borrowId:number
}
