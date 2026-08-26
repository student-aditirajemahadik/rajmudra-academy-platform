import React from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { Bell, Calendar, Download, Pin, FileText } from 'lucide-react';

export const StudentNoticesPage: React.FC = () => {
  const notices = db.getNotices();
  const { success } = useToast();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
          सूचना व परिपत्रके (Official Notices & Circulars)
        </h2>
        <p className="text-xs text-gray-500">Official circulars, batch timetables, exam alerts, and holiday notifications.</p>
      </div>

      <div className="space-y-4">
        {notices.map(notice => (
          <Card key={notice.id} hoverEffect className="p-6 border-l-4 border-l-rajmudra-orange space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {notice.isPinned && (
                  <span className="flex items-center gap-1 text-[10px] font-bold bg-orange-100 text-rajmudra-orange px-2 py-0.5 rounded">
                    <Pin className="w-3 h-3" /> Pinned
                  </span>
                )}
                <Badge variant="orange">{notice.category}</Badge>
                <span className="text-xs text-gray-500">{notice.publishDate}</span>
              </div>
              <span className="text-xs text-gray-500 font-medium">By {notice.authorName}</span>
            </div>

            <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari">{notice.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{notice.description}</p>

            {notice.attachmentName && (
              <div className="pt-2 flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <FileText className="w-4 h-4 text-rajmudra-orange" />
                  <span className="font-semibold">{notice.attachmentName}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                  onClick={() => success(`Downloading attachment: ${notice.attachmentName}`)}
                  className="text-xs"
                >
                  Download PDF
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
