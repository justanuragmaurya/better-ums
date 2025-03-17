"use client";
import { Student } from "@/lib/types";
import React, { useEffect, useState } from "react";
import Chat from "@/components/chat";

function LPUChat() {
  const [data, setData] = useState<Student | null>(null);

  useEffect(() => {
    const studentData = localStorage.getItem("student_details");
    if (studentData) {
      setData(JSON.parse(studentData));
    }
  }, []);

  if (!data) return null;

  return <Chat chatroom="LPU" title="LPU Chat" userData={data} />;
}

export default LPUChat;
