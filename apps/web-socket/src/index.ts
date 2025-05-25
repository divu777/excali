import  jwt, { verify }  from 'jsonwebtoken';
import {  WebSocketServer,WebSocket } from "ws";
type Rooms=Record<string,WebSocket[]>
const GlobalRooms:Rooms={}
import "dotenv/config"
import { config } from '@repo/common';
const wss = new WebSocketServer({port:4000});


type MessageType={
    type:"create-room",
    payload:{
        name:string
    }
} | {
    type:"join-room"
}


type jwttype={
    user:string,
    iot?:Number,
    exp?:Number
}


wss.on('connection',(ws,request)=>{
    console.log("user is connected");
    const fullUrl= request.url
    if(!fullUrl){
        return
    }

    const query= new URLSearchParams(fullUrl?.split("?")[1] ?? "")
    const token=query.get("token") ?? ""

    const decoded = jwt.verify(token,config.JWT_SECRET!);

    if(typeof(decoded) === 'string'){
        ws.close()
        return
    }
    

    if(!decoded  || !decoded.user){
         ws.close()
         return
    }






    ws.on('message',(data)=>{
        console.log("message from user "+ data);
            
        const message:MessageType=JSON.parse(data.toString());

        if(message.type=="create-room"){
            const {name}=message.payload

            if(GlobalRooms[name]){
                ws.send("Room Already Exist");
            }else{
                GlobalRooms[name]=[ws];
            }
        }else{

        }

    })

})



