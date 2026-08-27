import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../services/db';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Clock, Calendar, Users, MapPin, Search, ArrowRight, ShieldCheck } from 'lucide-react';

export const BatchesPage: React.FC = () => {
  const navigate = useNavigate();
  const allBatches = db.getBatches();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredBatches = allBatches.filter(batch => {
    const matchesSearch =
      batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.batchCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || batch.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="bg-rajmudra-black text-white py-14 sm:py-16 border-b-2 border-rajmudra-orange">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <Badge variant="orange">बॅचेस वेळापत्रक • BATCH TIMETABLE</Badge>
          <h1 className="text-3xl sm:text-5xl font-black font-devanagari">
            नवीन बॅचेस व वेळापत्रक 2026
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
            सकाळ, दुपार आणि संध्याकाळच्या नियमित व वीकेंड बॅचेसची अद्ययावत माहिती आणि प्रवेश स्थिती.
          </p>
        </div>
      </section>

      {/* Filter and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {['ALL', 'ONGOING', 'UPCOMING'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === st
                    ? 'bg-rajmudra-orange text-white shadow-glow-orange'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {st === 'ALL' ? 'All Batches' : st === 'ONGOING' ? 'Live Ongoing Batches' : 'Upcoming Batches'}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by batch, course, or teacher..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rajmudra-orange"
            />
          </div>
        </div>
      </div>

      {/* Batches Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBatches.map(batch => {
            const seatsLeft = Math.max(0, batch.capacity - batch.enrolledCount);
            const percentageFilled = Math.round((batch.enrolledCount / batch.capacity) * 100);

            return (
              <Card key={batch.id} hoverEffect className="p-6 border border-gray-200 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-extrabold text-rajmudra-orange bg-orange-50 px-2.5 py-0.5 rounded-lg border border-orange-200">
                      {batch.batchCode}
                    </span>
                    <Badge variant={batch.status === 'ONGOING' ? 'green' : 'orange'}>
                      {batch.status}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari leading-snug">
                      {batch.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium mt-1">{batch.courseName}</p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-xs text-gray-700 bg-gray-50 p-3.5 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-rajmudra-orange flex-shrink-0" />
                      <span><strong>Timings:</strong> {batch.startTime} - {batch.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-rajmudra-orange flex-shrink-0" />
                      <span><strong>Days:</strong> {batch.days}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-rajmudra-orange flex-shrink-0" />
                      <span><strong>Teacher:</strong> {batch.teacherName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-rajmudra-orange flex-shrink-0" />
                      <span className="truncate"><strong>Venue:</strong> {batch.room}</span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Seat Occupancy</span>
                      <span className="font-bold text-rajmudra-charcoal">{percentageFilled}% Full</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-rajmudra-orange h-2 rounded-full transition-all"
                        style={{ width: `${percentageFilled}%` }}
                      />
                    </div>
                    <div className="text-[11px] text-gray-500 flex justify-between">
                      <span>{seatsLeft} Seats Available</span>
                      <span>Total: {batch.capacity}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full shadow-glow-orange"
                    onClick={() => navigate(`/apply?courseId=${batch.courseId}&batchId=${batch.id}`)}
                  >
                    Enroll in this Batch &rarr;
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

