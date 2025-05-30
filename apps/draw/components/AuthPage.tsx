'use client'

import { useState } from "react"


const AuthPage = ({SignIn}:{SignIn:boolean}) => {

  const [email,setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [username,setUsername]= useState("")
  return (
    <div className='flex w-screen h-screen justify-center items-center text-white '>
      <div className='h-auto w-96 py-7 px-5 rounded-xl border-2 border-white flex flex-col'>
        <div className=" py-5 flex flex-col gap-5">
          {SignIn && <div className="flex flex-col  gap-4  ">
          <label>Enter username</label>
        <input type="text" placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)}
        className="px-3 py-3 border-white border-2 rounded-xl"/>
        </div>}
        <div className="flex flex-col  gap-4 ">
          <label>Enter email</label>
        <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}
        className="px-3 py-3 border-white border-2 rounded-xl"/>
        </div>
         <div className="flex flex-col  gap-4">
          <label>Enter password</label>
        <input type="text" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}
        className="px-3 py-3 border-white border-2 rounded-xl"/>
        </div>

        </div>
        
        <div className=" flex items-center justify-center">
 <button className=" border-2 border-white rounded-4xl w-2/5 h-12 hover:bg-white hover:border-black hover:text-black transition" onClick={()=>{

        }}>
          {SignIn ? "Sign In":"Sign Up" }
        </button>
        </div>
       

      </div>
    </div>
  )
}

export default AuthPage


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGl2YWthciIsImVtYWlsIjoiZGl2YWthcmphaXN3YWw3Nzc3QGdtYWlsLmNvbSIsImRhdGUiOiIyMDI1LTA1LTI5IDEzOjU0OjE3In0.iQmcps7vEU1W0mF4iAEMHM1Vb2fR5PwVkO6ulJYlgjc