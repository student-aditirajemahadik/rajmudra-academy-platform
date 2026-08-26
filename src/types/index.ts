export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  studentId: string; // e.g. RMA-STU-2026-001
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  bloodGroup?: string;
  category?: string; // Open, OBC, EWS, SC, ST, etc.
  address: {
    street: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
  };
  guardian: {
    name: string;
    relation: string;
    phone: string;
    occupation: string;
  };
  education: {
    qualification: string;
    passingYear: string;
    percentage: string;
    college: string;
  };
  avatar: string;
  enrolledCourseIds: string[];
  enrolledBatchIds: string[];
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  joinedDate: string;
}

export interface TeacherProfile {
  id: string;
  userId: string;
  teacherId: string; // e.g. RMA-FAC-01
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  qualification: string;
  experienceYears: number;
  bio: string;
  avatar: string;
  assignedCourseIds: string[];
  assignedBatchIds: string[];
  status: 'ACTIVE' | 'INACTIVE';
  achievements?: string[];
}

export interface Course {
  id: string;
  name: string;
  slug: string;
  category: 'POLICE_BHARTI' | 'MPSC_CIVIL' | 'MPSC_COMBINED' | 'TALATHI_SARALSEVA' | 'BANKING_SSC' | 'DEFENCE_ARMY';
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  durationMonths: number;
  durationText: string;
  fees: number;
  discountedFees?: number;
  eligibility: string[];
  syllabus: {
    moduleTitle: string;
    topics: string[];
    hours: number;
  }[];
  features: string[];
  thumbnail: string;
  isFeatured: boolean;
  isActive: boolean;
  batchCount?: number;
  studentCount?: number;
}

export interface Batch {
  id: string;
  batchCode: string; // e.g. BATCH-PB-2026-A
  name: string;
  courseId: string;
  courseName: string;
  teacherId: string;
  teacherName: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  days: string; // e.g. "Mon to Sat"
  capacity: number;
  enrolledCount: number;
  room: string;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'FULL';
  mode: 'OFFLINE' | 'ONLINE' | 'HYBRID';
}

export interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  batchId: string;
  batchName: string;
  applicationId?: string;
  enrollmentDate: string;
  rollNumber: string;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
}

export type ApplicationStatus = 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'ENROLLED';

export interface ApplicationDocument {
  id: string;
  title: string;
  type: 'PHOTO' | 'ID_PROOF' | 'MARKSHEET_10TH' | 'MARKSHEET_12TH' | 'GRADUATION' | 'CASTE_CERTIFICATE' | 'OTHER';
  fileName: string;
  fileSize: string;
  uploadDate: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  url?: string;
  remarks?: string;
}

export interface Application {
  id: string;
  applicationNumber: string; // e.g. RMA-APP-2026-8492
  studentId?: string;
  userId?: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    category: string;
    address: string;
    city: string;
    district: string;
    pincode: string;
    aadhaarNumber: string;
  };
  guardianInfo: {
    guardianName: string;
    relation: string;
    guardianPhone: string;
    guardianOccupation: string;
  };
  educationInfo: {
    highestQualification: string;
    collegeUniversity: string;
    passingYear: string;
    marksPercentage: string;
  };
  courseSelection: {
    courseId: string;
    courseName: string;
    preferredBatchId?: string;
    preferredBatchName?: string;
    mode: 'OFFLINE' | 'ONLINE' | 'HYBRID';
    hostelRequired: boolean;
    physicalTrainingRequired: boolean;
  };
  documents: ApplicationDocument[];
  status: ApplicationStatus;
  submissionDate: string;
  reviewedDate?: string;
  reviewedBy?: string;
  reviewRemarks?: string;
  assignedBatchId?: string;
  totalFees?: number;
}

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';

export interface AttendanceRecord {
  id: string;
  batchId: string;
  batchName: string;
  date: string; // YYYY-MM-DD
  studentId: string;
  studentName: string;
  status: AttendanceStatus;
  markedByTeacherId: string;
  remarks?: string;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  batchId: string;
  batchName: string;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  dueDate: string;
  status: 'PAID' | 'PARTIALLY_PAID' | 'PENDING' | 'OVERDUE';
  payments: PaymentRecord[];
}

export interface PaymentRecord {
  id: string;
  feeRecordId: string;
  receiptNumber: string; // e.g. RMA-REC-2026-1049
  studentId: string;
  studentName: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'ONLINE_UPI' | 'NET_BANKING' | 'CREDIT_CARD' | 'CASH' | 'CHEQUE';
  transactionId: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  remarks?: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  batchId?: string; // optional if available to all batches of course
  batchName?: string;
  subject: string;
  type: 'PDF' | 'DOCUMENT' | 'VIDEO' | 'TEST_PAPER' | 'ASSIGNMENT';
  fileSize?: string;
  downloadUrl: string;
  uploadedBy: string; // teacher or admin
  uploadedByName: string;
  uploadDate: string;
  downloadsCount: number;
  isPublicForBatch: boolean;
}

export interface Question {
  id: string;
  questionText: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
  marks: number;
  negativeMarks: number;
  subject: string;
}

export interface Test {
  id: string;
  testCode: string; // e.g. TEST-MPSC-01
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  batchId?: string;
  batchName?: string;
  subject: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  startDate: string; // ISO
  endDate: string; // ISO
  status: 'UPCOMING' | 'ACTIVE' | 'EXPIRED' | 'DRAFT';
  questions: Question[];
  totalQuestions: number;
  createdByName: string;
}

export interface TestAttempt {
  id: string;
  testId: string;
  testTitle: string;
  studentId: string;
  studentName: string;
  startTime: string;
  submittedTime: string;
  answers: {
    questionId: string;
    selectedOption: 'A' | 'B' | 'C' | 'D' | null;
    isCorrect: boolean;
    marksObtained: number;
  }[];
  totalMarksObtained: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  percentage: number;
  isPassed: boolean;
  rank?: number;
}

export interface Result {
  id: string;
  attemptId: string;
  testId: string;
  testTitle: string;
  courseName: string;
  studentId: string;
  studentName: string;
  score: number;
  totalMarks: number;
  percentage: number;
  rank: number;
  totalParticipants: number;
  status: 'PASS' | 'FAIL';
  date: string;
  subjectBreakdown: {
    subject: string;
    score: number;
    total: number;
  }[];
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  category: 'EXAM_ALERT' | 'BATCH_SCHEDULE' | 'ADMISSION' | 'HOLIDAY' | 'RESULTS' | 'GENERAL';
  publishDate: string;
  expiryDate?: string;
  targetAudience: 'ALL' | 'STUDENTS' | 'TEACHERS' | 'SPECIFIC_BATCH';
  targetBatchId?: string;
  targetBatchName?: string;
  isPinned: boolean;
  authorName: string;
  attachmentName?: string;
  attachmentSize?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  link?: string;
  createdAt: string;
  isRead: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'EVENTS' | 'SEMINARS' | 'CLASSROOMS' | 'ACHIEVEMENTS' | 'GROUND_TRAINING';
  categoryLabel: string;
  imageUrl: string;
  date: string;
  description: string;
}

export interface Testimonial {
  id: string;
  studentName: string;
  examCleared: string;
  rankOrPost: string;
  courseName: string;
  year: string;
  photoUrl: string;
  review: string;
  rating: number;
  isPublished: boolean;
}

export interface Enquiry {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  courseInterested: string;
  message: string;
  source: string;
  date: string;
  status: 'NEW' | 'CONTACTED' | 'INTERESTED' | 'CONVERTED' | 'NOT_INTERESTED';
  notes?: string;
}

export interface AcademySettings {
  academyName: string;
  tagline: string;
  establishedYear: number;
  logoUrl: string;
  faviconUrl: string;
  phone: string;
  alternatePhone: string;
  email: string;
  admissionEmail: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
  };
  workingHours: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
    telegram: string;
    whatsapp: string;
  };
  admissionsOpen: boolean;
  demoPaymentMode: boolean;
  currency: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  ipAddress: string;
}
