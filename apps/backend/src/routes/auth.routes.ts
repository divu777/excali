import { success } from 'zod/v4';
import { config, SigninSchema, SignupSchema } from '@repo/common';
import { prisma } from '@repo/db';
import express from 'express';
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
const router = express.Router();


router.post("/signup",async(req,res)=>{

    try {

        const validate = SignupSchema.safeParse(req.body);

        if(!validate.success){
            res.json({
                message:validate.error.message,
                success:false
            })
            return
        }


        const {username,email,password}=req.body

        const hashedpassword = await bcrypt.hash(password,10)

        const userCreated=await prisma.user.create({
            data:{
                username,
                password:hashedpassword,
                email
            }
        })

        if (!userCreated) {
            res.json({
            message: "Error in adding the new user to the db",
            success: false,
          });
          
          return;
        } else {
          res.json({
            message: "Created user Successfully",
            success: true,
          });
          return;
        }
        
    } catch (error) {
        console.log("Error in signing up "+error);
         res.json({
            message:"error in signing up",
            success:false
        })
        return
    }

})


router.post("/signin",async (req,res)=>{
    try {

        const validinputs= SigninSchema.safeParse(req.body);

        if(!validinputs.success){
             res.json({
                message:validinputs.error.message,
                success:false
            })
            return
        }

        const {email,password} = req.body

        const userExist= await prisma.user.findfirst({
            where:{
                email
            }
        })

        if(!userExist){
            res.json({
                message:"User does not exist",
                success:false
            })
            return 
        }
        const validpassword= await bcrypt.compareSync(password,userExist.password);
        if(!validpassword){
            res.json({
                message:"Invalid password",
                success:false}
            )
            return
        }


        const token = jwt.sign({userId:userExist.id},config.JWT_SECRET!)

        res.json({
            message:"Signed In Successfully",
            token,
            success:true
        })

        return  
    } catch ( error ) {
        console.log("Error in signing in "+error);
        res.json({
            message:"error in signing up",
            success:false
        })
        return
    }   
})




export default router