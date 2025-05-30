"use client"
import React, { useEffect, useRef, useState } from 'react'

const Canvas = () => {
        const canvasRef = useRef<HTMLCanvasElement>(null)
        const [cordX,setCordX] = useState(0);
        const [cordY,setCordY] = useState(0);
        const [width,setWidth] = useState(0);
        const [height,setHeight] = useState(0)

    useEffect(()=>{

        if(canvasRef.current){
            const canvas = canvasRef.current
            const ctx= canvas.getContext("2d");

            if(!ctx){
                return
            }

            canvas.addEventListener('mousedown',(e)=>{
                
            })

            canvas.addEventListener('mouseup',(e)=>{

            })
            ctx.strokeRect(cordX,cordY,width,height)
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
