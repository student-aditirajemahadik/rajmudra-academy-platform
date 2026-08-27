import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { BookOpen, CheckCircle2, Clock, Award, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StudentCoursePage: React.FC = () => {
  const { studentProfile } = useAuth();
  const courses = db.getCourses().filter(c => studentProfile?.enrolledCourseIds?.includes(c.id) || c.id === 'crs-01');
  const course = courses[0] || db.getCourses()[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
          माझा अभ्यासक्रम (My Enrolled Course)
        </h2>
        <p className="text-xs text-gray-500">Course curriculum, syllabus coverage, and learning progress.</p>
      </div>

      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b">
          <div className="space-y-1">
            <Badge variant="orange">{course.categoryLabel}</Badge>
            <h3 className="text-2xl font-bold text-rajmudra-charcoal font-devanagari">{course.name}</h3>
            <p className="text-xs text-gray-500">Duration: {course.durationText} | Full Batch Enrolled</p>
          </div>
          <Link to="/student/material">
            <Button variant="primary" size="sm" leftIcon={<FileText className="w-4 h-4" />}>
              View Study Materials
            </Button>
          </Link>
        </div>

        {/* Syllabus Progress Modules */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-rajmudra-charcoal uppercase tracking-wider font-devanagari">
            अभ्यासक्रम घटक व सखोल प्रकरणे (Modules & Topics)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.syllabus.map((mod, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-bold text-rajmudra-charcoal font-devanagari">{mod.moduleTitle}</h5>
                  <span className="text-xs text-rajmudra-orange font-bold">{mod.hours} Hrs</span>
                </div>

                <ul className="space-y-1.5 text-xs text-gray-600">
                  {mod.topics.map((top, tIdx) => (
                    <li key={tIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                      <span>{top}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

