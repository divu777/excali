'use client'
import { drawing } from '@/app/draw'
import { Game } from '@/app/draw/Game'
import { ArrowUpRight, Circle, Minus, Square } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

const Canvas = ({roomId,socket}:{roomId:number,socket:WebSocket}) => {
  const [game,setGame] = useState<Game>()
    const [ shape , setSelectedShape] = useState < "rect" | "circle" | "line" > ("rect")
    const canvasRef = useRef<HTMLCanvasElement>(null)


    useEffect(()=>{
    
          
            game?.changeShape(shape)
          
      
    },[shape,game])

    useEffect(()=>{
        if(canvasRef.current){
        //drawing(canvasRef.current,String(roomId), socket,shape)
        const g= new Game(canvasRef.current,roomId,socket)
        setGame(g)

        return ()=>{
        g.removeEventHandlers()
      }
      }
      

      

    },[canvasRef])


      



  return (
    <div>
       <canvas ref={canvasRef}  className='bg-white h-screen w-screen'>
         
        </canvas>
         <div className='absolute  top-1/2 left-5 flex flex-col items-center gap-5 justify-center z-10 bg-amber-700'>
            <div onClick={(e)=>setSelectedShape("rect")}><Square /></div>
            <div onClick={(e)=>setSelectedShape("circle")}><Circle/></div>
            <div onClick={(e)=>setSelectedShape("line")}><Minus/></div>
  
          </div>
    </div>
  )
}

export default Canvas
