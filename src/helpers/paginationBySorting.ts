

type Ioptions={
    page?:number|string,
    limit?:number|string,
    sortBy?:string|undefined,
    sortOrder?:string|undefined
}

type IoptionsResult={
    page:number,
    limit:number,
    skip:number,
    sortBy:string,
    sortOrder:string
}
const paginationsorting=(options:Ioptions):IoptionsResult=>{
    const page=Number(options.page) || 1
    const limit=Number(options.limit) || 1
    const skip=(page-1)*limit
    const sortBy=options.sortBy || 'createdAt'
    const sortOrder=options.sortOrder || "desc"
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }


}
export default paginationsorting