import React from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Bell, Pin } from 'lucide-react';

export const TeacherNoticesPage: React.FC = () => {
  const notices = db.getNotices();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
          प्राध्यापक सूचना फलक (Faculty Circulars)
        </h2>
        <p className="text-xs text-gray-500">Academy administrative circulars, exam schedules, and holiday announcements.</p>
      </div>

      <div className="space-y-4">
        {notices.map(notice => (
          <Card key={notice.id} hoverEffect className="p-6 border-l-4 border-l-rajmudra-orange space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {notice.isPinned && (
                  <span className="text-[10px] font-bold bg-orange-100 text-rajmudra-orange px-2 py-0.5 rounded">Pinned</span>
                )}
                <Badge variant="orange">{notice.category}</Badge>
                <span className="text-gray-500">{notice.publishDate}</span>
              </div>
              <span className="text-gray-500">By {notice.authorName}</span>
            </div>
            <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari">{notice.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{notice.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
