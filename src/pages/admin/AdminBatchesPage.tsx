import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { Layers, Plus, Edit, Trash2, Clock, Users, Calendar, MapPin } from 'lucide-react';
import { Batch } from '../../types';

export const AdminBatchesPage: React.FC = () => {
  const { success } = useToast();
  const [batches, setBatches] = useState(db.getBatches());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);

  const courses = db.getCourses();
  const teachers = db.getTeachers();

  const [formData, setFormData] = useState({
    name: '',
    batchCode: '',
    courseId: 'crs-01',
    teacherId: 'fac-01',
    startDate: '2026-09-01',
    endDate: '2027-02-28',
    startTime: '08:00 AM',
    endTime: '12:00 PM',
    days: 'Monday to Saturday',
    capacity: 60,
    room: 'Hall 1 (Ground Floor)',
    status: 'UPCOMING' as Batch['status'],
    mode: 'OFFLINE' as Batch['mode'],
  });

  const handleOpenAdd = () => {
    setEditingBatch(null);
    setFormData({
      name: '',
      batchCode: `BTC-${Math.floor(100 + Math.random() * 900)}`,
      courseId: courses[0]?.id || 'crs-01',
      teacherId: teachers[0]?.id || 'fac-01',
      startDate: '2026-09-01',
      endDate: '2027-02-28',
      startTime: '08:00 AM',
      endTime: '12:00 PM',
      days: 'Monday to Saturday',
      capacity: 60,
      room: 'Hall 1 (Ground Floor)',
      status: 'UPCOMING',
      mode: 'OFFLINE',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (batch: Batch) => {
    setEditingBatch(batch);
    setFormData({
      name: batch.name,
      batchCode: batch.batchCode,
      courseId: batch.courseId,
      teacherId: batch.teacherId,
      startDate: batch.startDate,
      endDate: batch.endDate,
      startTime: batch.startTime,
      endTime: batch.endTime,
      days: batch.days,
      capacity: batch.capacity,
      room: batch.room,
      status: batch.status,
      mode: batch.mode,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const course = courses.find(c => c.id === formData.courseId) || courses[0];
    const teacher = teachers.find(t => t.id === formData.teacherId) || teachers[0];

    const batchToSave: Batch = {
      id: editingBatch ? editingBatch.id : `btc-${Date.now()}`,
      batchCode: formData.batchCode,
      name: formData.name,
      courseId: formData.courseId,
      courseName: course.name,
      teacherId: formData.teacherId,
      teacherName: teacher.fullName,
      startDate: formData.startDate,
      endDate: formData.endDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      days: formData.days,
      capacity: Number(formData.capacity),
      enrolledCount: editingBatch ? editingBatch.enrolledCount : 0,
      room: formData.room,
      status: formData.status,
      mode: formData.mode,
    };

    db.saveBatch(batchToSave);
    setBatches(db.getBatches());
    setIsModalOpen(false);
    success(`Batch "${batchToSave.name}" saved successfully!`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this batch?')) {
      db.deleteBatch(id);
      setBatches(db.getBatches());
      success('Batch deleted.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            बॅचेस व्यवस्थापन (Batch Management CRUD)
          </h2>
          <p className="text-xs text-gray-500">Configure classroom schedules, faculty assignment, capacity and timings.</p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={handleOpenAdd}
          className="shadow-glow-orange"
        >
          Create New Batch
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map(batch => (
          <Card key={batch.id} hoverEffect className="p-6 border border-gray-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-rajmudra-orange bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
                  {batch.batchCode}
                </span>
                <Badge variant={batch.status === 'ONGOING' ? 'green' : 'orange'}>
                  {batch.status}
                </Badge>
              </div>

              <div>
                <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari">{batch.name}</h3>
                <p className="text-xs text-gray-500 font-medium">{batch.courseName}</p>
              </div>

              <div className="text-xs text-gray-700 bg-gray-50 p-3 rounded-xl space-y-1">
                <div>⏰ {batch.startTime} - {batch.endTime} ({batch.days})</div>
                <div>👨‍🏫 {batch.teacherName}</div>
                <div>📍 {batch.room}</div>
                <div>👥 {batch.enrolledCount} / {batch.capacity} Enrolled</div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">{batch.mode}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(batch)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit Batch"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(batch.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Batch"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Batch Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBatch ? 'Edit Batch Timetable' : 'Create New Batch'}
        subtitle="Assign course, faculty, room and timing"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Batch Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              placeholder="e.g. Police Bharti Morning Batch"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Course</label>
              <select
                value={formData.courseId}
                onChange={e => setFormData({ ...formData, courseId: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white"
              >
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Lead Teacher</label>
              <select
                value={formData.teacherId}
                onChange={e => setFormData({ ...formData, teacherId: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white"
              >
                {teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.fullName}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Timings</label>
              <input
                type="text"
                placeholder="07:00 AM - 11:30 AM"
                value={`${formData.startTime} - ${formData.endTime}`}
                onChange={e => {
                  const parts = e.target.value.split('-');
                  setFormData({ ...formData, startTime: parts[0]?.trim() || '', endTime: parts[1]?.trim() || '' });
                }}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Capacity</label>
              <input
                type="number"
                value={formData.capacity}
                onChange={e => setFormData({ ...formData, capacity: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Room / Hall</label>
              <input
                type="text"
                value={formData.room}
                onChange={e => setFormData({ ...formData, room: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white"
              >
                <option value="UPCOMING">Upcoming</option>
                <option value="ONGOING">Ongoing</option>
                <option value="FULL">Full</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" className="w-full">
              Save Batch
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

