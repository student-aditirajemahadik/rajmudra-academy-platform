import React from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Award, BookOpen, GraduationCap, CheckCircle2, Star } from 'lucide-react';

export const FacultyPage: React.FC = () => {
  const teachers = db.getTeachers();

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="bg-rajmudra-black text-white py-14 sm:py-16 border-b-2 border-rajmudra-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <Badge variant="orange">मार्गदर्शक मंडळ • EXPERT FACULTY</Badge>
          <h1 className="text-3xl sm:text-5xl font-black font-devanagari">
            राजमुद्रेचे तज्ज्ञ प्राध्यापक व प्रशिक्षक
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            विद्यार्थ्यांच्या यशासाठी अहोरात्र झटणारे, समृद्ध अध्यापन अनुभव आणि स्पर्धा परीक्षेची सखोल समज असणारे मार्गदर्शक.
          </p>
        </div>
      </section>

      {/* Faculty Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map(teacher => (
            <Card key={teacher.id} hoverEffect className="overflow-hidden border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="p-6 text-center space-y-4 bg-gradient-to-b from-orange-50/50 to-white border-b border-gray-100">
                  <img
                    src={teacher.avatar}
                    alt={teacher.fullName}
                    className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-rajmudra-orange shadow-md"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-rajmudra-charcoal font-devanagari">{teacher.fullName}</h3>
                    <p className="text-xs font-bold text-rajmudra-orange mt-0.5">{teacher.subject}</p>
                    <p className="text-xs text-gray-500 font-medium mt-1">{teacher.qualification}</p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl">
                    <span className="font-semibold">Teaching Experience:</span>
                    <strong className="text-rajmudra-charcoal">{teacher.experienceYears}+ Years</strong>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed italic">
                    "{teacher.bio}"
                  </p>

                  {teacher.achievements && teacher.achievements.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Achievements & Roles:</div>
                      {teacher.achievements.map((ach, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                          <Star className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 fill-amber-400" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                <span className="text-xs font-bold text-rajmudra-orange">
                  Active Faculty Member • Rajmudra Academy
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

