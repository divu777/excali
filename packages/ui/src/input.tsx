import React from 'react'

const input = ({label ,value, onchange}:{label:string,value:string, onchange:()=>void}) => {
  return (
    <div >
      <label>
        {label}
      </label>
      <input type="text" value={value} onChange={onchange} />
    </div>
  )
}

export default input
