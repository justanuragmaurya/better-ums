"use client"
import { Student } from '@/lib/types';
import React, { useEffect, useState } from 'react'
import Chat from "@/components/chat";

function ProgrammeChat() {
  const [data,setData] = useState<Student|null>(null)

  useEffect(()=>{
    const studentData = localStorage.getItem("student_details");
    if (studentData) {
      setData(JSON.parse(studentData));
    }
  },[])

  if (!data?.program) return null;

  return <Chat chatroom={data.program} title="Programme" userData={data} />;
}

export default ProgrammeChat