import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import {
  CalendarCheck,
  CreditCard,
  BookOpen,
  HelpCircle,
  Award,
  Bell,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Users,
  Flame,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user, studentProfile } = useAuth();
  const navigate = useNavigate();

  const studentId = studentProfile?.id || 'stu-01';
  const enrolledCourses = db.getCourses().filter(c => studentProfile?.enrolledCourseIds?.includes(c.id) || c.id === 'crs-01');
  const primaryCourse = enrolledCourses[0] || db.getCourses()[0];
  const enrolledBatches = db.getBatches().filter(b => studentProfile?.enrolledBatchIds?.includes(b.id) || b.id === 'btc-01');
  const primaryBatch = enrolledBatches[0] || db.getBatches()[0];

  const attendanceRecords = db.getAttendanceByStudentId(studentId);
  const presentCount = attendanceRecords.filter(a => a.status === 'PRESENT' || a.status === 'LATE').length;
  const attendancePercentage = attendanceRecords.length > 0 ? Math.round((presentCount / attendanceRecords.length) * 100) : 92;

  const feeRecord = db.getFeeByStudentId(studentId);
  const activeTests = db.getTests().filter(t => t.status === 'ACTIVE');
  const recentNotices = db.getNotices().slice(0, 3);
  const results = db.getResultsByStudentId(studentId);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-rajmudra-black via-rajmudra-charcoal to-rajmudra-black rounded-3xl p-6 sm:p-8 text-white border border-rajmudra-border-gray shadow-premium-dark flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-500/30 text-orange-400 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-rajmudra-orange animate-bounce" />
            <span>लक्ष्य २०२६: खाकी वर्दी व प्रशासकीय सेवा</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-devanagari">
            नमस्कार, {studentProfile?.fullName || user?.name}!
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Roll No: <strong>RMA-PB-26-01</strong> | Current Batch: <strong>{primaryBatch?.name}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <Button
            variant="primary"
            size="md"
            leftIcon={<HelpCircle className="w-4 h-4" />}
            onClick={() => navigate('/student/tests')}
            className="shadow-glow-orange text-xs sm:text-sm"
          >
            Start Active Test
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/student/material')}
            className="text-white border-gray-600 hover:border-rajmudra-orange hover:bg-rajmudra-orange text-xs sm:text-sm"
          >
            View Notes
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Course Card */}
        <Card hoverEffect className="p-5 border-l-4 border-l-rajmudra-orange flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500">My Course</span>
              <BookOpen className="w-4 h-4 text-rajmudra-orange" />
            </div>
            <div className="text-sm font-bold text-rajmudra-charcoal truncate font-devanagari">
              {primaryCourse?.name}
            </div>
            <p className="text-[11px] text-gray-500">{primaryCourse?.durationText}</p>
          </div>
          <Link to="/student/course" className="text-xs font-bold text-rajmudra-orange hover:underline pt-2 inline-block">
            View Syllabus &rarr;
          </Link>
        </Card>

        {/* Attendance Card */}
        <Card hoverEffect className="p-5 border-l-4 border-l-green-600 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500">Attendance</span>
              <CalendarCheck className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-2xl font-black text-rajmudra-charcoal">
              {attendancePercentage}%
            </div>
            <p className="text-[11px] text-green-600 font-semibold">Good Standing</p>
          </div>
          <Link to="/student/attendance" className="text-xs font-bold text-green-700 hover:underline pt-2 inline-block">
            Daily Log &rarr;
          </Link>
        </Card>

        {/* Fees Card */}
        <Card hoverEffect className="p-5 border-l-4 border-l-amber-500 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500">Pending Fees</span>
              <CreditCard className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-rajmudra-charcoal">
              ₹{feeRecord ? feeRecord.pendingAmount.toLocaleString('en-IN') : '5,000'}
            </div>
            <p className="text-[11px] text-gray-500">Due by Sep 15, 2026</p>
          </div>
          <Link to="/student/fees" className="text-xs font-bold text-amber-600 hover:underline pt-2 inline-block">
            Pay / Receipts &rarr;
          </Link>
        </Card>

        {/* Active Test Card */}
        <Card hoverEffect className="p-5 border-l-4 border-l-blue-600 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500">Active Test</span>
              <HelpCircle className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-base font-bold text-rajmudra-charcoal truncate font-devanagari">
              {activeTests[0]?.title || 'Weekly OMR Mock 01'}
            </div>
            <p className="text-[11px] text-blue-600 font-semibold">Time: 30 Mins (50 Marks)</p>
          </div>
          <Link to="/student/tests" className="text-xs font-bold text-blue-700 hover:underline pt-2 inline-block">
            Take Test Now &rarr;
          </Link>
        </Card>
      </div>

      {/* Main Grid: Today's Schedule + Recent Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Today's Classes & Physical Drill */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari flex items-center gap-2">
                <Clock className="w-5 h-5 text-rajmudra-orange" />
                आजचे वेळापत्रक (Today's Daily Timetable)
              </h3>
              <Badge variant="orange">Live Schedule</Badge>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-rajmudra-orange uppercase">07:00 AM – 09:00 AM</span>
                  <h4 className="text-sm font-bold text-rajmudra-charcoal font-devanagari">
                    Physical Ground Drill & 1600m Running Practice
                  </h4>
                  <p className="text-xs text-gray-600">Instructor: Capt. Vikas More (Retd.) | Sports Ground Track</p>
                </div>
                <Badge variant="green" size="sm">Completed</Badge>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-blue-600 uppercase">09:30 AM – 11:30 AM</span>
                  <h4 className="text-sm font-bold text-rajmudra-charcoal font-devanagari">
                    मराठी व्याकरण - प्रयोग व समास सखोल विश्लेषण
                  </h4>
                  <p className="text-xs text-gray-600">Faculty: Prof. Ramesh Shinde | Hall 1 (Ground Floor)</p>
                </div>
                <Badge variant="orange" size="sm">Ongoing</Badge>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">12:00 PM – 01:30 PM</span>
                  <h4 className="text-sm font-bold text-rajmudra-charcoal font-devanagari">
                    अंकगणित व बुद्धिमत्ता चाचणी स्पीड ट्रिक्स
                  </h4>
                  <p className="text-xs text-gray-600">Faculty: Prof. Mahesh Kadam | Hall 1</p>
                </div>
                <Badge variant="gray" size="sm">Upcoming</Badge>
              </div>
            </div>
          </Card>

          {/* Academic Performance Snapshot */}
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari flex items-center gap-2">
              <Award className="w-5 h-5 text-rajmudra-orange" />
              परीक्षेचा निकाल (Latest Test Results)
            </h3>
            {results.length > 0 ? (
              <div className="space-y-3">
                {results.slice(0, 2).map(r => (
                  <div key={r.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-rajmudra-charcoal font-devanagari">{r.testTitle}</h4>
                      <p className="text-[11px] text-gray-500">Date: {r.date} | Rank: #{r.rank} in batch</p>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-black text-green-700">{r.score}/{r.totalMarks}</div>
                      <span className="text-[10px] text-green-700 bg-green-100 px-2 py-0.5 rounded font-bold">PASS ({r.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">No test attempts recorded yet.</p>
            )}
          </Card>
        </div>

        {/* Right Col: Notices & Quick Shortcuts */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari flex items-center gap-2">
                <Bell className="w-5 h-5 text-rajmudra-orange" />
                नवीन सूचना (Latest Notices)
              </h3>
              <Link to="/student/notices" className="text-xs text-rajmudra-orange font-bold hover:underline">
                All &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {recentNotices.map(notice => (
                <div key={notice.id} className="p-3.5 rounded-xl bg-gray-50 border-l-4 border-l-rajmudra-orange space-y-1">
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>{notice.publishDate}</span>
                    <span className="font-semibold text-rajmudra-orange">{notice.category}</span>
                  </div>
                  <h4 className="text-xs font-bold text-rajmudra-charcoal font-devanagari line-clamp-1">{notice.title}</h4>
                  <p className="text-[11px] text-gray-600 line-clamp-2">{notice.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Support Card */}
          <Card className="p-6 bg-gradient-to-br from-rajmudra-charcoal to-rajmudra-black text-white space-y-3 border border-rajmudra-border-gray">
            <div className="text-xs font-bold text-rajmudra-orange uppercase tracking-wider">
              Student Helpdesk
            </div>
            <h4 className="text-base font-bold font-devanagari">काही अडचण किंवा शंका आहे का?</h4>
            <p className="text-xs text-gray-300">
              अभ्यास, हॉस्टेल किंवा फी संबंधित समस्येसाठी थेट अकॅडमी ऑफिसशी बोला.
            </p>
            <div className="pt-2">
              <a
                href="tel:+919822012345"
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-rajmudra-orange hover:bg-rajmudra-orange-hover px-4 py-2 rounded-xl transition-colors"
              >
                Call Office: +91 98220 12345
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

