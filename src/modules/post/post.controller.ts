import { Request, Response } from "express";

import { postService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";


const createPost=async(req:Request,res:Response)=>{
    
    try {
        const userId=req.user?.id
        const user=req.body
        if(!user){
           return res.status(404).json({
                success:false,
                message:'post does not found'
            })
        }
        if(!userId){
           return res.status(404).json({
                success:false,
                message:'post does not found'
            })
        }
        const result = await postService.createPost(user,userId)
        res.status(200).json({
                success:true,
                message:'post created successfully',
                data:result
            })

    } catch (error:any) {
        res.status(404).json({
                success:false,
                message:'post does not found',
                data:error.message
            })
    }

}
const getAllPost=async(req:Request,res:Response)=>{
    
    try {
        
        

        const result = await postService.findAllPost()
        res.status(200).json({
                success:true,
                message:'get all post successfully',
                data:result
            })

    } catch (error:any) {
        res.status(404).json({
                success:false,
                message:'post does not found',
                data:error.message
            })
    }

}

const getUniquePost=async(req:Request,res:Response)=>{
    
    try {
        
        const {id}=req.params
        

        const result = await postService.getUniquePost(id as string)
        res.status(200).json({
                success:true,
                message:'post created successfully',
                data:result
            })

    } catch (error:any) {
        res.status(404).json({
                success:false,
                message:'post does not found',
                data:error.message
            })
    }

}
const getAllPostBySearch=async(req:Request,res:Response)=>{
    
    try {
        
        const {search}=req.query
        const {status}=req.query
        const isFeatured=req.query.isFeatured?
        req.query.isFeatured==='true'?true:req.query.isFeatured==='false'?false:undefined
        :undefined
        
        const searchString= typeof search == "string"? search:undefined
        const tags=req.query.tags?(req.query.tags as string).split(','):[]

        const result = await postService.findAllPostBySearch(searchString as string,tags as string[],isFeatured ,status as PostStatus |undefined)
        res.status(200).json({
                success:true,
                message:'get all post successfully',
                data:result
            })

    } catch (error:any) {
        res.status(404).json({
                success:false,
                message:'post does not found',
                data:error.message
            })
    }

}
export const postController={
    createPost,
    getAllPost,
    getUniquePost,
    getAllPostBySearch

}