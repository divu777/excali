import  jwt, { verify }  from 'jsonwebtoken';
import {  WebSocketServer,WebSocket } from "ws";
import "dotenv/config"
import { config } from '@repo/common';
import { prisma } from '@repo/db';
const wss = new WebSocketServer({port:4000});


type Rooms=Record<number,WebSocket[]>
console.log(config)
type User={
    userId:string,
    ws:WebSocket,
    rooms: number[]
}



const GloablUser:User[]=[]
const GlobalRooms:Rooms={}


type MessageType= {
    type:"join-room",
    payload:{
        roomId:number,
    }
} | {
    type:"leave-room",
    payload:{
        roomId:number
    }
} | {
    type:"chat",
    payload:{
        chat:string,
        roomId:number
    }
}





const AuthenticateUser=(token:string)=>{
    try {
        const decoded = jwt.verify(token,"supersecretpassword");

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
            
        const message:MessageType=JSON.parse(data.toString());

        console.log("message from user "+ JSON.stringify(message));


        if(message.type=="join-room"){
            const {roomId}=message.payload

            console.log("Dev"+roomId)


            if(!GlobalRooms[roomId]){
                console.log("heeerrr3")
                GlobalRooms[roomId]=[]   
            }

            console.log("here4")
            GlobalRooms[roomId].push(ws);
            const findUser=GloablUser.find(x=>x.ws===ws)
            findUser?.rooms.push(roomId)



        }else if(message.type=="leave-room"){
            const {roomId} = message.payload

            if(!GlobalRooms[roomId]){
                ws.send("Room with this name does not exist");
            }else{
                GlobalRooms[roomId]=GlobalRooms[roomId].filter(socket=>socket !==ws)  
                const findUser=GloablUser.find(z=>z.ws===ws)!;
                findUser.rooms=findUser.rooms.filter(room=>room!==roomId)
                if (GlobalRooms[roomId].length === 0) {
                    delete GlobalRooms[roomId];
                }
            }
        }else if(message.type=="chat"){
            console.log("here")
            console.log(JSON.stringify(message.payload))
            const {roomId,chat}=message.payload
            console.log(roomId + " cchc" )
            if(!GlobalRooms[roomId]){
                console.log("here2")
                return
            }

            const findUser=GloablUser.find(x=>x.ws==ws)!
            console.log(  findUser   + "  fff")

            const UserInRoom = findUser?.rooms.find(room=>room===roomId)

            if(!UserInRoom){
                ws.send("You are not part of this room , please join it first")
                return
            }
            await prisma.chat.create({
                data:{
                    userId:findUser.userId,
                    roomId:Number(roomId),
                    message:JSON.stringify(chat)
                }
            })
            GlobalRooms[roomId].map(socket=>{
                 socket.send(JSON.stringify(message)) 
            })
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



