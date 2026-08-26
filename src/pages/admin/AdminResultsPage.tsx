import React from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { Award, Download } from 'lucide-react';

export const AdminResultsPage: React.FC = () => {
  const { success } = useToast();
  const results = db.getResults();

  const handleExport = () => {
    success('Academy-wide test results exported to CSV!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            परीक्षा निकाल व गुणवत्ता यादी (Results & Merit Ledger)
          </h2>
          <p className="text-xs text-gray-500">Official student test scorecards, batch ranks, and passing records.</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={handleExport}
        >
          Export Results CSV
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
                <th className="p-4">Rank</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {results.map(r => (
                <tr key={r.id} className="hover:bg-gray-50/80">
                  <td className="p-4 font-bold text-rajmudra-charcoal">{r.studentName}</td>
                  <td className="p-4 text-gray-600 truncate max-w-xs">{r.testTitle}</td>
                  <td className="p-4 font-black">{r.score} / {r.totalMarks}</td>
                  <td className="p-4 font-bold text-rajmudra-orange">{r.percentage}%</td>
                  <td className="p-4 font-bold text-blue-600">#{r.rank}</td>
                  <td className="p-4 text-gray-500">{r.date}</td>
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
