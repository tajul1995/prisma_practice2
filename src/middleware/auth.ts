import { NextFunction, Request, Response } from "express"
import {auth as betterAuth} from '../lib/auth'

declare global{
    namespace Express{
        interface Request{
            user?:{
                id:string 
                name:string
                email:string
                role:string


                       }
        }
    }
}



const auth=(...roles:string[])=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        try {
            const session = await betterAuth.api.getSession({
      headers: req.headers as any,
    });
    if(!session){
        return res.status(404).json({
            success:false,
            message:'unauthorized access'
        })
    }
    if( !session.user.emailVerified ){
        return res.status(404).json({
            success:false,
            message:'unauthorized access'
        })
    }
    req.user={
        id:session.user.id,
        name:session.user.name,
        email:session.user.email,
        role:session.user.role as string
    }
    if(roles.length&&!roles.includes(req.user.role)){
        return res.status(404).json({
            success:false,
            message:'forbidden access'
        })
    }
        next()

        } catch (error) {
            next(error)
        }    }
}

export default auth