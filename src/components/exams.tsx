"use client"
import { ExamSchedule, Student } from "@/lib/types";
import axios from "axios";
import { Book, Calendar, Clock, MapPin, Loader2, CalendarClock, BookOpen, Bookmark } from "lucide-react";
import React, { useEffect, useState } from "react";

function Exams() {
  const [sdata, setSdata] = useState<Student | null>(null);
  const [examData, setEdata] = useState<ExamSchedule | null>(null);
  const [password, setPass] = useState("");
  const [cookie, setCookie] = useState("");
  const [loading, setLoading] = useState(true);

  const getAttendance = async () => {
    setLoading(true);
    if (!sdata || !password || !cookie) {
      return;
    }
    const response = await axios.post("api/get-exams", {
      reg_no: sdata.registration_number,
      password: password,
      cookie: cookie,
    });
    setEdata(response.data);
    setLoading(false);
  };

  useEffect(() => {
    const studentData = localStorage.getItem("student_details");
    const pass = localStorage.getItem("pass");
    const cook = localStorage.getItem("cookie");
    if (studentData && pass && cook) {
      setSdata(JSON.parse(studentData));
      setPass(pass);
      setCookie(cook);
    }
  }, []);

  useEffect(() => {
    if (!sdata || !password || !cookie) {
      return;
    }
    getAttendance();
  }, [sdata, password]);

  if(loading){
    return(
      <div className="flex justify-center items-center p-4 md:p-6 h-48 rounded-md bg-secondary border shadow-sm my-5">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-orange-400" />
          <span>Loading exam data...</span>
        </div>
      </div>
    )
  }

  const getExamTypeStyle = (examType: string) => {
    const type = examType.toLowerCase();
    if (type.includes("mid") || type.includes("sessional")) {
      return {
        color: "text-blue-500",
        bgColor: "bg-blue-50 dark:bg-blue-950/30",
        borderColor: "border-blue-500"
      };
    } else if (type.includes("end") || type.includes("final")) {
      return {
        color: "text-purple-500",
        bgColor: "bg-purple-50 dark:bg-purple-950/30",
        borderColor: "border-purple-500"
      };
    } else {
      return {
        color: "text-orange-500",
        bgColor: "bg-orange-50 dark:bg-orange-950/30",
        borderColor: "border-orange-500"
      };
    }
  };

  return (
    <div className="p-4 md:p-6 border rounded-md shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-5 w-5 text-orange-400" />
        <h1 className="text-2xl font-black">Upcoming exams</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-5">
        {examData?.exams.map((exam, index) => {
          const examTypeStyle = getExamTypeStyle(exam.exam_type);
          
          return (
            <div 
              key={index} 
              className="flex flex-col gap-3 border rounded-md p-4 hover:border-orange-300 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">{exam.course_code}</span>
                  <h2 className="font-bold text-lg">{exam.course_name}</h2>
                </div>
              </div>
              
              <h1 className="text-sm">
                  {exam.exam_type}
                </h1>
              <div className="flex flex-col gap-2 mt-1">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-orange-400" />
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{exam.date}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-orange-400" />
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{exam.time}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <CalendarClock className="h-4 w-4 text-orange-400" />
                  <span className="text-gray-600">Reporting Time:</span>
                  <span className="font-medium">{exam.reporting_time}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-orange-400" />
                  <span className="text-gray-600">Room:</span>
                  <span className="font-medium">{exam.room_no?exam.room_no:"not yet declared"}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {examData?.exams.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <Bookmark className="h-12 w-12 mx-auto mb-2 text-gray-300" />
          <p>No exams scheduled at the moment</p>
        </div>
      )}
    </div>
  );
}

export default Exams;
