"use client"
import { Student } from '@/lib/types';
import React, { useEffect, useState } from 'react'

function ProgrammeChat() {
  const [data,setData] = useState<Student|null>(null)
  const [chats,setChat]=useState("");

  useEffect(()=>{
    setData(JSON.parse(localStorage.getItem("student_details")!))
  },[])

  return (
    <div>
      <h1 className='text-2xl'>Programme: <span className='font-bold'> {data?.program}</span></h1>
    </div>
  )
}

export default ProgrammeChat