import axios from 'axios'
import React from 'react'


const getRoom=async(roomName:string)=>{
    const result= await axios.get(`${process.env.BACKEND_URL}/api/v1/room/roomName/${roomName}`)
    return result.data.roomId
}

const page = async({params}:{
    params:{
        roomName:string
    }
}) => {

    let {roomName} = params

    const roomId=await getRoom(roomName)
  return (
    
    <div>

        room ahgya bhai kei + {roomId} + {roomName}
      
    </div>
  )
}

export default page
