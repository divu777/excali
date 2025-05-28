'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";




export default function Home() {
  const [roomName,setroomName] = useState("")
  const router = useRouter()
  return (
   <div>
    hello

    <input type="text" placeholder="roomName" onChange={(e)=>setroomName(e.target.value)} />
    <button onSubmit={async()=>{

     router.push(`/room/${roomName}`)
    }}>Join Room </button>
   </div>
  );
}
