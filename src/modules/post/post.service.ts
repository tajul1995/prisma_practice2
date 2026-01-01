import { Post } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
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

const findAllPostBySearch = async(data:string,tags:string[]|[],isFeatured : boolean|undefined)=>{
    const andCondition:PostWhereInput[]=[]
    

if(data){
    andCondition.push({
                    OR:[
                {

                title:{
                contains:data,
                mode:"insensitive"
            },

                },
                {
                content:{
                contains:data,
                mode:"insensitive"
            },
                },
                {
                    tags:{
                    has:data,
                        

                    }
                }
            ],
                })
}

if(tags.length>0){
andCondition.push({
            tags:{
            hasEvery:tags
            }
                })
}

if(typeof isFeatured ==='boolean'){
    andCondition.push({isFeatured})
}

    const result= await prisma.post.findMany({
                        where:{
            AND:andCondition}})

            
            
            

        
    
        





        
    return result







            
            
        
}
export const postService={
    createPost ,
    findAllPost ,
    getUniquePost,
    findAllPostBySearch
}


// "id": "c32becc8-273f-4aad-bb21-6571e1ce7ffd"