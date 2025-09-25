
import { User, UserRole, Internship, MentoringRequest, ChatMessage, CounsellingSlot } from '../types';
import { subDays, addDays, setHours, setMinutes } from 'date-fns';

export const users: User[] = [
  {
    id: 'senior1',
    role: UserRole.SENIOR,
    fullName: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '9876543210',
    currentResidence: 'Bengaluru',
    profilePicture: 'https://picsum.photos/seed/senior1/200',
    company: 'Innovate Inc.',
    position: 'Senior Software Engineer',
    experience: 8,
    expertise: ['React', 'Node.js', 'System Design', 'Cloud Architecture']
  },
  {
    id: 'senior2',
    role: UserRole.SENIOR,
    fullName: 'Rohan Verma',
    email: 'rohan.verma@example.com',
    phone: '9876543211',
    currentResidence: 'Pune',
    profilePicture: 'https://picsum.photos/seed/senior2/200',
    company: 'DataDriven Corp.',
    position: 'Data Scientist',
    experience: 6,
    expertise: ['Python', 'Machine Learning', 'Big Data', 'SQL']
  },
  {
    id: 'senior3',
    role: UserRole.SENIOR,
    fullName: 'Priya Mehta',
    email: 'priya.mehta@example.com',
    phone: '9876543212',
    currentResidence: 'Mumbai',
    profilePicture: 'https://picsum.photos/seed/senior3/200',
    company: 'MarketPro',
    position: 'Marketing Manager',
    experience: 10,
    expertise: ['Digital Marketing', 'Brand Strategy', 'SEO', 'Content Creation']
  },
  {
    id: 'junior1',
    role: UserRole.JUNIOR,
    fullName: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    phone: '8765432109',
    currentResidence: 'Delhi',
    profilePicture: 'https://picsum.photos/seed/junior1/200',
    course: 'B.Tech',
    currentYear: '3rd'
  },
  {
    id: 'junior2',
    role: UserRole.JUNIOR,
    fullName: 'Sneha Patel',
    email: 'sneha.patel@example.com',
    phone: '8765432108',
    currentResidence: 'Ahmedabad',
    profilePicture: 'https://picsum.photos/seed/junior2/200',
    course: 'MBA',
    currentYear: 'Final'
  },
  {
    id: 'junior3',
    role: UserRole.JUNIOR,
    fullName: 'Amit Kumar',
    email: 'amit.kumar@example.com',
    phone: '8765432107',
    currentResidence: 'Kolkata',
    profilePicture: 'https://picsum.photos/seed/junior3/200',
    course: 'BBA',
    currentYear: '2nd'
  }
];

export const internships: Internship[] = [
  {
    id: 'int1',
    title: 'Frontend Developer Intern',
    company: 'Innovate Inc.',
    location: 'Remote',
    branch: 'B.Tech',
    type: 'Internship',
    duration: '3 Months',
    stipend: '₹25,000/month',
    description: 'Work on our flagship React-based web application. You will learn about modern frontend technologies and agile development practices.',
    requirements: ['HTML, CSS, JavaScript', 'React', 'Git'],
    postedById: 'senior1',
    postedDate: subDays(new Date(), 10).toISOString(),
    applications: 12,
    deadline: addDays(new Date(), 20).toISOString()
  },
  {
    id: 'int2',
    title: 'Data Science Intern',
    company: 'DataDriven Corp.',
    location: 'Pune',
    branch: 'B.Tech',
    type: 'Internship',
    duration: '6 Months',
    stipend: '₹30,000/month',
    description: 'Analyze large datasets to extract meaningful insights. Work with Python, Pandas, and Scikit-learn.',
    requirements: ['Python', 'SQL', 'Statistics', 'Machine Learning Concepts'],
    postedById: 'senior2',
    postedDate: subDays(new Date(), 5).toISOString(),
    applications: 8,
    deadline: addDays(new Date(), 25).toISOString()
  },
  {
    id: 'int3',
    title: 'Marketing Intern',
    company: 'MarketPro',
    location: 'Mumbai',
    branch: 'BBA',
    type: 'Internship',
    duration: '4 Months',
    stipend: '₹15,000/month',
    description: 'Assist in creating and implementing digital marketing campaigns. Manage social media channels and analyze campaign performance.',
    requirements: ['Good Communication Skills', 'Social Media Savvy', 'Basic SEO Knowledge'],
    postedById: 'senior3',
    postedDate: subDays(new Date(), 2).toISOString(),
    applications: 25,
    deadline: addDays(new Date(), 15).toISOString()
  },
  {
    id: 'int4',
    title: 'Full Stack Developer',
    company: 'Innovate Inc.',
    location: 'Bengaluru',
    branch: 'B.Tech',
    type: 'Job',
    duration: 'Full-time',
    stipend: 'Competitive Salary',
    description: 'Join our core engineering team to build and scale our products. We are looking for passionate developers with a knack for problem-solving.',
    requirements: ['React', 'Node.js', 'MongoDB', 'AWS', '3+ years experience'],
    postedById: 'senior1',
    postedDate: subDays(new Date(), 30).toISOString(),
    applications: 42,
    deadline: addDays(new Date(), 30).toISOString()
  }
];

export const mentoringRequests: MentoringRequest[] = [
  {
    id: 'mr1',
    juniorId: 'junior1',
    seniorId: 'senior1',
    sessionType: 'Technical',
    subject: 'React Project Guidance',
    description: 'I am working on a personal project with React and facing some issues with state management. Would love to get your guidance.',
    preferredDate: addDays(new Date(), 7).toISOString(),
    duration: 60,
    status: 'Accepted'
  },
  {
    id: 'mr2',
    juniorId: 'junior2',
    seniorId: 'senior3',
    sessionType: 'Career',
    subject: 'Career Path in Marketing',
    description: 'I am about to graduate and would like to understand the different career paths in digital marketing.',
    preferredDate: addDays(new Date(), 10).toISOString(),
    duration: 45,
    status: 'Pending'
  },
  {
    id: 'mr3',
    juniorId: 'junior1',
    seniorId: 'senior2',
    sessionType: 'Career',
    subject: 'Transitioning to Data Science',
    description: 'I am a B.Tech student and interested in a career in Data Science. Can you help me with a roadmap?',
    preferredDate: addDays(new Date(), 5).toISOString(),
    duration: 60,
    status: 'Completed'
  }
];

export const chatMessages: ChatMessage[] = [
  { id: 'msg1', senderId: 'junior1', receiverId: 'senior1', text: 'Hello Ananya Ma\'am, I saw the internship posting. I have a few questions.', timestamp: subDays(new Date(), 1).toISOString(), read: true },
  { id: 'msg2', senderId: 'senior1', receiverId: 'junior1', text: 'Hi Vikram, sure. Feel free to ask.', timestamp: subDays(new Date(), 1).toISOString(), read: true },
  { id: 'msg3', senderId: 'junior1', receiverId: 'senior1', text: 'Is there a possibility for a PPO based on performance?', timestamp: subDays(new Date(), 1).toISOString(), read: false },
  { id: 'msg4', senderId: 'junior2', receiverId: 'senior3', text: 'Hi Priya, I\'m really interested in your company\'s work culture.', timestamp: subDays(new Date(), 2).toISOString(), read: true },
  { id: 'msg5', senderId: 'senior3', receiverId: 'junior2', text: 'Hello Sneha, we have a great collaborative environment. You can read more on our website!', timestamp: subDays(new Date(), 2).toISOString(), read: true },
];

export const counsellingSlots: CounsellingSlot[] = [
  { id: 'cs1', counselorName: 'Dr. Mehra', counselorSpecialty: 'Stress & Anxiety', startTime: setMinutes(setHours(addDays(new Date(), 2), 10), 0), endTime: setMinutes(setHours(addDays(new Date(), 2), 10), 50), isBooked: false },
  { id: 'cs2', counselorName: 'Dr. Mehra', counselorSpecialty: 'Stress & Anxiety', startTime: setMinutes(setHours(addDays(new Date(), 2), 11), 0), endTime: setMinutes(setHours(addDays(new Date(), 2), 11), 50), isBooked: true },
  { id: 'cs3', counselorName: 'Dr. Gupta', counselorSpecialty: 'Career Counselling', startTime: setMinutes(setHours(addDays(new Date(), 2), 14), 0), endTime: setMinutes(setHours(addDays(new Date(), 2), 14), 50), isBooked: false },
  { id: 'cs4', counselorName: 'Dr. Gupta', counselorSpecialty: 'Career Counselling', startTime: setMinutes(setHours(addDays(new Date(), 3), 10), 0), endTime: setMinutes(setHours(addDays(new Date(), 3), 10), 50), isBooked: false },
  { id: 'cs5', counselorName: 'Dr. Khan', counselorSpecialty: 'Relationships', startTime: setMinutes(setHours(addDays(new Date(), 3), 16), 0), endTime: setMinutes(setHours(addDays(new Date(), 3), 16), 50), isBooked: false },
];
