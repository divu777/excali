import  jwt, { verify }  from 'jsonwebtoken';
import {  WebSocketServer,WebSocket } from "ws";
import "dotenv/config"
import { config } from '@repo/common';
import { prisma } from '@repo/db';
const wss = new WebSocketServer({port:4000});


type Rooms=Record<string,WebSocket[]>
console.log(config)
type User={
    userId:string,
    ws:WebSocket,
    rooms: string[]
}


const GloablUser:User[]=[]
const GlobalRooms:Rooms={"divu":[]}


type MessageType={
    type:"create-room",
    payload:{
        name:string
    }
} | {
    type:"join-room",
    payload:{
        name:string,
    }
} | {
    type:"leave-room",
    payload:{
        name:string
    }
} | {
    type:"chat",
    payload:{
        chat:string,
        name:string
    }
}





const AuthenticateUser=(token:string)=>{
    try {
        const decoded = jwt.verify(token,config.JWT_SECRET);

    if(typeof(decoded) === 'string'){
        return null
    }
    

    if(!decoded  || !decoded.userId){
         return null
    }


    return decoded.userId
        
    } catch (error) {
        console.log(error);
        return null
    }

}


wss.on('connection',(ws,request)=>{
    console.log("user is connected");
    const fullUrl= request.url
    if(!fullUrl){
        return
    }

    const query= new URLSearchParams(fullUrl?.split("?")[1] ?? "")
    const token=query.get("token") ?? ""

    const userId= AuthenticateUser(token);
    console.log(userId);
    if(!userId){
        console.log("logged out")
        ws.close()
        return;
    }

    // checks if user already in global , if not add to the state
    const findUser = GloablUser.find(x=>x.userId===userId)
    if(findUser){
        console.log("user already exist")
    }else{
        GloablUser.push({
            userId,
            ws,
            rooms:[]
        })
    }
    ws.on('message',async(data)=>{
        console.log("message from user "+ data);
            
        const message:MessageType=JSON.parse(data.toString());

        if(message.type=="join-room"){
            const {name}=message.payload

            if(GlobalRooms[name]){

                GlobalRooms[name].push(ws);
                const findUser=GloablUser.find(x=>x.ws===ws)
                findUser?.rooms.push(name)
            }else{
                ws.send("Room does not exist")
            }
        }else if(message.type=="leave-room"){
            const {name} = message.payload

            if(!GlobalRooms[name]){
                ws.send("Room with this name does not exist");
            }else{
                GlobalRooms[name]=GlobalRooms[name].filter(socket=>socket !==ws)  
                const findUser=GloablUser.find(z=>z.ws===ws)!;
                findUser.rooms=findUser.rooms.filter(room=>room!==name)
                if (GlobalRooms[name].length === 0) {
                    delete GlobalRooms[name];
                }
            }
        }else if(message.type=="chat"){
            const {name,chat}=message.payload
            if(!GlobalRooms[name]){
                ws.send("room does not exist");
                return
            }

            const findUser=GloablUser.find(x=>x.ws===ws)!

            const UserInRoom = findUser?.rooms.find(room=>room===name)

            if(!UserInRoom){
                ws.send("You are not part of this room , please join it first")
                return
            }
            await prisma.chat.create({
                data:{
                    userId:findUser.userId,
                    roomId:Number(name),
                    message:chat
                }
            })
            GlobalRooms[name].map(socket=>{
                socket!==ws ? socket.send(chat) : console.log("skipped the sender")
            })
        }
        else if(message.type==="create-room"){
            const {name}=message.payload
            if(GlobalRooms[name]){
                ws.send("room already exist with this name")
                return;
            }


            GlobalRooms[name]=[ws]
           const findUser= GloablUser.find((user)=>user.ws===ws)!;
           findUser.rooms.push(name)
        }

    })

    ws.on('close',()=>{
        const user=GloablUser.find(x=>x.ws===ws)

        if(!user){
            return 
        }

        user.rooms.map((room)=>{
            if(!GlobalRooms[room]) return 

            GlobalRooms[room]= GlobalRooms[room].filter((socket)=>socket!==user.ws)
            if (GlobalRooms[room].length === 0) {
            delete GlobalRooms[room];
        }
        })


        const idx= GloablUser.findIndex(x=>x.ws===ws)

        GloablUser.splice(idx,1)
    })


})



