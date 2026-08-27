import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { UserCheck, Plus, Mail, Phone, GraduationCap } from 'lucide-react';
import { TeacherProfile } from '../../types';

export const AdminTeachersPage: React.FC = () => {
  const { success } = useToast();
  const [teachers, setTeachers] = useState(db.getTeachers());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    qualification: '',
    experienceYears: 5,
    bio: '',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  });

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    const teacherCode = `RMA-FAC-${Math.floor(100 + Math.random() * 900)}`;
    const newTeach: TeacherProfile = {
      id: `fac-${Date.now()}`,
      userId: `usr-${Date.now()}`,
      teacherId: teacherCode,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      qualification: formData.qualification,
      experienceYears: Number(formData.experienceYears),
      bio: formData.bio || 'Faculty Instructor at Rajmudra Academy',
      avatar: formData.avatar,
      assignedCourseIds: ['crs-01'],
      assignedBatchIds: ['btc-01'],
      status: 'ACTIVE',
    };

    db.saveTeacher(newTeach);
    setTeachers(db.getTeachers());
    setIsAddModalOpen(false);
    success(`Faculty ${newTeach.fullName} added successfully!`);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      qualification: '',
      experienceYears: 5,
      bio: '',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            प्राध्यापक व्यवस्थापन (Faculty Management)
          </h2>
          <p className="text-xs text-gray-500">Manage instructor profiles, course allocations, and teaching credentials.</p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setIsAddModalOpen(true)}
          className="shadow-glow-orange"
        >
          Add New Instructor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map(teacher => (
          <Card key={teacher.id} hoverEffect className="p-6 border border-gray-200 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={teacher.avatar}
                  alt={teacher.fullName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-rajmudra-orange shadow-sm"
                />
                <div>
                  <h3 className="text-base font-bold text-rajmudra-charcoal">{teacher.fullName}</h3>
                  <p className="text-xs font-bold text-rajmudra-orange">{teacher.teacherId}</p>
                </div>
              </div>

              <div className="text-xs text-gray-600 space-y-1 bg-gray-50 p-3 rounded-xl">
                <div>📚 <strong>Subject:</strong> {teacher.subject}</div>
                <div>🎓 <strong>Edu:</strong> {teacher.qualification}</div>
                <div>⏳ <strong>Exp:</strong> {teacher.experienceYears}+ Years</div>
              </div>

              <p className="text-xs text-gray-600 line-clamp-2 italic">
                "{teacher.bio}"
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
              <span>{teacher.assignedBatchIds.length} Batches Assigned</span>
              <Badge variant="blue" size="sm">Active</Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Teacher Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Faculty Member"
        subtitle="Create an instructor profile and credential"
      >
        <form onSubmit={handleAddTeacher} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              placeholder="e.g. Prof. Sandip Patil"
              value={formData.fullName}
              onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                required
                placeholder="teacher@rajmudra.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                placeholder="98220 12345"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Subject Specialization</label>
              <input
                type="text"
                placeholder="e.g. General Studies & Polity"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Experience (Years)</label>
              <input
                type="number"
                value={formData.experienceYears}
                onChange={e => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Biography / Introduction</label>
            <textarea
              rows={3}
              placeholder="Brief teaching experience summary..."
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" className="w-full">
              Save & Assign Faculty
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

