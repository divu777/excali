"use client"
import React, { useEffect, useState } from 'react'
import Canvas from './Canvas'

const MainCanvas = ({roomId}:{roomId:number}) => {
         const [socket,setSocket] = useState<WebSocket | null >()

      useEffect(()=>{

      const ws = new WebSocket("ws://localhost:4000?token=")

      ws.onopen=()=>{
        setSocket(ws)
        ws.send(JSON.stringify({
      "type":"join-room",
      "payload":{
        "roomId":roomId
      }
    }))
      }


      ws.onclose=()=>{
        setSocket(null)
      }
    }
      ,[])


      if(!socket){
        return <div>
          connecting to web socket server ....
        </div>
      }
     

  return (
    <div>

      <Canvas roomId={roomId} socket={socket}/>
        
      
    </div>
  )
}

export default MainCanvas


