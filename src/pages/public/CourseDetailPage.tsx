import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../../services/db';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import {
  Clock,
  Calendar,
  CheckCircle2,
  Users,
  Award,
  BookOpen,
  HelpCircle,
  MapPin,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';

export const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const course = db.getCourseBySlug(slug || '');
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Course Not Found</h2>
        <p className="text-sm text-gray-600">The course you are looking for does not exist or has been updated.</p>
        <Button variant="primary" onClick={() => navigate('/courses')}>
          Browse All Courses
        </Button>
      </div>
    );
  }

  const batches = db.getBatchesByCourseId(course.id);
  const teachers = db.getTeachers().filter(t => t.assignedCourseIds.includes(course.id));

  return (
    <div className="space-y-12 pb-20">
      {/* Course Hero Banner */}
      <section className="bg-rajmudra-black text-white py-14 sm:py-18 border-b-2 border-rajmudra-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="orange">{course.categoryLabel}</Badge>
                <span className="text-xs text-gray-400">Duration: {course.durationText}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-devanagari leading-tight">
                {course.name}
              </h1>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {course.fullDescription}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-rajmudra-orange" />
                  <span>100% Comprehensive Coverage</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-rajmudra-orange" />
                  <span>Daily Offline + Online Support</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-rajmudra-orange" />
                  <span>Physical Ground Drill</span>
                </div>
              </div>
            </div>

            {/* Quick Pricing Card */}
            <div className="lg:col-span-4">
              <Card className="p-6 bg-rajmudra-charcoal text-white border-2 border-rajmudra-orange space-y-4 shadow-premium-dark">
                <div className="space-y-1">
                  <div className="text-xs text-gray-400">Total Admission Fee</div>
                  <div className="text-3xl font-black text-white flex items-baseline gap-2">
                    <span>₹{course.discountedFees ? course.discountedFees.toLocaleString('en-IN') : course.fees.toLocaleString('en-IN')}</span>
                    {course.discountedFees && (
                      <span className="text-sm text-gray-400 line-through font-normal">
                        ₹{course.fees.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold">
                    Includes Study Material, OMR Test Series & Library
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-rajmudra-charcoal-light text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span>Course Duration:</span>
                    <strong className="text-white">{course.durationText}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Mode of Study:</span>
                    <strong className="text-white">Offline + Hybrid</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Batches:</span>
                    <strong className="text-rajmudra-orange">{batches.length} Batches Enrolling</strong>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full shadow-glow-orange"
                  onClick={() => navigate(`/apply?courseId=${course.id}`)}
                >
                  Apply Online Now
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (Syllabus, Eligibility, Features) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Eligibility */}
            <Card className="p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-rajmudra-charcoal font-devanagari flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-rajmudra-orange" />
                पात्रता व निकष (Eligibility Criteria)
              </h2>
              <ul className="space-y-2.5 text-sm text-gray-700">
                {course.eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-rajmudra-orange flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Detailed Syllabus Accordion */}
            <Card className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-rajmudra-charcoal font-devanagari flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-rajmudra-orange" />
                  सविस्तर अभ्यासक्रम (Detailed Syllabus & Modules)
                </h2>
                <span className="text-xs text-gray-500 font-semibold">
                  {course.syllabus.length} Modules
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {course.syllabus.map((mod, idx) => {
                  const isOpen = expandedModule === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setExpandedModule(isOpen ? null : idx)}
                        className={`w-full p-4 text-left font-bold text-sm sm:text-base flex items-center justify-between transition-colors ${
                          isOpen ? 'bg-orange-50/80 text-rajmudra-orange' : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        <span className="font-devanagari">{mod.moduleTitle}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-normal text-gray-500">{mod.hours} Hours</span>
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="p-4 bg-white border-t border-gray-200 space-y-2">
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Topics Covered:</div>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
                            {mod.topics.map((t, tIdx) => (
                              <li key={tIdx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-rajmudra-orange rounded-full" />
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Course Features */}
            <Card className="p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-rajmudra-charcoal font-devanagari">
                अभ्यासक्रमाची वैशिष्ट्ये (Key Course Highlights)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {course.features.map((feat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-orange-50/50 border border-orange-200 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-rajmudra-orange flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-gray-800 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column (Assigned Batches & Faculty) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Active Batches */}
            <Card className="p-6 space-y-4">
              <h3 className="text-base font-bold text-rajmudra-charcoal flex items-center justify-between border-b pb-3">
                <span>Available Batches</span>
                <Badge variant="orange">{batches.length}</Badge>
              </h3>

              {batches.length === 0 ? (
                <p className="text-xs text-gray-500">No active batches listed right now. Contact admission desk.</p>
              ) : (
                <div className="space-y-4">
                  {batches.map(batch => (
                    <div key={batch.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rajmudra-orange">{batch.batchCode}</span>
                        <Badge variant="green" size="sm">{batch.status}</Badge>
                      </div>
                      <h4 className="text-xs font-bold text-rajmudra-charcoal font-devanagari">{batch.name}</h4>
                      <div className="text-[11px] text-gray-600 space-y-0.5">
                        <div>⏰ {batch.startTime} - {batch.endTime}</div>
                        <div>📅 {batch.days}</div>
                        <div>👨‍🏫 {batch.teacherName}</div>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full text-xs mt-2"
                        onClick={() => navigate(`/apply?courseId=${course.id}&batchId=${batch.id}`)}
                      >
                        Enroll in this Batch
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Assigned Faculty */}
            <Card className="p-6 space-y-4">
              <h3 className="text-base font-bold text-rajmudra-charcoal border-b pb-3">
                Instructors for this Course
              </h3>
              <div className="space-y-3">
                {teachers.map(teacher => (
                  <div key={teacher.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50">
                    <img
                      src={teacher.avatar}
                      alt={teacher.fullName}
                      className="w-12 h-12 rounded-full object-cover border border-rajmudra-orange shadow-sm"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-rajmudra-charcoal">{teacher.fullName}</h4>
                      <p className="text-[11px] text-rajmudra-orange font-medium">{teacher.subject}</p>
                      <p className="text-[10px] text-gray-500">{teacher.experienceYears}+ Years Exp</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
