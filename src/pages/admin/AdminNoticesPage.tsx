import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { Bell, Plus, Trash2, Pin } from 'lucide-react';
import { Notice } from '../../types';

export const AdminNoticesPage: React.FC = () => {
  const { success } = useToast();
  const [notices, setNotices] = useState(db.getNotices());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'EXAM_ALERT' as Notice['category'],
    targetAudience: 'ALL' as Notice['targetAudience'],
    isPinned: false,
    attachmentName: '',
  });

  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const newNotice: Notice = {
      id: `not-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      publishDate: new Date().toISOString().split('T')[0],
      targetAudience: formData.targetAudience,
      isPinned: formData.isPinned,
      authorName: 'Director Sandip Patil',
      attachmentName: formData.attachmentName || undefined,
      attachmentSize: formData.attachmentName ? '1.8 MB' : undefined,
    };

    db.saveNotice(newNotice);
    setNotices(db.getNotices());
    setIsModalOpen(false);
    success(`Notice "${newNotice.title}" published!`);
    setFormData({
      title: '',
      description: '',
      category: 'EXAM_ALERT',
      targetAudience: 'ALL',
      isPinned: false,
      attachmentName: '',
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete notice?')) {
      db.deleteNotice(id);
      setNotices(db.getNotices());
      success('Notice deleted.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            सूचना व परिपत्रक व्यवस्थापन (Notice Board Management)
          </h2>
          <p className="text-xs text-gray-500">Publish exam notifications, circulars and holiday updates with target audience controls.</p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
          className="shadow-glow-orange"
        >
          Publish New Notice
        </Button>
      </div>

      <div className="space-y-4">
        {notices.map(notice => (
          <Card key={notice.id} hoverEffect className="p-6 border-l-4 border-l-rajmudra-orange flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {notice.isPinned && (
                    <span className="text-[10px] font-bold bg-orange-100 text-rajmudra-orange px-2 py-0.5 rounded">Pinned</span>
                  )}
                  <Badge variant="orange">{notice.category}</Badge>
                  <span className="text-xs text-gray-500">{notice.publishDate}</span>
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Target: {notice.targetAudience}
                </span>
              </div>

              <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari">{notice.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{notice.description}</p>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">By {notice.authorName}</span>
              <button
                onClick={() => handleDelete(notice.id)}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Notice"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Publish Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Publish Official Academy Notice"
        subtitle="Broadcast to students, faculty or all website visitors"
      >
        <form onSubmit={handleSaveNotice} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Notice Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              placeholder="e.g. महाराष्ट्र पोलीस भरती २०२६ अधिकृत जाहिरात"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white"
              >
                <option value="EXAM_ALERT">Exam Alert / GR</option>
                <option value="BATCH_SCHEDULE">Batch Schedule</option>
                <option value="ADMISSION">Admission</option>
                <option value="RESULTS">Results</option>
                <option value="HOLIDAY">Holiday</option>
                <option value="GENERAL">General Notice</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Target Audience</label>
              <select
                value={formData.targetAudience}
                onChange={e => setFormData({ ...formData, targetAudience: e.target.value as any })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white"
              >
                <option value="ALL">ALL (Public + Portals)</option>
                <option value="STUDENTS">STUDENTS Only</option>
                <option value="TEACHERS">TEACHERS Only</option>
                <option value="SPECIFIC_BATCH">Specific Batch</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Notice Description</label>
            <textarea
              rows={3}
              placeholder="Enter full notice announcement details..."
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Optional PDF Attachment Name</label>
            <input
              type="text"
              placeholder="e.g. Police_Bharti_Official_GR.pdf"
              value={formData.attachmentName}
              onChange={e => setFormData({ ...formData, attachmentName: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
            />
          </div>

          <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPinned}
              onChange={e => setFormData({ ...formData, isPinned: e.target.checked })}
              className="w-4 h-4 text-rajmudra-orange rounded"
            />
            <span>Pin this notice to top of public notice board</span>
          </label>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" className="w-full">
              Publish Notice
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

