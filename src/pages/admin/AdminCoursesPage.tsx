import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { BookOpen, Plus, Edit, Trash2, Clock, Check } from 'lucide-react';
import { Course } from '../../types';

export const AdminCoursesPage: React.FC = () => {
  const { success } = useToast();
  const [courses, setCourses] = useState(db.getCourses());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'POLICE_BHARTI' as Course['category'],
    categoryLabel: 'Police Bharti',
    shortDescription: '',
    fullDescription: '',
    durationMonths: 6,
    durationText: '6 Months',
    fees: 18000,
    discountedFees: 15000,
    thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800',
    isFeatured: true,
    isActive: true,
  });

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setFormData({
      name: '',
      slug: '',
      category: 'POLICE_BHARTI',
      categoryLabel: 'Police Bharti',
      shortDescription: '',
      fullDescription: '',
      durationMonths: 6,
      durationText: '6 Months',
      fees: 18000,
      discountedFees: 15000,
      thumbnail: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800',
      isFeatured: true,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      name: course.name,
      slug: course.slug,
      category: course.category,
      categoryLabel: course.categoryLabel,
      shortDescription: course.shortDescription,
      fullDescription: course.fullDescription,
      durationMonths: course.durationMonths,
      durationText: course.durationText,
      fees: course.fees,
      discountedFees: course.discountedFees || course.fees,
      thumbnail: course.thumbnail,
      isFeatured: course.isFeatured,
      isActive: course.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const courseSlug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const courseToSave: Course = {
      id: editingCourse ? editingCourse.id : `crs-${Date.now()}`,
      name: formData.name,
      slug: courseSlug,
      category: formData.category,
      categoryLabel: formData.categoryLabel,
      shortDescription: formData.shortDescription,
      fullDescription: formData.fullDescription,
      durationMonths: Number(formData.durationMonths),
      durationText: formData.durationText,
      fees: Number(formData.fees),
      discountedFees: Number(formData.discountedFees),
      eligibility: editingCourse ? editingCourse.eligibility : ['12th / Graduate as per norms', 'Fit physically & mentally'],
      syllabus: editingCourse ? editingCourse.syllabus : [
        { moduleTitle: 'Module 1: General Studies & Core Syllabus', topics: ['Foundation', 'Core Practice', 'Exam Shortcuts'], hours: 60 }
      ],
      features: editingCourse ? editingCourse.features : ['Daily Test Series', 'Study Material Included'],
      thumbnail: formData.thumbnail,
      isFeatured: formData.isFeatured,
      isActive: formData.isActive,
    };

    db.saveCourse(courseToSave);
    setCourses(db.getCourses());
    setIsModalOpen(false);
    success(`Course "${courseToSave.name}" saved successfully!`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      db.deleteCourse(id);
      setCourses(db.getCourses());
      success('Course deleted.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            अभ्यासक्रम व्यवस्थापन (Course Management CRUD)
          </h2>
          <p className="text-xs text-gray-500">Create, edit and manage public academy courses, fees and syllabi.</p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={handleOpenAdd}
          className="shadow-glow-orange"
        >
          Add New Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <Card key={course.id} hoverEffect className="overflow-hidden border border-gray-200 flex flex-col justify-between">
            <div>
              <div className="relative h-40 overflow-hidden">
                <img src={course.thumbnail} alt={course.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2">
                  <span className="bg-rajmudra-orange text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {course.categoryLabel}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari line-clamp-1">{course.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{course.shortDescription}</p>

                <div className="flex items-center justify-between pt-2 text-xs font-bold text-rajmudra-charcoal">
                  <span>Fee: ₹{course.discountedFees || course.fees}</span>
                  <span className="text-gray-500 font-normal">{course.durationText}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-400 font-mono">/{course.slug}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(course)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit Course"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Course Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCourse ? 'Edit Course Details' : 'Create New Academy Course'}
        subtitle="Manage program name, fees, duration and category"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Course Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              required
              placeholder="e.g. Maharashtra Police Bharti 2026"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as any, categoryLabel: e.target.selectedOptions[0].text })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white"
              >
                <option value="POLICE_BHARTI">Police Bharti</option>
                <option value="MPSC_CIVIL">MPSC Rajyaseva</option>
                <option value="MPSC_COMBINED">MPSC Combined</option>
                <option value="TALATHI_SARALSEVA">Talathi & Saral Seva</option>
                <option value="BANKING_SSC">Banking & SSC</option>
                <option value="DEFENCE_ARMY">Defence & Agniveer</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Duration Text</label>
              <input
                type="text"
                placeholder="e.g. 6 Months"
                value={formData.durationText}
                onChange={e => setFormData({ ...formData, durationText: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Standard Fee (₹)</label>
              <input
                type="number"
                value={formData.fees}
                onChange={e => setFormData({ ...formData, fees: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Discounted Fee (₹)</label>
              <input
                type="number"
                value={formData.discountedFees}
                onChange={e => setFormData({ ...formData, discountedFees: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Short Description</label>
            <textarea
              rows={2}
              value={formData.shortDescription}
              onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 text-rajmudra-orange rounded"
              />
              <span>Featured on Homepage</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-rajmudra-orange rounded"
              />
              <span>Active for Admissions</span>
            </label>
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" className="w-full">
              Save Course Configuration
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

