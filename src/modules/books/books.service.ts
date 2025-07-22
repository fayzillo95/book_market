import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { checkPublishedYear } from 'src/core/types/helper';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(data: CreateBookDto) {
    checkPublishedYear(data.publishedYear)
    await this.checkingData(data.authorId, data.title)
    const newBook = await this.prisma.book.create({
      data: {
        title: data.title,
        genre: data.genre,
        availableCount: data.count,
        publishedYear: data.publishedYear,
      }
    })
    const bookAuthor = await this.prisma.bookAuthor.create({
      data: {
        bookId: newBook.id,
        authorId: data.authorId,
      },
    })

    return {
      message: 'This action adds a new book succesfuly !',
      succes: true,
      data: {
        book: {
          newBook,
          bookAuthor
        }
      }
    };
  }

  async checkingData(id?: number | undefined, title?: string | undefined) {
    if (id && !(await this.prisma.author.findFirst({
      where: { id: id }
    }))) {
      throw new NotFoundException(`Author not found by id : [ ${id} ]`)
    }
    if (title && (await this.prisma.book.findFirst({
      where: { title: title }
    }))) {
      throw new BadRequestException(`Book title : [ ${title} ] already exists !`)
    }
  }

  async findAll() {
    const books = await this.prisma.book.findMany()
    return {
      message: `This action returns all books`,
      succes: true,
      data: books
    };

  }

  async findOne(id: number) {
    const book = await this.prisma.book.findFirst({
      where: { id: id }
    })
    if (!book) {
      throw new NotFoundException(`Book not found by id : [ ${id} ] !`)
    }
    return {
      message: `This action returns a #${id} book`,
      succes: true,
      data: book
    };
  }

  async update(id: number, data: UpdateBookDto) {
    const { data: oldBook } = await this.findOne(id)
    const detailesBookQueryData = {}
    const bookQuery = {}
    if (data.count) {
      bookQuery['availableCount'] = data.count
    }
    if (data.publishedYear) {
      checkPublishedYear(data.publishedYear)
      bookQuery['publishedYear'] = data.publishedYear
    }

    if (data.genre) {
      bookQuery['genre'] = data.genre
    }
    if (data.title) {
      await this.checkingData(undefined, data.title)
      bookQuery['title'] = data.title
    }
    const updatedBook = await this.prisma.book.update({
      where: { id: id },
      data: bookQuery
    })

    return {
      message: `This action updates a #${id} book`,
      data: updatedBook
    };
  }

  async remove(id: number) {
    const {data : oldBook} = await this.findOne(id)

    const existsBorrow = await this.prisma.borrow.findMany({
      where : {
        AND : [
          {bookId : id},
          {isAvailable : false}
        ]
      },
      select : {
        books : true
      }
    })
    if(existsBorrow[0]){
      throw new BadRequestException(`${existsBorrow[0].books.title} avaliable in borrow exists !`)
    }

    const deletedBook = await this.prisma.book.delete({
      where : {id : id}
    })
    return {
      message : true,
      data : {
        deletedBook,  
        existsBorrow,
        oldBook
      }
    };
  }
}
