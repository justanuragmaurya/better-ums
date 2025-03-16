"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';

function Navbar() {
    const [isAuthenticated , setAuth ] = useState(false);
    const router = useRouter()

    const handleLogut = ()=>{
        localStorage.setItem("cookie","")
        localStorage.setItem("student_details","");
        setAuth(false)
        router.push("/")
    }
    useEffect(()=>{
        if(window.localStorage.getItem("cookie")){
            setAuth(true)
        }
    })
  return (
    <div className='flex py-4 px-5 items-center justify-between border '>
      <div className='text-xl font-black'>Better<span className='bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text'>UMS</span></div>
      <div>{isAuthenticated?<Button onClick={handleLogut}>Logout</Button>:<Button onClick={()=>{router.push("/login")}}>Login</Button>}</div>
    </div>
  )
}

export default Navbar
