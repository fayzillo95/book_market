import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { ReturningBorrowDto } from './dto/update-borrow.dto';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post("/v1/create")
  create(@Body() createBorrowDto: CreateBorrowDto) {
    return this.borrowService.create(createBorrowDto);
  }

  @Get("v2/getall")
  findAll() {
    return this.borrowService.findAll();
  }

  @Get('v3/get-one/:id')
  findOne(@Param('id') id: string) {
    return this.borrowService.findOne(+id);
  }

  @Post('/v4/returning')
  update( @Body() data: ReturningBorrowDto) {
    return this.borrowService.update( data.borrowId);
  }

  @Delete('v5/delete/:id')
  remove(@Param('id') id: string) {
    return this.borrowService.remove(+id);
  }
}
