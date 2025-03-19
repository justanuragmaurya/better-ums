"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Student } from "@/lib/types";
import { 
  User, 
  IdCard, 
  Users, 
  Phone, 
  GraduationCap, 
  BookOpen,
  Clock,
  Calendar
} from "lucide-react";


export default function DetailBanner() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Student|null>(null);

  const getDetails = async (reg_num: string, pass: string, cookiee: string) => {
    if (!localStorage.getItem("student_details")) {
      console.log()
      const response = await axios.post("/api/getDetails", {
        reg_no: reg_num,
        password: pass,
        cookie: cookiee,
      });
      setData(response.data);
      localStorage.setItem("student_details", JSON.stringify(response.data));
    }else{
      setData(JSON.parse(localStorage.getItem("student_details")!))
    }
  };

  useEffect(() => {
    const reg_no = window.localStorage.getItem("reg_no");
    const password = window.localStorage.getItem("pass");
    const cookie = window.localStorage.getItem("cookie");

    console.log({ reg_no, password, cookie });

    getDetails(reg_no!, password!, cookie!);
  }, []);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
      <div className="rounded-lg shadow-md md:p-6 border">
        <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6">
          {/* Profile Image Section */}
          <div className="flex justify-center md:justify-start">
            <img 
              src={`data:image/jpeg;charset=utf-8;base64,${data?.profile_image}`} 
              alt="Profile" 
              className="rounded-md h-[150px] w-[150px] md:h-[200px] md:w-[200px] border"
            />
          </div>

          {/* Details Section */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl mb-6">
              Welcome back, 
              <span className="font-bold bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text ml-2">
                {data?.name}
              </span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Primary Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <IdCard className="w-5 h-5 text-orange-400" />
                  <span className="font-medium">ID:</span> {data?.registration_number}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-400" />
                  <span className="font-medium">Section:</span> {data?.section}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-400" />
                  <span className="font-medium">Roll Number:</span> {data?.roll_number}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-orange-400" />
                  <span className="font-medium">Phone:</span> {data?.phone?.split(":")[0]}
                </div>
              </div>

              {/* Secondary Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-orange-400" />
                  <span className="font-medium">CGPA:</span> {data?.cgpa}
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-orange-400" />
                  <span className="font-medium">Program:</span> {data?.program}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-400" />
                  <span className="font-medium">Attendance:</span> {data?.agg_attendance}
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-400" />
                  <span className="font-medium">DOB:</span> {formatDate(data?.dob)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
