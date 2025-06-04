import MainCanvas from '@/components/MainCanvas'
import React, { useEffect, useRef } from 'react'

const  page = async({params}:{params:Promise<{roomId:number}>}) => {
    const roomId = (await params).roomId

  

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <MainCanvas roomId={roomId}/>
       
    </div>
  )
}

export default page
