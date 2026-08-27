import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { StudentLayout } from './components/layout/StudentLayout';
import { TeacherLayout } from './components/layout/TeacherLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { CoursesPage } from './pages/public/CoursesPage';
import { CourseDetailPage } from './pages/public/CourseDetailPage';
import { BatchesPage } from './pages/public/BatchesPage';
import { FacultyPage } from './pages/public/FacultyPage';
import { ResultsPage } from './pages/public/ResultsPage';
import { GalleryPage } from './pages/public/GalleryPage';
import { NoticesPage } from './pages/public/NoticesPage';
import { FAQPage } from './pages/public/FAQPage';
import { ContactPage } from './pages/public/ContactPage';
import { ApplyPage } from './pages/public/ApplyPage';
import { LoginPage } from './pages/public/LoginPage';

// Student Portal Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentProfilePage } from './pages/student/StudentProfilePage';
import { StudentApplicationPage } from './pages/student/StudentApplicationPage';
import { StudentCoursePage } from './pages/student/StudentCoursePage';
import { StudentBatchPage } from './pages/student/StudentBatchPage';
import { StudentAttendancePage } from './pages/student/StudentAttendancePage';
import { StudentFeesPage } from './pages/student/StudentFeesPage';
import { StudentMaterialPage } from './pages/student/StudentMaterialPage';
import { StudentTestsPage } from './pages/student/StudentTestsPage';
import { StudentTestTakePage } from './pages/student/StudentTestTakePage';
import { StudentResultsPage } from './pages/student/StudentResultsPage';
import { StudentDocumentsPage } from './pages/student/StudentDocumentsPage';
import { StudentNoticesPage } from './pages/student/StudentNoticesPage';
import { StudentSettingsPage } from './pages/student/StudentSettingsPage';

// Teacher Portal Pages
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { TeacherBatchesPage } from './pages/teacher/TeacherBatchesPage';
import { TeacherStudentsPage } from './pages/teacher/TeacherStudentsPage';
import { TeacherAttendancePage } from './pages/teacher/TeacherAttendancePage';
import { TeacherMaterialPage } from './pages/teacher/TeacherMaterialPage';
import { TeacherTestsPage } from './pages/teacher/TeacherTestsPage';
import { TeacherMarksPage } from './pages/teacher/TeacherMarksPage';
import { TeacherNoticesPage } from './pages/teacher/TeacherNoticesPage';
import { TeacherProfilePage } from './pages/teacher/TeacherProfilePage';
import { TeacherSettingsPage } from './pages/teacher/TeacherSettingsPage';

// Admin Portal Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminApplicationsPage } from './pages/admin/AdminApplicationsPage';
import { AdminStudentsPage } from './pages/admin/AdminStudentsPage';
import { AdminTeachersPage } from './pages/admin/AdminTeachersPage';
import { AdminCoursesPage } from './pages/admin/AdminCoursesPage';
import { AdminBatchesPage } from './pages/admin/AdminBatchesPage';
import { AdminEnrollmentsPage } from './pages/admin/AdminEnrollmentsPage';
import { AdminAttendancePage } from './pages/admin/AdminAttendancePage';
import { AdminFeesPage } from './pages/admin/AdminFeesPage';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage';
import { AdminMaterialPage } from './pages/admin/AdminMaterialPage';
import { AdminTestsPage } from './pages/admin/AdminTestsPage';
import { AdminResultsPage } from './pages/admin/AdminResultsPage';
import { AdminNoticesPage } from './pages/admin/AdminNoticesPage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { AdminTestimonialsPage } from './pages/admin/AdminTestimonialsPage';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:slug" element={<CourseDetailPage />} />
        <Route path="/batches" element={<BatchesPage />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Student Portal Protected Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfilePage />} />
        <Route path="application" element={<StudentApplicationPage />} />
        <Route path="course" element={<StudentCoursePage />} />
        <Route path="batch" element={<StudentBatchPage />} />
        <Route path="attendance" element={<StudentAttendancePage />} />
        <Route path="fees" element={<StudentFeesPage />} />
        <Route path="material" element={<StudentMaterialPage />} />
        <Route path="tests" element={<StudentTestsPage />} />
        <Route path="tests/take/:testId" element={<StudentTestTakePage />} />
        <Route path="results" element={<StudentResultsPage />} />
        <Route path="documents" element={<StudentDocumentsPage />} />
        <Route path="notices" element={<StudentNoticesPage />} />
        <Route path="settings" element={<StudentSettingsPage />} />
      </Route>

      {/* Teacher Portal Protected Routes */}
      <Route
        path="/teacher"
        element={
          <ProtectedRoute allowedRoles={['TEACHER']}>
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/teacher/dashboard" replace />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="batches" element={<TeacherBatchesPage />} />
        <Route path="students" element={<TeacherStudentsPage />} />
        <Route path="attendance" element={<TeacherAttendancePage />} />
        <Route path="material" element={<TeacherMaterialPage />} />
        <Route path="tests" element={<TeacherTestsPage />} />
        <Route path="marks" element={<TeacherMarksPage />} />
        <Route path="notices" element={<TeacherNoticesPage />} />
        <Route path="profile" element={<TeacherProfilePage />} />
        <Route path="settings" element={<TeacherSettingsPage />} />
      </Route>

      {/* Admin Portal Protected Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="applications" element={<AdminApplicationsPage />} />
        <Route path="students" element={<AdminStudentsPage />} />
        <Route path="teachers" element={<AdminTeachersPage />} />
        <Route path="courses" element={<AdminCoursesPage />} />
        <Route path="batches" element={<AdminBatchesPage />} />
        <Route path="enrollments" element={<AdminEnrollmentsPage />} />
        <Route path="attendance" element={<AdminAttendancePage />} />
        <Route path="fees" element={<AdminFeesPage />} />
        <Route path="payments" element={<AdminPaymentsPage />} />
        <Route path="material" element={<AdminMaterialPage />} />
        <Route path="tests" element={<AdminTestsPage />} />
        <Route path="results" element={<AdminResultsPage />} />
        <Route path="notices" element={<AdminNoticesPage />} />
        <Route path="notifications" element={<AdminNotificationsPage />} />
        <Route path="gallery" element={<AdminGalleryPage />} />
        <Route path="testimonials" element={<AdminTestimonialsPage />} />
        <Route path="enquiries" element={<AdminEnquiriesPage />} />
        <Route path="reports" element={<AdminReportsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        <Route path="audit-logs" element={<AdminAuditLogsPage />} />
      </Route>

      {/* Fallback Catch-all Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

