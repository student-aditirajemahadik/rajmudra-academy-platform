import {
  User,
  StudentProfile,
  TeacherProfile,
  Course,
  Batch,
  Enrollment,
  Application,
  AttendanceRecord,
  FeeRecord,
  PaymentRecord,
  StudyMaterial,
  Test,
  TestAttempt,
  Result,
  Notice,
  NotificationItem,
  GalleryItem,
  Testimonial,
  Enquiry,
  AcademySettings,
  AuditLog,
} from '../types';

import {
  INITIAL_USERS,
  INITIAL_TEACHERS,
  INITIAL_STUDENTS,
  INITIAL_COURSES,
  INITIAL_BATCHES,
  INITIAL_ENROLLMENTS,
  INITIAL_APPLICATIONS,
  INITIAL_ATTENDANCE,
  INITIAL_FEES,
  INITIAL_STUDY_MATERIALS,
  INITIAL_TESTS,
  INITIAL_RESULTS,
  INITIAL_NOTICES,
  INITIAL_NOTIFICATIONS,
  INITIAL_GALLERY,
  INITIAL_TESTIMONIALS,
  INITIAL_ENQUIRIES,
  INITIAL_SETTINGS,
  INITIAL_AUDIT_LOGS,
} from '../data/initialData';

const STORAGE_KEYS = {
  USERS: 'rma_users',
  STUDENTS: 'rma_students',
  TEACHERS: 'rma_teachers',
  COURSES: 'rma_courses',
  BATCHES: 'rma_batches',
  ENROLLMENTS: 'rma_enrollments',
  APPLICATIONS: 'rma_applications',
  ATTENDANCE: 'rma_attendance',
  FEES: 'rma_fees',
  STUDY_MATERIALS: 'rma_study_materials',
  TESTS: 'rma_tests',
  TEST_ATTEMPTS: 'rma_test_attempts',
  RESULTS: 'rma_results',
  NOTICES: 'rma_notices',
  NOTIFICATIONS: 'rma_notifications',
  GALLERY: 'rma_gallery',
  TESTIMONIALS: 'rma_testimonials',
  ENQUIRIES: 'rma_enquiries',
  SETTINGS: 'rma_settings',
  AUDIT_LOGS: 'rma_audit_logs',
  SESSION: 'rma_session_user',
  APPLICATION_DRAFT: 'rma_application_draft',
};

// Generic storage helper
function getStoredItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return defaultValue;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage`, error);
  }
}

export const db = {
  // Initialize default data if not already present
  initialize: () => {
    getStoredItem(STORAGE_KEYS.USERS, INITIAL_USERS);
    getStoredItem(STORAGE_KEYS.TEACHERS, INITIAL_TEACHERS);
    getStoredItem(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
    getStoredItem(STORAGE_KEYS.COURSES, INITIAL_COURSES);
    getStoredItem(STORAGE_KEYS.BATCHES, INITIAL_BATCHES);
    getStoredItem(STORAGE_KEYS.ENROLLMENTS, INITIAL_ENROLLMENTS);
    getStoredItem(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
    getStoredItem(STORAGE_KEYS.ATTENDANCE, INITIAL_ATTENDANCE);
    getStoredItem(STORAGE_KEYS.FEES, INITIAL_FEES);
    getStoredItem(STORAGE_KEYS.STUDY_MATERIALS, INITIAL_STUDY_MATERIALS);
    getStoredItem(STORAGE_KEYS.TESTS, INITIAL_TESTS);
    getStoredItem(STORAGE_KEYS.TEST_ATTEMPTS, [] as TestAttempt[]);
    getStoredItem(STORAGE_KEYS.RESULTS, INITIAL_RESULTS);
    getStoredItem(STORAGE_KEYS.NOTICES, INITIAL_NOTICES);
    getStoredItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    getStoredItem(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
    getStoredItem(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS);
    getStoredItem(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
    getStoredItem(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    getStoredItem(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  },

  // Reset to initial demo data
  resetToDefaults: () => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(INITIAL_TEACHERS));
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
    localStorage.setItem(STORAGE_KEYS.BATCHES, JSON.stringify(INITIAL_BATCHES));
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(INITIAL_ENROLLMENTS));
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(INITIAL_ATTENDANCE));
    localStorage.setItem(STORAGE_KEYS.FEES, JSON.stringify(INITIAL_FEES));
    localStorage.setItem(STORAGE_KEYS.STUDY_MATERIALS, JSON.stringify(INITIAL_STUDY_MATERIALS));
    localStorage.setItem(STORAGE_KEYS.TESTS, JSON.stringify(INITIAL_TESTS));
    localStorage.setItem(STORAGE_KEYS.TEST_ATTEMPTS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(INITIAL_RESULTS));
    localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(INITIAL_NOTICES));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY));
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(INITIAL_TESTIMONIALS));
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(INITIAL_ENQUIRIES));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(INITIAL_AUDIT_LOGS));
  },

  // Users & Auth
  getUsers: (): User[] => getStoredItem(STORAGE_KEYS.USERS, INITIAL_USERS),
  getUserById: (id: string): User | undefined => db.getUsers().find(u => u.id === id),
  getUserByEmail: (email: string): User | undefined => db.getUsers().find(u => u.email.toLowerCase() === email.toLowerCase()),
  
  // Students
  getStudents: (): StudentProfile[] => getStoredItem(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS),
  getStudentById: (id: string): StudentProfile | undefined => db.getStudents().find(s => s.id === id || s.userId === id),
  saveStudent: (student: StudentProfile): void => {
    const list = db.getStudents();
    const idx = list.findIndex(s => s.id === student.id);
    if (idx >= 0) {
      list[idx] = student;
    } else {
      list.push(student);
    }
    setStoredItem(STORAGE_KEYS.STUDENTS, list);
  },

  // Teachers
  getTeachers: (): TeacherProfile[] => getStoredItem(STORAGE_KEYS.TEACHERS, INITIAL_TEACHERS),
  getTeacherById: (id: string): TeacherProfile | undefined => db.getTeachers().find(t => t.id === id || t.userId === id),
  saveTeacher: (teacher: TeacherProfile): void => {
    const list = db.getTeachers();
    const idx = list.findIndex(t => t.id === teacher.id);
    if (idx >= 0) {
      list[idx] = teacher;
    } else {
      list.push(teacher);
    }
    setStoredItem(STORAGE_KEYS.TEACHERS, list);
  },

  // Courses
  getCourses: (): Course[] => getStoredItem(STORAGE_KEYS.COURSES, INITIAL_COURSES),
  getCourseBySlug: (slug: string): Course | undefined => db.getCourses().find(c => c.slug === slug),
  getCourseById: (id: string): Course | undefined => db.getCourses().find(c => c.id === id),
  saveCourse: (course: Course): void => {
    const list = db.getCourses();
    const idx = list.findIndex(c => c.id === course.id);
    if (idx >= 0) {
      list[idx] = course;
    } else {
      list.push(course);
    }
    setStoredItem(STORAGE_KEYS.COURSES, list);
  },
  deleteCourse: (id: string): void => {
    const list = db.getCourses().filter(c => c.id !== id);
    setStoredItem(STORAGE_KEYS.COURSES, list);
  },

  // Batches
  getBatches: (): Batch[] => getStoredItem(STORAGE_KEYS.BATCHES, INITIAL_BATCHES),
  getBatchById: (id: string): Batch | undefined => db.getBatches().find(b => b.id === id),
  getBatchesByCourseId: (courseId: string): Batch[] => db.getBatches().filter(b => b.courseId === courseId),
  getBatchesByTeacherId: (teacherId: string): Batch[] => db.getBatches().filter(b => b.teacherId === teacherId),
  saveBatch: (batch: Batch): void => {
    const list = db.getBatches();
    const idx = list.findIndex(b => b.id === batch.id);
    if (idx >= 0) {
      list[idx] = batch;
    } else {
      list.push(batch);
    }
    setStoredItem(STORAGE_KEYS.BATCHES, list);
  },
  deleteBatch: (id: string): void => {
    const list = db.getBatches().filter(b => b.id !== id);
    setStoredItem(STORAGE_KEYS.BATCHES, list);
  },

  // Enrollments
  getEnrollments: (): Enrollment[] => getStoredItem(STORAGE_KEYS.ENROLLMENTS, INITIAL_ENROLLMENTS),
  getEnrollmentsByStudentId: (studentId: string): Enrollment[] => db.getEnrollments().filter(e => e.studentId === studentId),
  saveEnrollment: (enrollment: Enrollment): void => {
    const list = db.getEnrollments();
    const idx = list.findIndex(e => e.id === enrollment.id);
    if (idx >= 0) {
      list[idx] = enrollment;
    } else {
      list.push(enrollment);
    }
    setStoredItem(STORAGE_KEYS.ENROLLMENTS, list);
  },

  // Applications
  getApplications: (): Application[] => getStoredItem(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS),
  getApplicationById: (id: string): Application | undefined => db.getApplications().find(a => a.id === id || a.applicationNumber === id),
  saveApplication: (app: Application): void => {
    const list = db.getApplications();
    const idx = list.findIndex(a => a.id === app.id);
    if (idx >= 0) {
      list[idx] = app;
    } else {
      list.unshift(app);
    }
    setStoredItem(STORAGE_KEYS.APPLICATIONS, list);
  },
  getApplicationDraft: (): Partial<Application> | null => {
    try {
      const draft = localStorage.getItem(STORAGE_KEYS.APPLICATION_DRAFT);
      return draft ? JSON.parse(draft) : null;
    } catch {
      return null;
    }
  },
  saveApplicationDraft: (draft: Partial<Application>): void => {
    localStorage.setItem(STORAGE_KEYS.APPLICATION_DRAFT, JSON.stringify(draft));
  },
  clearApplicationDraft: (): void => {
    localStorage.removeItem(STORAGE_KEYS.APPLICATION_DRAFT);
  },

  // Attendance
  getAttendance: (): AttendanceRecord[] => getStoredItem(STORAGE_KEYS.ATTENDANCE, INITIAL_ATTENDANCE),
  getAttendanceByBatchAndDate: (batchId: string, date: string): AttendanceRecord[] => {
    return db.getAttendance().filter(a => a.batchId === batchId && a.date === date);
  },
  getAttendanceByStudentId: (studentId: string): AttendanceRecord[] => {
    return db.getAttendance().filter(a => a.studentId === studentId);
  },
  saveBatchAttendance: (records: AttendanceRecord[]): void => {
    const list = db.getAttendance();
    records.forEach(newRec => {
      const idx = list.findIndex(r => r.batchId === newRec.batchId && r.date === newRec.date && r.studentId === newRec.studentId);
      if (idx >= 0) {
        list[idx] = newRec;
      } else {
        list.push(newRec);
      }
    });
    setStoredItem(STORAGE_KEYS.ATTENDANCE, list);
  },

  // Fees & Payments
  getFees: (): FeeRecord[] => getStoredItem(STORAGE_KEYS.FEES, INITIAL_FEES),
  getFeeByStudentId: (studentId: string): FeeRecord | undefined => db.getFees().find(f => f.studentId === studentId),
  saveFee: (fee: FeeRecord): void => {
    const list = db.getFees();
    const idx = list.findIndex(f => f.id === fee.id);
    if (idx >= 0) {
      list[idx] = fee;
    } else {
      list.push(fee);
    }
    setStoredItem(STORAGE_KEYS.FEES, list);
  },
  recordPayment: (studentId: string, amount: number, paymentMethod: PaymentRecord['paymentMethod'], remarks?: string): PaymentRecord => {
    const fees = db.getFees();
    let feeRecord = fees.find(f => f.studentId === studentId);
    
    const paymentId = `pay-${Date.now()}`;
    const receiptNo = `RMA-REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const student = db.getStudentById(studentId);

    const newPayment: PaymentRecord = {
      id: paymentId,
      feeRecordId: feeRecord ? feeRecord.id : 'fee-auto',
      receiptNumber: receiptNo,
      studentId: studentId,
      studentName: student?.fullName || 'Student',
      amount: amount,
      paymentDate: new Date().toISOString(),
      paymentMethod: paymentMethod,
      transactionId: `TXN-DEMO-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      status: 'SUCCESS',
      remarks: remarks || 'Demo Online Payment',
    };

    if (feeRecord) {
      feeRecord.paidAmount += amount;
      feeRecord.pendingAmount = Math.max(0, feeRecord.finalAmount - feeRecord.paidAmount);
      feeRecord.status = feeRecord.pendingAmount === 0 ? 'PAID' : 'PARTIALLY_PAID';
      feeRecord.payments.push(newPayment);
      db.saveFee(feeRecord);
    }

    return newPayment;
  },

  // Study Material
  getStudyMaterials: (): StudyMaterial[] => getStoredItem(STORAGE_KEYS.STUDY_MATERIALS, INITIAL_STUDY_MATERIALS),
  getStudyMaterialsByCourseId: (courseId: string): StudyMaterial[] => db.getStudyMaterials().filter(m => m.courseId === courseId),
  saveStudyMaterial: (mat: StudyMaterial): void => {
    const list = db.getStudyMaterials();
    const idx = list.findIndex(m => m.id === mat.id);
    if (idx >= 0) {
      list[idx] = mat;
    } else {
      list.unshift(mat);
    }
    setStoredItem(STORAGE_KEYS.STUDY_MATERIALS, list);
  },
  deleteStudyMaterial: (id: string): void => {
    const list = db.getStudyMaterials().filter(m => m.id !== id);
    setStoredItem(STORAGE_KEYS.STUDY_MATERIALS, list);
  },

  // Tests & Exams
  getTests: (): Test[] => getStoredItem(STORAGE_KEYS.TESTS, INITIAL_TESTS),
  getTestById: (id: string): Test | undefined => db.getTests().find(t => t.id === id),
  saveTest: (test: Test): void => {
    const list = db.getTests();
    const idx = list.findIndex(t => t.id === test.id);
    if (idx >= 0) {
      list[idx] = test;
    } else {
      list.unshift(test);
    }
    setStoredItem(STORAGE_KEYS.TESTS, list);
  },
  deleteTest: (id: string): void => {
    const list = db.getTests().filter(t => t.id !== id);
    setStoredItem(STORAGE_KEYS.TESTS, list);
  },

  // Test Attempts & Results
  getTestAttempts: (): TestAttempt[] => getStoredItem(STORAGE_KEYS.TEST_ATTEMPTS, [] as TestAttempt[]),
  getAttemptByStudentAndTest: (studentId: string, testId: string): TestAttempt | undefined => {
    return db.getTestAttempts().find(a => a.studentId === studentId && a.testId === testId);
  },
  saveTestAttempt: (attempt: TestAttempt): void => {
    const list = db.getTestAttempts();
    list.unshift(attempt);
    setStoredItem(STORAGE_KEYS.TEST_ATTEMPTS, list);

    // Also generate and save official result
    const result: Result = {
      id: `res-${Date.now()}`,
      attemptId: attempt.id,
      testId: attempt.testId,
      testTitle: attempt.testTitle,
      courseName: 'Rajmudra Competitive Exam',
      studentId: attempt.studentId,
      studentName: attempt.studentName,
      score: attempt.totalMarksObtained,
      totalMarks: attempt.totalQuestions * 5, // 5 marks each in demo
      percentage: attempt.percentage,
      rank: Math.floor(1 + Math.random() * 5),
      totalParticipants: 50,
      status: attempt.isPassed ? 'PASS' : 'FAIL',
      date: new Date().toISOString().split('T')[0],
      subjectBreakdown: [
        { subject: 'Exam Performance', score: attempt.totalMarksObtained, total: attempt.totalQuestions * 5 },
      ],
    };
    db.saveResult(result);
  },
  getResults: (): Result[] => getStoredItem(STORAGE_KEYS.RESULTS, INITIAL_RESULTS),
  getResultsByStudentId: (studentId: string): Result[] => db.getResults().filter(r => r.studentId === studentId),
  saveResult: (result: Result): void => {
    const list = db.getResults();
    list.unshift(result);
    setStoredItem(STORAGE_KEYS.RESULTS, list);
  },

  // Notices
  getNotices: (): Notice[] => getStoredItem(STORAGE_KEYS.NOTICES, INITIAL_NOTICES),
  saveNotice: (notice: Notice): void => {
    const list = db.getNotices();
    const idx = list.findIndex(n => n.id === notice.id);
    if (idx >= 0) {
      list[idx] = notice;
    } else {
      list.unshift(notice);
    }
    setStoredItem(STORAGE_KEYS.NOTICES, list);
  },
  deleteNotice: (id: string): void => {
    const list = db.getNotices().filter(n => n.id !== id);
    setStoredItem(STORAGE_KEYS.NOTICES, list);
  },

  // Notifications
  getNotifications: (userId?: string): NotificationItem[] => {
    const list = getStoredItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    return userId ? list.filter(n => n.userId === userId || n.userId === 'ALL') : list;
  },
  sendNotification: (item: Omit<NotificationItem, 'id' | 'createdAt' | 'isRead'>): void => {
    const list = getStoredItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    const newNotif: NotificationItem = {
      ...item,
      id: `ntf-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    list.unshift(newNotif);
    setStoredItem(STORAGE_KEYS.NOTIFICATIONS, list);
  },
  markNotificationRead: (id: string): void => {
    const list = db.getNotifications();
    const item = list.find(n => n.id === id);
    if (item) {
      item.isRead = true;
      setStoredItem(STORAGE_KEYS.NOTIFICATIONS, list);
    }
  },

  // Gallery
  getGallery: (): GalleryItem[] => getStoredItem(STORAGE_KEYS.GALLERY, INITIAL_GALLERY),
  saveGalleryItem: (item: GalleryItem): void => {
    const list = db.getGallery();
    const idx = list.findIndex(g => g.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.unshift(item);
    }
    setStoredItem(STORAGE_KEYS.GALLERY, list);
  },
  deleteGalleryItem: (id: string): void => {
    const list = db.getGallery().filter(g => g.id !== id);
    setStoredItem(STORAGE_KEYS.GALLERY, list);
  },

  // Testimonials
  getTestimonials: (): Testimonial[] => getStoredItem(STORAGE_KEYS.TESTIMONIALS, INITIAL_TESTIMONIALS),
  saveTestimonial: (item: Testimonial): void => {
    const list = db.getTestimonials();
    const idx = list.findIndex(t => t.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.unshift(item);
    }
    setStoredItem(STORAGE_KEYS.TESTIMONIALS, list);
  },

  // Enquiries / Leads
  getEnquiries: (): Enquiry[] => getStoredItem(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES),
  saveEnquiry: (enquiry: Enquiry): void => {
    const list = db.getEnquiries();
    const idx = list.findIndex(e => e.id === enquiry.id);
    if (idx >= 0) {
      list[idx] = enquiry;
    } else {
      list.unshift(enquiry);
    }
    setStoredItem(STORAGE_KEYS.ENQUIRIES, list);
  },

  // Settings
  getSettings: (): AcademySettings => getStoredItem(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS),
  saveSettings: (settings: AcademySettings): void => setStoredItem(STORAGE_KEYS.SETTINGS, settings),

  // Audit Logs
  getAuditLogs: (): AuditLog[] => getStoredItem(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS),
  logAction: (userId: string, userName: string, userRole: any, action: string, entityType: string, entityId: string, details: string): void => {
    const logs = db.getAuditLogs();
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId,
      userName,
      userRole,
      action,
      entityType,
      entityId,
      details,
      ipAddress: '192.168.1.1',
    };
    logs.unshift(newLog);
    setStoredItem(STORAGE_KEYS.AUDIT_LOGS, logs.slice(0, 100)); // retain last 100
  },
};

// Self initialize on import
db.initialize();

