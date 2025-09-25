
export enum UserRole {
  JUNIOR = 'junior',
  SENIOR = 'senior',
}

export interface User {
  id: string;
  role: UserRole;
  fullName: string;
  email: string;
  phone: string;
  currentResidence: string;
  profilePicture: string;
  // Senior-specific
  company?: string;
  position?: string;
  experience?: number;
  expertise?: string[];
  // Junior-specific
  course?: 'B.Tech' | 'BBA' | 'MBA';
  currentYear?: '1st' | '2nd' | '3rd' | '4th' | 'Final';
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  branch: 'B.Tech' | 'BBA' | 'MBA' | 'Any';
  type: 'Internship' | 'Job';
  duration: string;
  stipend: string;
  description: string;
  requirements: string[];
  postedById: string;
  postedDate: string;
  applications: number;
  deadline: string;
}

export interface MentoringRequest {
  id: string;
  juniorId: string;
  seniorId: string;
  sessionType: 'Career' | 'Technical' | 'Academic' | 'Personal';
  subject: string;
  description: string;
  preferredDate: string;
  duration: number; // in minutes
  status: 'Pending' | 'Accepted' | 'Completed' | 'Cancelled';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface CounsellingSlot {
  id: string;
  counselorName: string;
  counselorSpecialty: string;
  startTime: Date;
  endTime: Date;
  isBooked: boolean;
}
