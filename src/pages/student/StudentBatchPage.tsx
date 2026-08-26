import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Clock, Calendar, Users, MapPin, GraduationCap, ShieldCheck } from 'lucide-react';

export const StudentBatchPage: React.FC = () => {
  const { studentProfile } = useAuth();
  const batches = db.getBatches().filter(b => studentProfile?.enrolledBatchIds?.includes(b.id) || b.id === 'btc-01');
  const batch = batches[0] || db.getBatches()[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
          माझी बॅच (My Allocated Batch)
        </h2>
        <p className="text-xs text-gray-500">Classroom schedule, timings, and faculty details.</p>
      </div>

      <Card className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b">
          <div>
            <span className="text-xs font-bold text-rajmudra-orange bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
              {batch.batchCode}
            </span>
            <h3 className="text-2xl font-bold text-rajmudra-charcoal mt-2 font-devanagari">
              {batch.name}
            </h3>
            <p className="text-xs text-gray-500">{batch.courseName}</p>
          </div>
          <Badge variant="green" size="md">Status: {batch.status}</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-rajmudra-orange">
              <Clock className="w-4 h-4" /> Timings
            </div>
            <div className="text-sm font-bold text-rajmudra-charcoal">{batch.startTime} - {batch.endTime}</div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-rajmudra-orange">
              <Calendar className="w-4 h-4" /> Working Days
            </div>
            <div className="text-sm font-bold text-rajmudra-charcoal">{batch.days}</div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-rajmudra-orange">
              <GraduationCap className="w-4 h-4" /> Lead Faculty
            </div>
            <div className="text-sm font-bold text-rajmudra-charcoal">{batch.teacherName}</div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-rajmudra-orange">
              <MapPin className="w-4 h-4" /> Hall / Venue
            </div>
            <div className="text-sm font-bold text-rajmudra-charcoal truncate">{batch.room}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};
