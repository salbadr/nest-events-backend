import { SelectQueryBuilder } from "typeorm";

export interface PaginateOptions {
    limit: number,
    currentPage: number,
    total?: boolean
}

export interface PaginateResults<T> {
    first: number,
    last: number,
    limit: number,
    total?: number
    data: T[]
}
export async function paginate<T>(qb: SelectQueryBuilder<T>, options:PaginateOptions ={
    currentPage: 1,
    limit: 10,
}): Promise<PaginateResults<T>>{
    console.log(options);

    const offset = (options.currentPage - 1) * options.limit;
    console.log(offset);
    const data =await qb
    .limit(options.limit)
    .offset(offset)
    .getMany()

    return {
        first: offset+1,
        limit: options.limit,
        last: offset + data.length,
        data
    }

}