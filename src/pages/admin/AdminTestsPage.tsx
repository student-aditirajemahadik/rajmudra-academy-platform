import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { HelpCircle, Trash2, Clock, Award } from 'lucide-react';

export const AdminTestsPage: React.FC = () => {
  const { success } = useToast();
  const [tests, setTests] = useState(db.getTests());

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this exam?')) {
      db.deleteTest(id);
      setTests(db.getTests());
      success('Test deleted.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
          ऑनलाइन परीक्षा नियंत्रण (Academy Tests & Exams Hub)
        </h2>
        <p className="text-xs text-gray-500">Monitor all competitive exam mock tests, passing criteria, and active timers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tests.map(test => (
          <Card key={test.id} hoverEffect className="p-6 border border-gray-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-rajmudra-orange bg-orange-50 px-2.5 py-0.5 rounded border border-orange-200">
                  {test.testCode}
                </span>
                <Badge variant={test.status === 'ACTIVE' ? 'green' : 'gray'}>
                  {test.status}
                </Badge>
              </div>

              <div>
                <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari">{test.title}</h3>
                <p className="text-xs text-gray-500">{test.courseName}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 bg-gray-50 p-3 rounded-xl">
                <div>⏱️ {test.durationMinutes} Minutes</div>
                <div>🎯 {test.totalMarks} Total Marks</div>
                <div>✅ {test.passingMarks} Passing Marks</div>
                <div>❓ {test.totalQuestions || 10} MCQs</div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">Created by {test.createdByName}</span>
              <button
                onClick={() => handleDelete(test.id)}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Test"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
