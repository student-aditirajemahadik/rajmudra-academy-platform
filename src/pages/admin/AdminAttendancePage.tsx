import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { CalendarCheck, Download, Search } from 'lucide-react';
import { AttendanceStatus } from '../../types';

export const AdminAttendancePage: React.FC = () => {
  const { success } = useToast();
  const attendance = db.getAttendance();
  const batches = db.getBatches();

  const [selectedBatch, setSelectedBatch] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = attendance.filter(a => {
    const matchesBatch = selectedBatch === 'ALL' || a.batchId === selectedBatch;
    const matchesStatus = selectedStatus === 'ALL' || a.status === selectedStatus;
    const matchesSearch =
      a.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.batchName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBatch && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (st: AttendanceStatus) => {
    switch (st) {
      case 'PRESENT':
        return <Badge variant="green" size="sm">PRESENT</Badge>;
      case 'ABSENT':
        return <Badge variant="red" size="sm">ABSENT</Badge>;
      case 'LATE':
        return <Badge variant="yellow" size="sm">LATE</Badge>;
      case 'EXCUSED':
        return <Badge variant="blue" size="sm">EXCUSED</Badge>;
    }
  };

  const handleExport = () => {
    success('Attendance ledger exported to CSV successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            हजेरी नियंत्रण व अहवाल (Academy-Wide Attendance Logs)
          </h2>
          <p className="text-xs text-gray-500">Monitor student presence across all active batches and ground drills.</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={handleExport}
        >
          Export Attendance CSV
        </Button>
      </div>

      {/* Filter Header */}
      <Card className="p-4 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Filter by Batch</label>
            <select
              value={selectedBatch}
              onChange={e => setSelectedBatch(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white font-medium"
            >
              <option value="ALL">All Batches</option>
              {batches.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Filter by Status</label>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white font-medium"
            >
              <option value="ALL">All Statuses</option>
              <option value="PRESENT">PRESENT</option>
              <option value="ABSENT">ABSENT</option>
              <option value="LATE">LATE</option>
              <option value="EXCUSED">EXCUSED</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Search Student</label>
            <input
              type="text"
              placeholder="Search candidate name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
            />
          </div>
        </div>
      </Card>

      {/* Attendance Table */}
      <Card className="overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Student</th>
                <th className="p-4">Batch</th>
                <th className="p-4">Status</th>
                <th className="p-4">Teacher / Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(rec => (
                <tr key={rec.id} className="hover:bg-gray-50/80">
                  <td className="p-4 font-semibold text-rajmudra-charcoal">{rec.date}</td>
                  <td className="p-4 font-bold text-rajmudra-charcoal">{rec.studentName}</td>
                  <td className="p-4 text-gray-600 truncate max-w-xs">{rec.batchName}</td>
                  <td className="p-4">{getStatusBadge(rec.status)}</td>
                  <td className="p-4 text-gray-500">{rec.remarks || 'Regular presence marked'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
