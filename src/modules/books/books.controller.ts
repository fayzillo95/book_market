import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post("v1/add-book")
  create(@Body() data: CreateBookDto) {
    return this.booksService.create(data);
  }

  @Patch('v2/update/:id')
  update(@Param('id') id: string, @Body() data: UpdateBookDto) {
    return this.booksService.update(parseInt(id), data);
  }

  @Get("v3/get-all")
  findAll() {
    return this.booksService.findAll();
  }

  @Get('v4/get-one/:id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Delete('v5/delete-one/:id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(parseInt(id));
  }
}
