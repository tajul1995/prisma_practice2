import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createPost = async(data:Omit<Post,"createdAt"|"updatedAt"|"authorId">,id:any)=>{

    const result= await prisma.post.create({
        data:{
            ...data,
            authorId:id
        }
    })
    return result
}
const findAllPost = async()=>{
    const result= await prisma.post.findMany()
    return result
}
const getUniquePost= async(id:string)=>{
    const result= await prisma.post.findUnique({
        where:{
            id:id
        }
    })
    return result
}


export const postService={
    createPost ,
    findAllPost ,
    getUniquePost
}


// "id": "c32becc8-273f-4aad-bb21-6571e1ce7ffd"