import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import {
  Bell,
  Search,
  Calendar,
  Download,
  FileText,
  Pin,
  Filter,
} from 'lucide-react';

export const NoticesPage: React.FC = () => {
  const allNotices = db.getNotices();
  const { success } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { key: 'ALL', label: 'All Notices' },
    { key: 'EXAM_ALERT', label: 'Exam Alerts / GR' },
    { key: 'BATCH_SCHEDULE', label: 'Batch Timetable' },
    { key: 'ADMISSION', label: 'Admissions' },
    { key: 'RESULTS', label: 'Results' },
    { key: 'HOLIDAY', label: 'Holidays' },
  ];

  const filteredNotices = allNotices.filter(notice => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.authorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || notice.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleDownload = (filename: string) => {
    success(`Downloading document: ${filename}`);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="bg-rajmudra-black text-white py-14 sm:py-16 border-b-2 border-rajmudra-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <Badge variant="orange">अधिकृत सूचना फलक • NOTICE BOARD</Badge>
          <h1 className="text-3xl sm:text-5xl font-black font-devanagari">
            नवीनतम परीक्षा सूचना व परिपत्रके
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            महाराष्ट्र शासन भरती जाहिराती, अकॅडमी टेस्ट सिरीज, वेळापत्रक व महत्त्वाच्या घोषणा.
          </p>
        </div>
      </section>

      {/* Filter and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-rajmudra-orange text-white shadow-glow-orange'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search circulars..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rajmudra-orange"
            />
          </div>
        </div>
      </div>

      {/* Notices List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {filteredNotices.map(notice => (
          <Card key={notice.id} hoverEffect className="p-6 border-l-4 border-l-rajmudra-orange space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                {notice.isPinned && (
                  <span className="flex items-center gap-1 text-[11px] font-black bg-orange-100 text-rajmudra-orange px-2.5 py-0.5 rounded-full border border-orange-300">
                    <Pin className="w-3 h-3" /> Pinned
                  </span>
                )}
                <Badge variant="orange">{notice.category}</Badge>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-rajmudra-orange" />
                  Published on {notice.publishDate}
                </span>
              </div>
              <span className="text-xs text-gray-500">By {notice.authorName}</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-bold text-rajmudra-charcoal font-devanagari">
                {notice.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {notice.description}
              </p>
            </div>

            {notice.attachmentName && (
              <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50 p-3.5 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-rajmudra-orange" />
                  <div>
                    <div className="text-xs font-bold text-rajmudra-charcoal">{notice.attachmentName}</div>
                    <div className="text-[10px] text-gray-500">PDF Document • {notice.attachmentSize || '1.5 MB'}</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Download className="w-4 h-4" />}
                  onClick={() => handleDownload(notice.attachmentName!)}
                  className="text-xs"
                >
                  Download PDF Copy
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

