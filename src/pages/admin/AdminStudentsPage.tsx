import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { Search, Eye, Edit, UserCheck, ShieldAlert, GraduationCap } from 'lucide-react';
import { StudentProfile } from '../../types';

export const AdminStudentsPage: React.FC = () => {
  const { success } = useToast();
  const [students, setStudents] = useState(db.getStudents());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  const filtered = students.filter(s =>
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.phone.includes(searchTerm)
  );

  const toggleStatus = (student: StudentProfile) => {
    const newStatus = student.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    const updated = { ...student, status: newStatus as any };
    db.saveStudent(updated);
    setStudents(db.getStudents());
    success(`Student ${student.fullName} status updated to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            विद्यार्थी व्यवस्थापन (Student Master Directory)
          </h2>
          <p className="text-xs text-gray-500">Manage enrolled student profiles, activation status, and contact records.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
          />
        </div>
      </div>

      <Card className="overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Student ID</th>
                <th className="p-4">Name & Contact</th>
                <th className="p-4">Qualification</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(student => (
                <tr key={student.id} className="hover:bg-gray-50/80">
                  <td className="p-4 font-mono font-bold text-rajmudra-orange">{student.studentId}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={student.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover border" />
                      <div>
                        <div className="font-bold text-rajmudra-charcoal">{student.fullName}</div>
                        <div className="text-[11px] text-gray-500">{student.phone} | {student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{student.education.qualification} ({student.education.percentage})</td>
                  <td className="p-4 text-gray-600">{student.address.city}, {student.address.district}</td>
                  <td className="p-4">
                    <Badge variant={student.status === 'ACTIVE' ? 'green' : 'gray'} size="sm">
                      {student.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => toggleStatus(student)}
                      className={`text-xs font-bold px-2 py-1 rounded transition-colors ${
                        student.status === 'ACTIVE' ? 'text-amber-700 hover:bg-amber-50' : 'text-green-700 hover:bg-green-50'
                      }`}
                    >
                      {student.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                    </button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedStudent(student)}
                      className="text-xs"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Student Details Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Student: ${selectedStudent.fullName}`}
          subtitle={`ID: ${selectedStudent.studentId}`}
        >
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div>
                <span className="text-[10px] text-gray-500 uppercase">Contact & DOB</span>
                <div className="font-bold">{selectedStudent.email}</div>
                <div>{selectedStudent.phone}</div>
                <div>DOB: {selectedStudent.dob} ({selectedStudent.gender})</div>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase">Parent / Guardian</span>
                <div className="font-bold">{selectedStudent.guardian.name} ({selectedStudent.guardian.relation})</div>
                <div>{selectedStudent.guardian.phone}</div>
                <div>{selectedStudent.guardian.occupation}</div>
              </div>
            </div>

            <div className="p-4 bg-orange-50/60 rounded-xl border border-orange-200">
              <span className="text-[10px] text-gray-500 uppercase">Address</span>
              <div className="font-medium text-rajmudra-charcoal">
                {selectedStudent.address.street}, {selectedStudent.address.city}, {selectedStudent.address.district}, Maharashtra - {selectedStudent.address.pincode}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
