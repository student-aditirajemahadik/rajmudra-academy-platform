import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { HelpCircle, Clock, Award, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export const StudentTestsPage: React.FC = () => {
  const { studentProfile } = useAuth();
  const navigate = useNavigate();
  const studentId = studentProfile?.id || 'stu-01';

  const allTests = db.getTests();
  const attempts = db.getTestAttempts().filter(a => a.studentId === studentId);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
          ऑनलाइन सराव परीक्षा केंद्र (Online Tests & Mock Exams)
        </h2>
        <p className="text-xs text-gray-500">Live timed MCQ mock examinations matching latest MPSC & Police Bharti patterns.</p>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allTests.map(test => {
          const attempt = attempts.find(a => a.testId === test.id);
          const isCompleted = !!attempt;

          return (
            <Card key={test.id} hoverEffect className="p-6 border border-gray-200 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-bold text-rajmudra-orange bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
                    {test.testCode}
                  </span>
                  <Badge variant={isCompleted ? 'green' : test.status === 'ACTIVE' ? 'orange' : 'gray'}>
                    {isCompleted ? 'COMPLETED' : test.status}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari">{test.title}</h3>
                  <p className="text-xs text-gray-500 font-medium">{test.courseName}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-gray-700 bg-gray-50 p-3.5 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-rajmudra-orange" />
                    <span>Duration: <strong>{test.durationMinutes} Mins</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-rajmudra-orange" />
                    <span>Total: <strong>{test.totalMarks} Marks</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rajmudra-orange" />
                    <span>Passing: <strong>{test.passingMarks} Marks</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-rajmudra-orange" />
                    <span>Questions: <strong>{test.questions.length || 10} MCQs</strong></span>
                  </div>
                </div>

                {isCompleted && (
                  <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-xs text-green-800 flex items-center justify-between">
                    <span>Your Attempt Score:</span>
                    <strong className="text-sm font-black">{attempt.totalMarksObtained} / {test.totalMarks} ({attempt.percentage}%)</strong>
                  </div>
                )}
              </div>

              <div>
                {isCompleted ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => navigate('/student/results')}
                  >
                    View Scorecard Analysis &rarr;
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full shadow-glow-orange text-xs"
                    onClick={() => navigate(`/student/tests/take/${test.id}`)}
                  >
                    Start Online Test Now &rarr;
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
