'use client'

import { useEffect, useState } from "react"
import { useSocket } from "../hooks/useSocket"



const ChatRoomClient = ({messages,roomId}:{messages:{message:string,roomId:number,}[],roomId:number}) => {
    const {ws,loading} = useSocket()
    const [ chats,setChats] = useState(messages)
    useEffect(()=>{
        if(ws && !loading){
            ws.onmessage=(event)=>{
                const data= JSON.parse(event.data);

                if(data.type==="chat"){
                    setChats((prev)=>[
                        ...prev,
                        {
                            message:data.payload.message,
                            roomId:roomId
                        }
                ])
                }
            }
        }


    },[ws,loading])
  return (
    <div>
    
    </div>
  )
}

export default ChatRoomClient
