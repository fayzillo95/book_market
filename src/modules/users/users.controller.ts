import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  
  @Get('getall')
  getAll() {
    return this.userService.findAll();
  }
  
  @Get("get-one/:id")
  getOne(@Param("id") id : string){
    return this.userService.findById(+id)
  }
  
  @Post("create")
  createUser(@Body() data : CreateUserDto){
    return this.userService.createUser(data)
  }

  @Delete('delete/accaunt/:id')
  deleteOne(@Param('id') id: string) {
    return this.userService.removeItem(+id);
  }

  @Get("/:id/history")
  getBorrowHistories(
    @Param("id") id : string
  ){
    return this.userService.getBorrowHistories(parseInt(id))
  }
}
