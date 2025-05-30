import Canvas from '@/components/Canvas'
import React, { useEffect, useRef } from 'react'

const page = ({params}:{params:{roomId:number}}) => {
    const roomId = (params).roomId

  

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <Canvas/>
       
    </div>
  )
}

export default page
