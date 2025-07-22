import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { ReturningBorrowDto } from './dto/update-borrow.dto';

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Post()
  create(@Body() createBorrowDto: CreateBorrowDto) {
    return this.borrowService.create(createBorrowDto);
  }

  @Get()
  findAll() {
    return this.borrowService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.borrowService.findOne(+id);
  }

  @Post('returning')
  update( @Body() data: ReturningBorrowDto) {
    return this.borrowService.update( data.borrowId);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.borrowService.remove(+id);
  }
}
