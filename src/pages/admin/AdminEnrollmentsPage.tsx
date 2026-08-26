import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { UserPlus, Search, Download } from 'lucide-react';

export const AdminEnrollmentsPage: React.FC = () => {
  const { success } = useToast();
  const enrollments = db.getEnrollments();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = enrollments.filter(e =>
    e.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.batchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    success('Enrollment master list exported to CSV!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            प्रवेश व नावनोंदणी नोंदवही (Enrollment Master Ledger)
          </h2>
          <p className="text-xs text-gray-500">Official student-to-batch enrollment records with roll numbers and dates.</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={handleExport}
        >
          Export Enrollment CSV
        </Button>
      </div>

      <Card className="overflow-hidden border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search enrollments..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
            />
          </div>
          <span className="text-xs text-gray-500">{filtered.length} Total Enrolled</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Roll Number</th>
                <th className="p-4">Student</th>
                <th className="p-4">Course</th>
                <th className="p-4">Batch</th>
                <th className="p-4">Enrollment Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(enr => (
                <tr key={enr.id} className="hover:bg-gray-50/80">
                  <td className="p-4 font-mono font-bold text-rajmudra-orange">{enr.rollNumber}</td>
                  <td className="p-4 font-bold text-rajmudra-charcoal">{enr.studentName}</td>
                  <td className="p-4 text-gray-600 truncate max-w-xs">{enr.courseName}</td>
                  <td className="p-4 text-gray-600 truncate max-w-xs">{enr.batchName}</td>
                  <td className="p-4 text-gray-500">{enr.enrollmentDate}</td>
                  <td className="p-4">
                    <Badge variant="green" size="sm">{enr.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
