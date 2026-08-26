import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Search, Mail, Phone, GraduationCap, MapPin } from 'lucide-react';

export const TeacherStudentsPage: React.FC = () => {
  const students = db.getStudents();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = students.filter(s =>
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            विद्यार्थी यादी (My Students Roster)
          </h2>
          <p className="text-xs text-gray-500">Student roster across your assigned courses and batches.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rajmudra-orange"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(student => (
          <Card key={student.id} hoverEffect className="p-5 border border-gray-200 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={student.avatar}
                alt={student.fullName}
                className="w-12 h-12 rounded-full object-cover border border-rajmudra-orange shadow-sm"
              />
              <div>
                <h3 className="text-sm font-bold text-rajmudra-charcoal">{student.fullName}</h3>
                <p className="text-xs font-bold text-rajmudra-orange font-mono">{student.studentId}</p>
                <Badge variant="green" size="sm">Active</Badge>
              </div>
            </div>

            <div className="space-y-1 text-xs text-gray-600 border-t pt-3">
              <div className="flex items-center gap-2 truncate">
                <Mail className="w-3.5 h-3.5 text-rajmudra-orange flex-shrink-0" />
                <span className="truncate">{student.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-rajmudra-orange flex-shrink-0" />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-rajmudra-orange flex-shrink-0" />
                <span>{student.education.qualification}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rajmudra-orange flex-shrink-0" />
                <span>{student.address.city}, {student.address.district}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
