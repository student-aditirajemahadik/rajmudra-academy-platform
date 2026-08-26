import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  FileText,
  HelpCircle,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { user, teacherProfile } = useAuth();
  const navigate = useNavigate();

  const teacherId = teacherProfile?.id || 'fac-01';
  const assignedBatches = db.getBatches().filter(b => b.teacherId === teacherId || teacherProfile?.assignedBatchIds?.includes(b.id));
  const assignedStudents = db.getStudents().filter(s => s.enrolledBatchIds.some(bId => assignedBatches.some(ab => ab.id === bId)));
  const materials = db.getStudyMaterials().filter(m => m.uploadedBy === teacherId);
  const tests = db.getTests();

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rajmudra-charcoal via-rajmudra-black to-rajmudra-charcoal rounded-3xl p-6 sm:p-8 text-white border border-rajmudra-border-gray shadow-premium-dark flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
            <span>Faculty Member • Rajmudra Career Academy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-devanagari">
            स्वागतम्, {teacherProfile?.fullName || user?.name}!
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Subject: <strong>{teacherProfile?.subject}</strong> | Total Students Under Mentorship: <strong>{assignedStudents.length || 150}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            leftIcon={<CalendarCheck className="w-4 h-4" />}
            onClick={() => navigate('/teacher/attendance')}
            className="shadow-glow-orange text-xs sm:text-sm"
          >
            Mark Daily Attendance
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/teacher/tests')}
            className="text-white border-gray-600 hover:border-rajmudra-orange hover:bg-rajmudra-orange text-xs sm:text-sm"
          >
            Create New Test
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card hoverEffect className="p-5 border-l-4 border-l-rajmudra-orange flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-500">Assigned Batches</span>
            <div className="text-2xl font-black text-rajmudra-charcoal">{assignedBatches.length}</div>
            <p className="text-[11px] text-gray-500">Ongoing & Upcoming</p>
          </div>
          <Link to="/teacher/batches" className="text-xs font-bold text-rajmudra-orange hover:underline pt-2">
            View Batches &rarr;
          </Link>
        </Card>

        <Card hoverEffect className="p-5 border-l-4 border-l-blue-600 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-500">Active Students</span>
            <div className="text-2xl font-black text-blue-700">{assignedStudents.length || 93}</div>
            <p className="text-[11px] text-gray-500">In My Batches</p>
          </div>
          <Link to="/teacher/students" className="text-xs font-bold text-blue-700 hover:underline pt-2">
            Student Roster &rarr;
          </Link>
        </Card>

        <Card hoverEffect className="p-5 border-l-4 border-l-green-600 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-500">Published Notes</span>
            <div className="text-2xl font-black text-green-700">{materials.length || 4}</div>
            <p className="text-[11px] text-gray-500">PDF & Handouts</p>
          </div>
          <Link to="/teacher/material" className="text-xs font-bold text-green-700 hover:underline pt-2">
            Material Center &rarr;
          </Link>
        </Card>

        <Card hoverEffect className="p-5 border-l-4 border-l-amber-500 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-500">Active Mock Tests</span>
            <div className="text-2xl font-black text-amber-600">{tests.length}</div>
            <p className="text-[11px] text-gray-500">Weekly OMR & CBT</p>
          </div>
          <Link to="/teacher/tests" className="text-xs font-bold text-amber-600 hover:underline pt-2">
            Test Center &rarr;
          </Link>
        </Card>
      </div>

      {/* Today's Teaching Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 space-y-4 border border-gray-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari flex items-center gap-2">
                <Clock className="w-5 h-5 text-rajmudra-orange" />
                माझे आजचे वर्ग (My Lectures Today)
              </h3>
              <Badge variant="orange">Today's Roster</Badge>
            </div>

            <div className="space-y-3">
              {assignedBatches.map(b => (
                <div key={b.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-rajmudra-orange">{b.startTime} - {b.endTime}</span>
                    <h4 className="text-sm font-bold text-rajmudra-charcoal font-devanagari">{b.name}</h4>
                    <p className="text-xs text-gray-500">Room: {b.room} | Enrolled: {b.enrolledCount} Students</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/teacher/attendance')}
                    className="text-xs"
                  >
                    Attendance
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 space-y-4 border border-gray-200">
            <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari">
              त्वरित कृती (Quick Shortcuts)
            </h3>
            <div className="space-y-2">
              <Link
                to="/teacher/attendance"
                className="flex items-center justify-between p-3.5 rounded-xl bg-orange-50/70 text-rajmudra-orange font-bold text-xs hover:bg-orange-100 transition-colors border border-orange-200"
              >
                <span>Take Batch Attendance</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/teacher/material"
                className="flex items-center justify-between p-3.5 rounded-xl bg-blue-50/70 text-blue-700 font-bold text-xs hover:bg-blue-100 transition-colors border border-blue-200"
              >
                <span>Upload Handouts / PDF Notes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/teacher/marks"
                className="flex items-center justify-between p-3.5 rounded-xl bg-green-50/70 text-green-700 font-bold text-xs hover:bg-green-100 transition-colors border border-green-200"
              >
                <span>Grade Test Scores</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
