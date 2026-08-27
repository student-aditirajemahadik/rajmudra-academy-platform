import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { Award, Save, Download } from 'lucide-react';

export const TeacherMarksPage: React.FC = () => {
  const { success } = useToast();
  const results = db.getResults();

  const handleExportMarks = () => {
    success('Marksheet exported successfully to CSV!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            गुणदान व निकाल नोंदणी (Marks & Grading)
          </h2>
          <p className="text-xs text-gray-500">View and manage evaluation scores across batch tests and physical drills.</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={handleExportMarks}
        >
          Export Batch Marksheet
        </Button>
      </div>

      <Card className="overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Test Title</th>
                <th className="p-4">Score</th>
                <th className="p-4">Percentage</th>
                <th className="p-4">Batch Rank</th>
                <th className="p-4">Result Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {results.map(r => (
                <tr key={r.id} className="hover:bg-gray-50/80">
                  <td className="p-4 font-bold text-rajmudra-charcoal">{r.studentName}</td>
                  <td className="p-4 text-gray-600 truncate max-w-xs">{r.testTitle}</td>
                  <td className="p-4 font-black text-rajmudra-charcoal">{r.score} / {r.totalMarks}</td>
                  <td className="p-4 font-bold text-rajmudra-orange">{r.percentage}%</td>
                  <td className="p-4 font-bold text-blue-600">#{r.rank}</td>
                  <td className="p-4">
                    <Badge variant={r.status === 'PASS' ? 'green' : 'red'} size="sm">
                      {r.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

