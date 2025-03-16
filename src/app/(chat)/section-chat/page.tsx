"use client"
import { Student } from '@/lib/types'
import React, { useEffect, useState } from 'react'

function SectionChat() {
  const [data,setData] = useState<Student|null>(null)
  const [chats,setChat]=useState("");

  useEffect(()=>{
    setData(JSON.parse(localStorage.getItem("student_details")!))
  },[])

  return (
    <div className='flex-col'>
      <h1 className="text-2xl">Section : <span className='font-bold'> {data?.section}</span></h1>
    </div>
  )
}

export default SectionChat