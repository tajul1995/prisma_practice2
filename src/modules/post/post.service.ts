import { Post, PostStatus } from "../../../generated/prisma/client";
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

const findAllPostBySearch = async(data:string,tags:string[]|[],isFeatured : boolean|undefined,status:PostStatus |undefined,page:number,limit:number,skip:number,sortBy:string ,sortOrder:string)=>{
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

if(status){
    andCondition.push({status})
}
    const result= await prisma.post.findMany({
        take:limit,
        skip,
        where:{
            AND:andCondition},

            orderBy:{
                [sortBy]:sortOrder
            }
        
        
        })
        const count= await prisma.post.count({
             where:{
            AND:andCondition},
        })

             return {
                data:result,
                pagination:{
                    total:count
                }
             }
            
       }
export const postService={
    createPost ,
    findAllPost ,
    getUniquePost,
    findAllPostBySearch
}
     

        
    
        





        
   







            
            
        


// "id": "c32becc8-273f-4aad-bb21-6571e1ce7ffd"