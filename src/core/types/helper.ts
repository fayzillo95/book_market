import { BadRequestException } from "@nestjs/common"

export const transformerToNumber = (e : any) => {
        if (e.value === '') {
            return undefined
        }
        if (isNaN(+e.value)) {
            throw new BadRequestException('Count is missing number !')
        }
        return typeof e.value === 'string' ? parseInt(e.value) : e.value
    }

export const checkPublishedYear = (year : number) => {
    const resentlyYear = new Date().getFullYear()
    if(year > resentlyYear){
        throw new BadRequestException(`Invalid published year is missing lesthen ${resentlyYear} `)
    }
    if(year < 1){
        throw new BadRequestException(`Invalid published year is missing grethen 0 `)
    }
}