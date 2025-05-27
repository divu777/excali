import { metadata } from './../../../web/app/layout';
import express from 'express'
import { authMiddleware } from '../middleware';
import { CreateRoomSchema } from '@repo/common';
import { prisma } from '@repo/db';
import { json, success } from 'zod/v4';

const router = express.Router()


router.post("/create",authMiddleware,async (req,res)=>{
    try {

        const validinputs=CreateRoomSchema.safeParse(req.body);
        const user = req.user
        if(!validinputs.success){
            res.json({
                message:validinputs.error.message,
                success:false
            })
            return
        }


        const {name }=req.body

        const roomCreated=await prisma.chatRoom.create({
            data:{
                name,
                adminId:user
            }
        })

        if(!roomCreated){
            res.json({
                message:"Error while creating room",
                status:false
            })
            return
        }

        res.json({
            message:"Room created successfully",
            success:true,
            roomId:roomCreated.id
        })
         
    } catch (error) {
        console.log(error);
        res.json({
            message:"Error in creating room",
            success:"false"
        })
        return;
    }
})


router.get("/chats/:roomId",async(req,res)=>{
    const roomId =Number(req.params)
    if(!roomId){
        res.json({
            message:"Room Id not provided",
            success:false
        })
        return
    }
    const messages = await prisma.chat.findMany({
        where:{
            roomId
        },
        orderBy:{
            id:'desc'
        },
        take:50

    })


    if(!messages){
        res.json({
            message:"No messages",
            success:false
        })
        return
    }

    res.json({
        message:"Found messages for chat room",
        success:true,
        messages
    })
    return
    
})


export default router