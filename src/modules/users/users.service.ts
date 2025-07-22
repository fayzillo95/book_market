import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async createUser(data: CreateUserDto) {
    if ((await this.prisma.user.findFirst({
      where: { email: data.email }
    }))) {
      throw new ConflictException(`User email already exists ! [ ${data.email} ]`)
    }
    const newUser = await this.prisma.user.create({ data: data })
    return {
      message: `New User created !`,
      success: true,
      newUser
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return {
      message : "Users read successfuly !",
      success:true,
      data: users
    };
  }

  async findById(id:number){
    const user = await this.prisma.user.findFirst({ where: { id: id } })
    if (!user) {
      throw new NotFoundException(`User not found by id [ ${id} ]`);
    }
    return {
      message : `User read one by id : [${id}] successfuly !`,
      success : true,
      data : user
    }
  }

  async updateUser(data : UpdateUserDto,id : number){
    const {data : oldUser} = await this.findById(id)
    if(Object.values(data).length === 0){
      throw new BadRequestException("Invaid body data empty !")
    }

    const updatedUser = await this.prisma.user.update({
      where : {id : id},
      data : data,
      select : {
        id: true,
        fullName : true,
        email :  true,
        
      }
    })

    return {
      message : `User updated successfully by id : [ ${id} ]`,
      success : true,
      data : {
        oldUser,
        updatedUser
      }
    }
  }

  async removeItem(id: number) {
    await this.findById(id);
    const result = await this.prisma.user.delete({
      where: { id: id },
      select: { fullName: true, id: true, email: true },
    });
    return {
      message : `User deleted succesgfuly ! by id : [ ${id} ]`,
      success:true,
      deletedUser: {...result}
    };
  }
  async getBorrowHistories(id:number){
    const historiesBorrow = await this.prisma.userBorrowHistory.findMany({
      where : {userId : id},
      select : {
        book : {
          select : {
            BookDetailes : {
              include : {
                author : true,
                
              }
            },
            title : true,
            publishedYear : true,
            genre : true,
            id : true
          }
        },
        user : true
      }
    })
    return historiesBorrow
  }

}
