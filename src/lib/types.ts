export interface Student {
  registration_number: string;
  name: string;
  program: string;
  section: string;
  profile_image: string;
  dob: string;
  cgpa: string;
  phone: string;
  agg_attendance: string;
  roll_number: string;
}

export interface ChatMessage {
  id?: string;
  name: string;
  message: string;
  reg_no: string;
  time: number; // timestamp
  chatroom: string;
}

export interface AttendanceDetail {
  date: string;
  timing: string;
  type: string;
  attendance: string;
  faculty_name: string;
  block_reason: string;
}

export interface SubjectSummary {
  subject_code: string;
  subject_name: string;
  last_attended: string;
  duty_leaves: string;
  total_attended: string;
  total_delivered: string;
  agg_attendance: string;
  detailed_attendance: AttendanceDetail[];
}

export interface OverallAttendanceDetails {
  total_duty_leaves: string;
  total_lectures_attended: string;
  total_lectures_delivered: string;
  total_agg_attendance: string;
}

export interface AttendanceData {
  summary: SubjectSummary[];
  attendance_details: OverallAttendanceDetails;
  cookie: string;
}


export interface Exam {
  course_code: string;
  course_name: string;
  exam_type: string;
  room_no: string;
  reporting_time: string;
  date: string;
  time: string;
  detainee_status: string;
  defaulter_detail: string;
}

export interface ExamSchedule {
  exams: Exam[];
  cookie: string;
}