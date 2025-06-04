'use client'
import { drawing } from '@/app/draw'
import React, { useEffect, useRef, useState } from 'react'

const Canvas = ({roomId,socket}:{roomId:number,socket:WebSocket}) => {


    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(()=>{
        if(canvasRef.current){
        drawing(canvasRef.current,String(roomId), socket)
      }

    },[canvasRef.current])


      



  return (
    <div>
       <canvas ref={canvasRef}  className='bg-white h-screen w-screen'>

        </canvas>
    </div>
  )
}

export default Canvas
