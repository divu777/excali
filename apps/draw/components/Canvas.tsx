"use client"
import { drawing } from '@/app/draw'
import React, { useEffect, useRef, useState } from 'react'

const Canvas = ({roomId}:{roomId:number}) => {
        const canvasRef = useRef<HTMLCanvasElement>(null)
        const [socket,setSocket] = useState<WebSocket | null >()

    useEffect(()=>{

      const ws = new WebSocket("ws://localhost:4000")


      ws.onopen=()=>{
        setSocket(ws)

      }

      ws.onclose=()=>{
        setSocket(null)
      }

      if(canvasRef.current){
        drawing(canvasRef.current,String(roomId))
      }



        

    },[canvasRef])

  return (
    <div>
         <canvas ref={canvasRef}  className='bg-white h-screen w-screen'>

        </canvas>
      
    </div>
  )
}

export default Canvas


