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
    <div className="relative w-screen h-screen">
  {/* Canvas */}
  <canvas ref={canvasRef} className="bg-black w-full h-full" />

  {/* Top Toolbar */}
  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-4 bg-gray-800 bg-opacity-90 px-4 py-2 rounded-md shadow-md border border-gray-700">
    <button
      onClick={() => setSelectedShape("rect")}
      className={`p-2 rounded transition ${
        shape === "rect" ? "bg-gray-700" : "hover:bg-gray-700"
      }`}
      title="Rectangle"
    >
      <Square className="text-white" />
    </button>
    <button
      onClick={() => setSelectedShape("circle")}
      className={`p-2 rounded transition ${
        shape === "circle" ? "bg-gray-700" : "hover:bg-gray-700"
      }`}
      title="Circle"
    >
      <Circle className="text-white" />
    </button>
    <button
      onClick={() => setSelectedShape("line")}
      className={`p-2 rounded transition ${
        shape === "line" ? "bg-gray-700" : "hover:bg-gray-700"
      }`}
      title="Line"
    >
      <Minus className="text-white" />
    </button>
  </div>
</div>

  )
}

export default Canvas
