import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { FileText, Upload, Plus, Trash2, Video, FileCheck } from 'lucide-react';
import { StudyMaterial } from '../../types';

export const TeacherMaterialPage: React.FC = () => {
  const { teacherProfile, user } = useAuth();
  const { success } = useToast();
  const teacherId = teacherProfile?.id || 'fac-01';
  const teacherName = teacherProfile?.fullName || user?.name || 'Faculty';

  const [materials, setMaterials] = useState(db.getStudyMaterials());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseId: 'crs-01',
    subject: 'मराठी व्याकरण',
    type: 'PDF' as StudyMaterial['type'],
    downloadUrl: '#sample-download',
    fileSize: '3.5 MB',
  });

  const courses = db.getCourses();

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const selectedCourse = courses.find(c => c.id === formData.courseId) || courses[0];
    const newMat: StudyMaterial = {
      id: `mat-${Date.now()}`,
      title: formData.title,
      description: formData.description || 'Uploaded by Faculty',
      courseId: formData.courseId,
      courseName: selectedCourse.name,
      subject: formData.subject,
      type: formData.type,
      fileSize: formData.fileSize,
      downloadUrl: formData.downloadUrl,
      uploadedBy: teacherId,
      uploadedByName: teacherName,
      uploadDate: new Date().toISOString().split('T')[0],
      downloadsCount: 0,
      isPublicForBatch: true,
    };

    db.saveStudyMaterial(newMat);
    setMaterials(db.getStudyMaterials());
    setIsAddModalOpen(false);
    success(`Study material "${newMat.title}" published successfully!`);
    setFormData({
      title: '',
      description: '',
      courseId: 'crs-01',
      subject: 'मराठी व्याकरण',
      type: 'PDF',
      downloadUrl: '#sample-download',
      fileSize: '3.5 MB',
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this study material?')) {
      db.deleteStudyMaterial(id);
      setMaterials(db.getStudyMaterials());
      success('Material removed.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            अभ्यास साहित्य व्यवस्थापन (Study Material Management)
          </h2>
          <p className="text-xs text-gray-500">Upload PDF notes, practice handouts, and video lecture links for your students.</p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setIsAddModalOpen(true)}
          className="shadow-glow-orange"
        >
          Upload New Material
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {materials.map(mat => (
          <Card key={mat.id} hoverEffect className="p-5 border border-gray-200 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-rajmudra-orange uppercase">{mat.subject}</span>
                  <h3 className="text-sm font-bold text-rajmudra-charcoal font-devanagari">{mat.title}</h3>
                  <p className="text-xs text-gray-500">{mat.courseName}</p>
                </div>
                <Badge variant={mat.type === 'VIDEO' ? 'red' : 'orange'} size="sm">
                  {mat.type}
                </Badge>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{mat.description}</p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-400">Uploaded {mat.uploadDate}</span>
              <button
                onClick={() => handleDelete(mat.id)}
                className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Upload Academic Study Material"
        subtitle="Publish notes or lecture video for enrolled students"
      >
        <form onSubmit={handleAddMaterial} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Title / Document Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              placeholder="e.g. मराठी व्याकरण समास विशेष शॉर्ट ट्रिक्स"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Target Course</label>
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
              <label className="block text-xs font-bold text-gray-700 mb-1">Material Type</label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white"
              >
                <option value="PDF">PDF Notes</option>
                <option value="DOCUMENT">Word Document</option>
                <option value="TEST_PAPER">Test Paper / Question Bank</option>
                <option value="VIDEO">Video Lecture Link</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              value={formData.subject}
              onChange={e => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="Provide a brief summary of what this document covers..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" className="w-full">
              Publish Study Material
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
