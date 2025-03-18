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
