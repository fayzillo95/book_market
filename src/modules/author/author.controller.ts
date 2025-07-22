import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthorService } from './author.service';
import { createAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-auth.dto';

@Controller('author')
export class AuthorController {
    constructor(private readonly authorService : AuthorService){}

    @Post("create/author")
    async createAuthor(
        @Body() data : createAuthorDto 
    ){
       return this.authorService.createAuthor(data) 
    }

    @Get("get-one/:id")
    getOneAuthor(
        @Param("id") id : string
    ){
        return this.authorService.findById(+id)
    }
    @Get("get-all/author")
    getAll(){
        return this.authorService.getAllAuthor()
    }

    // @Put("update-one/:id")
    // updateAuthor(
    //     @Body() data : UpdateAuthorDto,
    //     @Param("id") id : string
    // ){
    //     return this.authorService.updateAuthor(data,parseInt(id))
    // }

    // @Delete("delete-one/:id")
    // deleteByIdAuthor(
    //     @Param("id") id : string
    // ){
    //     return this.authorService.deleteAuthor(parseInt(id))
    // }
}
