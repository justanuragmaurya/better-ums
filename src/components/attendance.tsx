"use client";
import React, { useEffect, useState } from "react";
import { AttendanceData, Student } from "@/lib/types";
import { AlertTriangle, BookOpen, Calendar, Clock, Loader2, Percent, Award, Info } from "lucide-react";
import axios from "axios";
import { Button } from "./ui/button";
import Link from "next/link";

function Attendance() {
  const [sdata, setSdata] = useState<Student | null>(null);
  const [AttendanceData, setAdata] = useState<AttendanceData | null>(null);
  const [password, setPass] = useState("");
  const [cookie, setCookie] = useState("");
  const [loading, setLoading] = useState(true);

  const getAttendance = async () => {
    setLoading(true);
    if (!sdata || !password || !cookie){
      return;
    }
    const response = await axios.post("/api/get-attendance", {
      reg_no: sdata.registration_number,
      password: password,
      cookie: cookie,
    });
    setAdata(response.data);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4 md:p-6 h-48 rounded-md bg-secondary border shadow-sm my-5">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-orange-400" />
          <span>Loading attendance data...</span>
        </div>
      </div>
    );
  }

  const getAttendanceStatusDetails = (percentage: number) => {
    if (percentage >= 85) {
      return {
        color: "text-green-500",
        borderColor: "border-green-500",
        bgColor: "bg-green-50 dark:bg-green-950/30",
        icon: <Award className="h-4 w-4" />,
      };
    } else if (percentage >= 75) {
      return {
        color: "text-yellow-500",
        borderColor: "border-yellow-500",
        bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
        icon: <Info className="h-4 w-4" />,

      };
    } else {
      return {
        color: "text-red-500",
        borderColor: "border-red-500", 
        bgColor: "bg-red-50 dark:bg-red-950/30",
        icon: <AlertTriangle className="h-4 w-4" />,
      };
    }
  };

  return (
    <div className="p-4 md:p-6 border rounded-md shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-orange-400" />
          <h1 className="text-2xl font-black">Attendance</h1>
        </div>
        <div>
          <Link href={"/timetable"}>
          <Button className="shadow">View Timetable</Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {AttendanceData?.summary.map((e, index) => {
          const percentage = parseInt(e.agg_attendance);
          const status = getAttendanceStatusDetails(percentage);
          
          return (
            <div 
              key={index} 
              className="flex flex-col gap-3 border rounded-md p-4 hover:border-orange-300 transition-colors bg-white/50 dark:bg-gray-950/50"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">{e.subject_code}</span>
                  <h2 className="font-bold text-base">{e.subject_name}</h2>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`flex flex-col items-center justify-center rounded-full h-16 w-16 ${status.borderColor} border-2 ${status.bgColor}`}>
                    <div className="flex items-center">
                      <span className={`text-lg font-bold ${status.color}`}>{e.agg_attendance}</span>
                      <Percent className={`h-3 w-3 ${status.color}`} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 mt-1">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-orange-400" />
                  <span className="text-gray-600">Last attended:</span>
                  <span className="font-medium">{e.last_attended}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-orange-400" />
                  <span className="text-gray-600">Duty Leaves:</span>
                  <span className="font-medium">{e.duty_leaves}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Attendance;