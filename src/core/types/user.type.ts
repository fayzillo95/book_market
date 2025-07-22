import { BadRequestException } from "@nestjs/common"

export const fullNameTransformer = (e : {value : string}) => {

    if(!e.value.includes(" ")){
        throw new BadRequestException("FullName ")
    }
    const arr:string[] = e.value.trim().split(" ").filter(value => value[0].toUpperCase() + value.slice(1).toLowerCase())

    return arr.join(" ")
}