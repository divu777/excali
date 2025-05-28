import axios from "axios"


const getLatestChat=async(roomId:number)=>{
    const result = await axios.get(`${process.env.BACKEND_URL}/api/v1/room/chats/${roomId}`)

return result.data.messages
}


const ChatRoom = async({params}:{
    params:Promise<{id:number}>
}
) => {
        const id = (await params).id;

    const messages =await getLatestChat(id);


  return (

    <div>
        
{
    messages.map((msg:any)=>{
        return <div>
            {msg.message},
            
        </div>
    })
}
    </div>
  )
}

export default ChatRoom
