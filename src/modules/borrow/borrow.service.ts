import { BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class BorrowService {
  constructor(
    private readonly prisama: PrismaService,
    private readonly logger : Logger
  ) { 
    this.logger = new Logger()
  }

  async create(data: CreateBorrowDto) {
    const {user} = await this.checkingData(data.userId, data.bookId)
    const bookBorrow = await this.prisama.book.findFirst({ where: { id: data.bookId } })
    if (!bookBorrow) return
    if (bookBorrow.availableCount <= 0) {
      throw new BadRequestException(`Book in library availableCount = 0 !`)
    }
    const newBorrow = await this.prisama.borrow.create({
      data: {
        userId: data.userId,
        bookId: data.bookId,
        isAvailable: false
      }
    })
    await this.prisama.book.update({
      where: {
        id: data.bookId
      },
      data: {
        availableCount: bookBorrow.availableCount - 1,
        borrowedCount: bookBorrow.borrowedCount + 1
      }
    })
    await this.prisama.userBorrowHistory.create({
      data: {
        bookId: data.bookId,
        userId : data.userId
      }
    })
    this.logger.log(`Ijaraga olindi kitob : [${bookBorrow.title}] User : [${user.fullName}]`)
    return {
      message: 'This action adds a new borrow',
      succes: true,
      data: newBorrow
    };
  }

  async checkingData(userId: number, bookId: number) {
    const book = await this.prisama.book.findFirst({ where: { id: bookId } })
    if (!book) {
      throw new NotFoundException(`Book not found by id : [ ${bookId} ]`)
    }
    const user = await this.prisama.user.findFirst({ where: { id: userId } })
    if (!user) {
      throw new NotFoundException(`User not found by id : [ ${userId} ]`)
    }

    const oldBorrow = await this.prisama.borrow.findFirst({
      where: {
        AND: {
          bookId: bookId,
          userId: userId,
          isAvailable: false
        }
      }
    })
    if (oldBorrow) {
      throw new BadRequestException(`Bu kitob oldin ${user.fullName} ga ${oldBorrow.borrowDate} da berilgan va qaytarilmagan !`)
    }
    
    return { user, book }
  }
  async findAll() {
    const borrows = await this.prisama.borrow.findMany()

    return {
      message: `This action returns all borrow`,
      succes: true,
      data: borrows
    };
  }

  async findOne(id: number) {
    const borrow = await this.prisama.borrow.findFirst({ where: { id: id } })
    if (!borrow) {
      throw new NotFoundException(`Borrow not found by id : [ ${id} ]`)
    }
    return {
      message: `This action returns a #${id} borrow`,
      succes: true,
      data: borrow
    };
  }

  async update(id: number) {
    const { data: borrow } = await this.findOne(id)
    if (borrow.isAvailable) {
      throw new BadRequestException(`Borrow in available true`)
    }
    const book = await this.prisama.book.findFirst({ where: { id: borrow.bookId } })
    if (!book) return

    const returningBorrow = await this.prisama.borrow.update({
      where: { id: id },
      data: {
        isAvailable: true,
        returnDate: new Date(),
        books: {
          update: {
            availableCount: book?.availableCount + 1,
            borrowedCount: book.borrowedCount - 1
          }
        }
      },
      include: { books: true }
    })
    this.logger.log(`[${book.title}] kitobi kutubxonaga qaytarildi `)
    return {
      message: `This action updates a #${id} borrow`,
      succes: true,
      data: returningBorrow
    };
  }

  async remove(id: number) {

    const { data: existsBorrow } = await this.findOne(id)
    if (!existsBorrow.isAvailable) {
      throw new ForbiddenException(`Deleted borrow not acceptly in available false`)
    }
    const deletedBorrow = await this.prisama.borrow.delete({ where: { id: id } })

    return {
      message: `This action removes a #${id} borrow`,
      succes: true,
      data: deletedBorrow
    };
  }
}
