import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { createAuthorDto } from './dto/create-author.dto';
import { ModelArg } from '@prisma/client/runtime/library';
import { UpdateAuthorDto } from './dto/update-auth.dto';

@Injectable()
export class AuthorService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async getAllAuthor(){
        const data = await this.prisma.author.findMany()
        return data
    }

    async createAuthor(data: createAuthorDto) {
        await this.checkExistsAlredyFullName(data.fullName)
        const newAuthor = await this.prisma.author.create({
            data: data
        })
        return {
            message: "Author created successfuly !",
            success: true,
            data: newAuthor
        }
    }

    async findById(id: number) {
        const author = await this.prisma.author.findFirst({
            where: { id: id }
        })
        if (!author) {
            throw new NotFoundException(`Author not found by id : [ ${id} ] ;`)
        }
        return {
            message: "Author read one successfuly by id " + `[ ${id} ]`,
            success: true,
            data: author
        }
    }

    async checkExistsAlredyFullName(fullName: string) {
        const author = await this.prisma.author.findFirst({ where: { fullName: fullName } })
        if (author) {
            throw new ConflictException(`Author already exists fulName : [ ${fullName} ] ;`)
        }
    }

    async updateAuthor(data: UpdateAuthorDto, id: number) {
        const { data: oldAuthor } = await this.findById(id)

        if (data.fullName) await this.checkExistsAlredyFullName(data.fullName)

        if (Object.values(data).length === 0) {
            throw new BadRequestException("Invalid body data empty values !")
        }

        const updatedAuthor = await this.prisma.author.update({
            where: { id: id },
            data: data
        })

        return {
            message: ` Author updated successfulhy ny id : [ ${id} ]`,
            success: true,
            data: {
                oldAuthor,
                updatedAuthor
            }
        }
    }

    async deleteAuthor(id: number) {
        await this.findById(id)
        const deletedAuthor = await this.prisma.author.delete({
            where: { id: id }
        })
        return {
            message: `Author deleted successfulyh by id : [ ${id} ]`,
            success: true,
            data: {
                deletedAuthor
            }
        }
    }
}
