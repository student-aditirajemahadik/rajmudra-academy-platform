import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { HelpCircle, Plus, Trash2, Clock, Award } from 'lucide-react';
import { Test, Question } from '../../types';

export const TeacherTestsPage: React.FC = () => {
  const { teacherProfile, user } = useAuth();
  const { success } = useToast();
  const teacherName = teacherProfile?.fullName || user?.name || 'Faculty';

  const [tests, setTests] = useState(db.getTests());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseId: 'crs-01',
    subject: 'General Studies / Marathi',
    durationMinutes: 30,
    totalMarks: 50,
    passingMarks: 20,
  });

  const courses = db.getCourses();

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const selectedCourse = courses.find(c => c.id === formData.courseId) || courses[0];
    const testCode = `RMA-TST-${Math.floor(100 + Math.random() * 900)}`;

    const newTest: Test = {
      id: `tst-${Date.now()}`,
      testCode,
      title: formData.title,
      description: formData.description || 'Weekly MCQ Assessment Test',
      courseId: formData.courseId,
      courseName: selectedCourse.name,
      subject: formData.subject,
      durationMinutes: Number(formData.durationMinutes),
      totalMarks: Number(formData.totalMarks),
      passingMarks: Number(formData.passingMarks),
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 15 * 86400000).toISOString(),
      status: 'ACTIVE',
      totalQuestions: 10,
      createdByName: teacherName,
      questions: [
        {
          id: `q-${Date.now()}-1`,
          questionText: 'महाराष्ट्राची उपराजधानी कोणती आहे?',
          options: [
            { key: 'A', text: 'पुणे' },
            { key: 'B', text: 'नागपूर' },
            { key: 'C', text: 'नाशिक' },
            { key: 'D', text: 'औरंगाबाद' },
          ],
          correctOption: 'B',
          explanation: 'नागपूर ही महाराष्ट्राची अधिकृत उपराजधानी आहे.',
          marks: 5,
          negativeMarks: 1.25,
          subject: 'भूगोल',
        },
      ],
    };

    db.saveTest(newTest);
    setTests(db.getTests());
    setIsCreateModalOpen(false);
    success(`Test ${testCode} created & published for students!`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      db.deleteTest(id);
      setTests(db.getTests());
      success('Test removed.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            चाचणी व परीक्षा निर्मिती (Test Management Center)
          </h2>
          <p className="text-xs text-gray-500">Create timed MCQ mock tests, configure passing marks, and publish for batches.</p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setIsCreateModalOpen(true)}
          className="shadow-glow-orange"
        >
          Create New Mock Test
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tests.map(test => (
          <Card key={test.id} hoverEffect className="p-6 border border-gray-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-rajmudra-orange bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
                  {test.testCode}
                </span>
                <Badge variant={test.status === 'ACTIVE' ? 'green' : 'gray'}>
                  {test.status}
                </Badge>
              </div>

              <div>
                <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari">{test.title}</h3>
                <p className="text-xs text-gray-500">{test.courseName}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 bg-gray-50 p-3 rounded-xl">
                <div>⏱️ {test.durationMinutes} Minutes</div>
                <div>🎯 {test.totalMarks} Total Marks</div>
                <div>✅ {test.passingMarks} Passing Marks</div>
                <div>❓ {test.totalQuestions || 10} MCQs</div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-500">By {test.createdByName}</span>
              <button
                onClick={() => handleDelete(test.id)}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Test"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Online MCQ Examination"
        subtitle="Set up questions, timer and scoring for competitive exam prep"
      >
        <form onSubmit={handleCreateTest} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Test Title (परीक्षेचे नाव) <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              placeholder="e.g. पोलीस भरती साप्ताहिक महासराव चाचणी ०२"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
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
              <label className="block text-xs font-bold text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Duration (Mins)</label>
              <input
                type="number"
                value={formData.durationMinutes}
                onChange={e => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Total Marks</label>
              <input
                type="number"
                value={formData.totalMarks}
                onChange={e => setFormData({ ...formData, totalMarks: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Passing Marks</label>
              <input
                type="number"
                value={formData.passingMarks}
                onChange={e => setFormData({ ...formData, passingMarks: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" className="w-full">
              Publish Online Test
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

