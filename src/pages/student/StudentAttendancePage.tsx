import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { CalendarCheck, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { AttendanceStatus } from '../../types';

export const StudentAttendancePage: React.FC = () => {
  const { studentProfile } = useAuth();
  const studentId = studentProfile?.id || 'stu-01';
  const attendanceList = db.getAttendanceByStudentId(studentId);

  const presentCount = attendanceList.filter(a => a.status === 'PRESENT').length;
  const lateCount = attendanceList.filter(a => a.status === 'LATE').length;
  const absentCount = attendanceList.filter(a => a.status === 'ABSENT').length;
  const excusedCount = attendanceList.filter(a => a.status === 'EXCUSED').length;

  const totalClasses = Math.max(1, attendanceList.length);
  const attendancePercentage = Math.round(((presentCount + lateCount) / totalClasses) * 100);

  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case 'PRESENT':
        return <Badge variant="green">PRESENT</Badge>;
      case 'ABSENT':
        return <Badge variant="red">ABSENT</Badge>;
      case 'LATE':
        return <Badge variant="yellow">LATE</Badge>;
      case 'EXCUSED':
        return <Badge variant="blue">EXCUSED</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            विद्यार्थी उपस्थिती नोंद (Attendance Tracker)
          </h2>
          <p className="text-xs text-gray-500">Daily physical ground & classroom lecture attendance log.</p>
        </div>

        <Badge variant="green" size="md">Overall Attendance: {attendancePercentage}%</Badge>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-green-600 space-y-1 text-center">
          <div className="text-2xl font-black text-green-700">{presentCount}</div>
          <div className="text-xs font-bold text-gray-600">Present Days</div>
        </Card>
        <Card className="p-4 border-l-4 border-l-amber-500 space-y-1 text-center">
          <div className="text-2xl font-black text-amber-600">{lateCount}</div>
          <div className="text-xs font-bold text-gray-600">Late Marked</div>
        </Card>
        <Card className="p-4 border-l-4 border-l-red-600 space-y-1 text-center">
          <div className="text-2xl font-black text-red-600">{absentCount}</div>
          <div className="text-xs font-bold text-gray-600">Absent Days</div>
        </Card>
        <Card className="p-4 border-l-4 border-l-blue-600 space-y-1 text-center">
          <div className="text-2xl font-black text-blue-600">{excusedCount}</div>
          <div className="text-xs font-bold text-gray-600">Excused Leaves</div>
        </Card>
      </div>

      {/* Attendance History Table */}
      <Card className="overflow-hidden border border-gray-200">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari">
            दैनिक हजेरी इतिहास (Daily Log History)
          </h3>
          <span className="text-xs text-gray-500">{attendanceList.length} Sessions Recorded</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Batch Name</th>
                <th className="p-4">Status</th>
                <th className="p-4">Remarks / Faculty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {attendanceList.map(record => (
                <tr key={record.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-semibold text-rajmudra-charcoal">{record.date}</td>
                  <td className="p-4 text-gray-600">{record.batchName}</td>
                  <td className="p-4">{getStatusBadge(record.status)}</td>
                  <td className="p-4 text-gray-500">{record.remarks || 'Regular Attendance marked by Faculty'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

