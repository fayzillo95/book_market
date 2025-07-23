import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }
  @Post("v1/create")
  createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data)
  }


  @Delete('v2/delete/accaunt/:id')
  deleteOne(@Param('id') id: string) {
    return this.userService.removeItem(+id);
  }

  @Get('v3/getall')
  getAll() {
    return this.userService.findAll();
  }

  @Get("v4/get-one/:id")
  getOne(@Param("id") id: string) {
    return this.userService.findById(+id)
  }


  @Get("v5/:id/history")
  getBorrowHistories(
    @Param("id") id: string
  ) {
    return this.userService.getBorrowHistories(parseInt(id))
  }
}
