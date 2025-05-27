import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

type jwttype={
    userId:string,
    iat?:Number,
    exp?:Number
}


export const authMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    try {

        const headers = req.headers["authorization"];
        const token = headers?.split(" ")[1]!;
        const decoded=jwt.verify(token,process.env.JWT_SECRET!) as jwttype;

        if(!decoded){
             res.json({
                message:"Error in auth validation , please login first",
                success:false
            })
            return;
        }

        req.user=decoded.userId

        next()
        
    } catch (error) {
        console.log("Error in the Middleware");
         res.json({
            message:"Auth Required",
            success:false
        })
        return;
    }
}