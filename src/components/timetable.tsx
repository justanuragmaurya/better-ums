"use client"
import { Data, Student } from '@/lib/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

function Timetable() {
    const [sdata, setSdata] = useState<Student | null>(null);
    const [timetableData, setTTdata] = useState<Data | null>(null);
    const [password, setPass] = useState("");
    const [cookie, setCookie] = useState("");
    const [loading, setLoading] = useState(true);
  
    const getAttendance = async () => {
      setLoading(true);
      if (!sdata || !password || !cookie) {
        return;
      }
      const response = await axios.post("/api/get-timetable", {
        reg_no: sdata.registration_number,
        password: password,
        cookie: cookie,
      });
      setTTdata(response.data);
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

    const timeSlots = [
      "09-10 AM", "10-11 AM", "11-12 AM", "12-01 PM", 
      "01-02 PM", "02-03 PM", "03-04 PM", "04-05 PM"
    ];
    
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const getClassInfo = (slot: string) => {
      if (!slot) return null;
      const parts = slot.split(' / ');
      const type = parts[0]; //l or t or p
      
      let group = "", course = "", room = "", section = "";
      
      parts.forEach(part => {
        if (part.startsWith("G:")) group = part.substring(2);
        else if (part.startsWith("C:")) course = part.substring(2);
        else if (part.startsWith("R:")) room = part.substring(2);
        else if (part.startsWith("S:")) section = part.substring(2);
      });
      
      return { type, group, course, room, section };
    };
    
    const getCourseColor = (courseCode: string) => {
      // Generate a consistent color for each course - dark mode compatible
      const colors = [
        "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100", 
        "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100", 
        "bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100", 
        "bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100", 
        "bg-pink-100 text-pink-900 dark:bg-pink-900 dark:text-pink-100", 
        "bg-indigo-100 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-100",
        "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100", 
        "bg-orange-100 text-orange-900 dark:bg-orange-900 dark:text-orange-100", 
        "bg-teal-100 text-teal-900 dark:bg-teal-900 dark:text-teal-100"
      ];
      
      const courseMap: {[key: string]: string} = {};
      
      if (timetableData?.faculty_details) {
        const courses = Object.keys(timetableData.faculty_details);
        courses.forEach((course, index) => {
          courseMap[course] = colors[index % colors.length];
        });
      }
      
      return courseMap[courseCode] || "bg-muted";
    };
    
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle>Timetable</CardTitle>
          {!loading && timetableData && (
            <p className="text-sm text-muted-foreground">
              Section: {timetableData.section} | Last updated: {timetableData.last_updated}
            </p>
          )}
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : !timetableData ? (
            <div className="flex justify-center items-center h-32 text-muted-foreground">
              No timetable data available
            </div>
          ) : (
            <div className="space-y-6">
              <div className="overflow-x-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="sticky left-0 bg-background z-10 w-24">Time</TableHead>
                      {days.map((day) => (
                        <TableHead key={day} className="min-w-[150px]">{day}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeSlots.map((time) => (
                      <TableRow key={time}>
                        <TableCell className="font-medium sticky left-0 bg-background z-10">{time}</TableCell>
                        {days.map((day) => {
                          const classInfo = timetableData?.time_table?.[day]?.[time] 
                            ? getClassInfo(timetableData.time_table[day][time])
                            : null;
                            
                          return (
                            <TableCell 
                              key={`${day}-${time}`} 
                              className={`text-sm ${classInfo ? getCourseColor(classInfo.course) + "" : " "}`}
                            >
                              {classInfo ? (
                                <div className=" p-1">
                                  <div className="font-medium">{classInfo.course}</div>
                                  <div>{classInfo.type}</div>
                                  {classInfo.room && <div className="text-xs">Room: {classInfo.room}</div>}
                                  {classInfo.group !== "All" && classInfo.group && (
                                    <div className="text-xs">Group: {classInfo.group}</div>
                                  )}
                                </div>
                              ) : null}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {timetableData?.faculty_details && 
                  Object.entries(timetableData.faculty_details).map(([courseCode, details]) => (
                    <Card 
                      key={courseCode} 
                      className={`${getCourseColor(courseCode)} border-none shadow-sm`}
                    >
                      <CardContent className="p-4">
                        <div className="font-bold">{courseCode}</div>
                        <div className="text-sm font-medium">{details.course_title}</div>
                        <div className="text-xs mt-2 space-y-1">
                          <p>Faculty: {details.faculty_name}</p>
                          <p>Cabin: {details.cabin}</p>
                          <p>Credits: {details.credits} (L:{details.lectures} T:{details.tutorials} P:{details.practical})</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
              
              <div className="text-xs text-muted-foreground mt-4">
                <p>Legend: C: Course Code, F: Faculty, G: Group, R: Room, S: Section</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
}

export default Timetable