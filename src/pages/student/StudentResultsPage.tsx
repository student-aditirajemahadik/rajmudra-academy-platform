import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Award, Trophy, TrendingUp, CheckCircle, BarChart2 } from 'lucide-react';

export const StudentResultsPage: React.FC = () => {
  const { studentProfile } = useAuth();
  const studentId = studentProfile?.id || 'stu-01';
  const results = db.getResultsByStudentId(studentId);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
          परीक्षेचे निकाल व प्रगती अहवाल (Exam Results & Analytics)
        </h2>
        <p className="text-xs text-gray-500">Official scorecards, subject performance breakdowns, and batch rankings.</p>
      </div>

      {results.length === 0 ? (
        <Card className="p-12 text-center space-y-3">
          <Award className="w-12 h-12 text-gray-400 mx-auto" />
          <h3 className="text-base font-bold text-gray-700">No test results recorded yet.</h3>
          <p className="text-xs text-gray-500">Attempt live online mock tests in the Test Center to see your scorecards.</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {results.map(res => (
            <Card key={res.id} hoverEffect className="p-6 sm:p-8 space-y-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
                <div>
                  <Badge variant={res.status === 'PASS' ? 'green' : 'red'} size="sm">
                    {res.status === 'PASS' ? 'PASSED' : 'FAILED'}
                  </Badge>
                  <h3 className="text-lg font-bold text-rajmudra-charcoal mt-1 font-devanagari">
                    {res.testTitle}
                  </h3>
                  <p className="text-xs text-gray-500">Date Attempted: {res.date}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold">Marks</span>
                    <div className="text-2xl font-black text-rajmudra-charcoal">{res.score} / {res.totalMarks}</div>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold">Percentage</span>
                    <div className="text-2xl font-black text-rajmudra-orange">{res.percentage}%</div>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-gray-500 uppercase font-semibold">Rank in Batch</span>
                    <div className="text-2xl font-black text-blue-600">#{res.rank}</div>
                  </div>
                </div>
              </div>

              {/* Subject Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Subject-Wise Performance Breakdown:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {res.subjectBreakdown?.map((sub, sIdx) => (
                    <div key={sIdx} className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="text-xs font-bold text-rajmudra-charcoal font-devanagari">{sub.subject}</div>
                      <div className="text-sm font-black text-rajmudra-orange mt-1">
                        {sub.score} / {sub.total} Marks
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
