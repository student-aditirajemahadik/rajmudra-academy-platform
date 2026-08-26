import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../services/db';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Search, Clock, Users, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const allCourses = db.getCourses().filter(c => c.isActive);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { key: 'ALL', label: 'All Programs' },
    { key: 'POLICE_BHARTI', label: 'Police Bharti' },
    { key: 'MPSC_CIVIL', label: 'MPSC Rajyaseva' },
    { key: 'MPSC_COMBINED', label: 'MPSC Combined PSI/STI' },
    { key: 'TALATHI_SARALSEVA', label: 'Talathi & Saral Seva' },
    { key: 'BANKING_SSC', label: 'Banking & SSC' },
    { key: 'DEFENCE_ARMY', label: 'Defence & Agniveer' },
  ];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="bg-rajmudra-black text-white py-14 sm:py-16 border-b-2 border-rajmudra-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <Badge variant="orange">अकॅडमी कोर्सेस • COURSES & ADMISSIONS</Badge>
          <h1 className="text-3xl sm:text-5xl font-black font-devanagari">
            राजमुद्रा करिअर अभ्यासक्रम
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            लेखी परीक्षा, सराव चाचण्या आणि मैदानी तयारीसाठी महाराष्ट्रातील सर्वोत्तम प्रशिक्षण अभ्यासक्रम.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-rajmudra-orange text-white shadow-glow-orange'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses by keyword..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rajmudra-orange focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 space-y-3">
            <BookOpen className="w-10 h-10 text-gray-400 mx-auto" />
            <h3 className="text-base font-bold text-gray-700">No courses match your search criteria.</h3>
            <p className="text-xs text-gray-500">Try clearing filters or search terms.</p>
            <Button variant="secondary" size="sm" onClick={() => { setSearchTerm(''); setSelectedCategory('ALL'); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <Card key={course.id} hoverEffect className="overflow-hidden flex flex-col justify-between border-gray-200 group">
                <div>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-rajmudra-orange text-white text-[11px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow">
                        {course.categoryLabel}
                      </span>
                      {course.isFeatured && (
                        <span className="bg-amber-400 text-rajmudra-black text-[11px] font-black px-2 py-0.5 rounded-lg shadow">
                          ★ Featured
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-3 left-3 text-xs text-white font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-rajmudra-orange" />
                      <span>{course.durationText}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-rajmudra-charcoal font-devanagari group-hover:text-rajmudra-orange transition-colors">
                      {course.name}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {course.shortDescription}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      {course.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-gray-500 font-semibold">Total Fee</div>
                        <div className="text-xl font-black text-rajmudra-charcoal">
                          ₹{course.discountedFees ? course.discountedFees.toLocaleString('en-IN') : course.fees.toLocaleString('en-IN')}
                          {course.discountedFees && (
                            <span className="text-xs text-gray-400 line-through ml-2 font-normal">
                              ₹{course.fees.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        Admissions Open
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/courses/${course.slug}`)}
                    className="w-full text-xs"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/apply?courseId=${course.id}`)}
                    className="w-full text-xs shadow-glow-orange"
                  >
                    Apply Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
