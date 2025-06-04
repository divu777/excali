import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

type jwttype={
    userId:string,
    iat?:number,
    exp?:number
}


export const authMiddleware=(req:Request,res:Response,next:NextFunction)=>{
    try {

        const headers = req.headers["authorization"];
        const token = headers?.split(" ")[1]!;
        console.log(token )
        const decoded=  jwt.verify(token,"supersecretpassword");
        console.log(decoded + "    ggg")

        if(typeof decoded =="string"){
            return
        }
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
        console.log("Error in the Middleware" + error);
         res.json({
            message:"Auth Required",
            success:false
        })
        return;
    }
}