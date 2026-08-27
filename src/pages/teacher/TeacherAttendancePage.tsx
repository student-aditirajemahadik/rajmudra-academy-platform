import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import {
  CalendarCheck,
  CheckCircle2,
  Users,
  Save,
  Check,
  XCircle,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { AttendanceRecord, AttendanceStatus } from '../../types';

export const TeacherAttendancePage: React.FC = () => {
  const { teacherProfile, user } = useAuth();
  const { success } = useToast();
  const teacherId = teacherProfile?.id || 'fac-01';

  const batches = db.getBatches();
  const [selectedBatchId, setSelectedBatchId] = useState<string>(batches[0]?.id || 'btc-01');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const selectedBatch = batches.find(b => b.id === selectedBatchId) || batches[0];
  const allStudents = db.getStudents();
  const enrolledStudents = allStudents.filter(s => s.enrolledBatchIds.includes(selectedBatchId));
  const studentsToMark = enrolledStudents.length > 0 ? enrolledStudents : allStudents.slice(0, 8);

  // Load current attendance status map
  const [attendanceMap, setAttendanceMap] = useState<{ [studentId: string]: AttendanceStatus }>(() => {
    const existing = db.getAttendanceByBatchAndDate(selectedBatchId, selectedDate);
    const map: { [studentId: string]: AttendanceStatus } = {};
    studentsToMark.forEach(s => {
      const rec = existing.find(r => r.studentId === s.id);
      map[s.id] = rec ? rec.status : 'PRESENT';
    });
    return map;
  });

  const handleBatchChange = (batchId: string) => {
    setSelectedBatchId(batchId);
    const existing = db.getAttendanceByBatchAndDate(batchId, selectedDate);
    const map: { [studentId: string]: AttendanceStatus } = {};
    studentsToMark.forEach(s => {
      const rec = existing.find(r => r.studentId === s.id);
      map[s.id] = rec ? rec.status : 'PRESENT';
    });
    setAttendanceMap(map);
  };

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceMap(prev => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleMarkAllPresent = () => {
    const map: { [studentId: string]: AttendanceStatus } = {};
    studentsToMark.forEach(s => {
      map[s.id] = 'PRESENT';
    });
    setAttendanceMap(map);
    success('Marked all students as PRESENT');
  };

  const handleSaveAttendance = () => {
    const records: AttendanceRecord[] = studentsToMark.map(s => ({
      id: `att-${selectedBatchId}-${selectedDate}-${s.id}`,
      batchId: selectedBatchId,
      batchName: selectedBatch.name,
      date: selectedDate,
      studentId: s.id,
      studentName: s.fullName,
      status: attendanceMap[s.id] || 'PRESENT',
      markedByTeacherId: teacherId,
      remarks: 'Recorded via Faculty Portal',
    }));

    db.saveBatchAttendance(records);
    db.logAction(user?.id || 'usr-teach-01', teacherProfile?.fullName || 'Faculty', 'TEACHER', 'ATTENDANCE_SAVED', 'Attendance', selectedBatchId, `Saved attendance for ${selectedBatch.name} on ${selectedDate}`);
    success(`Attendance for ${selectedBatch.name} on ${selectedDate} saved successfully!`);
  };

  const presentTotal = Object.values(attendanceMap).filter(st => st === 'PRESENT' || st === 'LATE').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            दैनिक हजेरी नोंदणी (Daily Attendance Marking)
          </h2>
          <p className="text-xs text-gray-500">Select batch, date, and mark attendance for morning/evening lectures.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllPresent}
          >
            Mark All Present
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Save className="w-4 h-4" />}
            onClick={handleSaveAttendance}
            className="shadow-glow-orange"
          >
            Save Attendance
          </Button>
        </div>
      </div>

      {/* Selector Filters Card */}
      <Card className="p-5 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Select Batch (बॅच निवडा)</label>
            <select
              value={selectedBatchId}
              onChange={e => handleBatchChange(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white font-medium"
            >
              {batches.map(b => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.startTime} - {b.endTime})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Attendance Date (तारीख)</label>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white font-medium"
            />
          </div>

          <div className="sm:text-right pt-4 sm:pt-0">
            <span className="text-xs text-gray-500 block">Attendance Rate</span>
            <span className="text-lg font-black text-green-700">
              {presentTotal} / {studentsToMark.length} Present ({Math.round((presentTotal / Math.max(1, studentsToMark.length)) * 100)}%)
            </span>
          </div>
        </div>
      </Card>

      {/* Students Attendance Table */}
      <Card className="overflow-hidden border border-gray-200">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-rajmudra-charcoal font-devanagari">
            विद्यार्थी यादी ({studentsToMark.length} Students)
          </h3>
          <span className="text-xs text-gray-500">Batch: {selectedBatch.batchCode}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-white text-gray-600 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Student Name</th>
                <th className="p-4">Student ID / Roll No</th>
                <th className="p-4 text-center">Attendance Status Selection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {studentsToMark.map(student => {
                const currentStatus = attendanceMap[student.id] || 'PRESENT';

                return (
                  <tr key={student.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.fullName}
                          className="w-9 h-9 rounded-full object-cover border border-rajmudra-orange"
                        />
                        <div>
                          <div className="font-bold text-rajmudra-charcoal">{student.fullName}</div>
                          <div className="text-[11px] text-gray-500">{student.phone}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-mono font-semibold text-gray-700">
                      {student.studentId}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {(['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'] as AttendanceStatus[]).map(st => {
                          const isSelected = currentStatus === st;
                          return (
                            <button
                              key={st}
                              type="button"
                              onClick={() => handleStatusChange(student.id, st)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                isSelected
                                  ? st === 'PRESENT'
                                    ? 'bg-green-600 text-white shadow-sm'
                                    : st === 'ABSENT'
                                    ? 'bg-red-600 text-white shadow-sm'
                                    : st === 'LATE'
                                    ? 'bg-amber-500 text-white shadow-sm'
                                    : 'bg-blue-600 text-white shadow-sm'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {st}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <Button
            variant="primary"
            size="md"
            leftIcon={<Save className="w-4 h-4" />}
            onClick={handleSaveAttendance}
            className="shadow-glow-orange"
          >
            Save Batch Attendance
          </Button>
        </div>
      </Card>
    </div>
  );
};

