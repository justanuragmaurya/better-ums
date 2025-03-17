"use client";
import { Student } from "@/lib/types";
import React, { useEffect, useState } from "react";
import Chat from "@/components/chat";

function SectionChat() {
  const [data, setData] = useState<Student | null>(null);

  useEffect(() => {
    const studentData = localStorage.getItem("student_details");
    if (studentData) {
      setData(JSON.parse(studentData));
    }
  }, []);

  if (!data?.section) return null;

  return <Chat chatroom={data.section} title="Section" userData={data} />;
}

export default SectionChat;
