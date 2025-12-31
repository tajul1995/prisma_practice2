import { Request, Response } from "express";

import { postService } from "./post.service";


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
        const searchString= typeof search == "string"? search:undefined

        const result = await postService.findAllPostBySearch(searchString as string)
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