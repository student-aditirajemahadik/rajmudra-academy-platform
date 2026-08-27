import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, Users, MapPin, CalendarCheck, BookOpen } from 'lucide-react';

export const TeacherBatchesPage: React.FC = () => {
  const { teacherProfile } = useAuth();
  const navigate = useNavigate();
  const teacherId = teacherProfile?.id || 'fac-01';

  const batches = db.getBatches().filter(b => b.teacherId === teacherId || teacherProfile?.assignedBatchIds?.includes(b.id));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
          माझ्या नेमून दिलेल्या बॅचेस (My Assigned Batches)
        </h2>
        <p className="text-xs text-gray-500">Batches and classrooms assigned to you for the current academic session.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {batches.map(batch => (
          <Card key={batch.id} hoverEffect className="p-6 border border-gray-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-rajmudra-orange bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
                  {batch.batchCode}
                </span>
                <Badge variant={batch.status === 'ONGOING' ? 'green' : 'orange'}>
                  {batch.status}
                </Badge>
              </div>

              <div>
                <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari">{batch.name}</h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">{batch.courseName}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-gray-700 bg-gray-50 p-3.5 rounded-xl">
                <div>⏰ {batch.startTime} - {batch.endTime}</div>
                <div>📅 {batch.days}</div>
                <div>👥 {batch.enrolledCount} Students Enrolled</div>
                <div>📍 {batch.room}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<CalendarCheck className="w-4 h-4" />}
                onClick={() => navigate('/teacher/attendance')}
                className="text-xs"
              >
                Mark Attendance
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/teacher/students')}
                className="text-xs"
              >
                View Roster
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

