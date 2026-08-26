import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useToast } from '../../context/ToastContext';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Award,
  HelpCircle,
  ShieldAlert,
  RotateCcw,
  Check,
  XCircle,
} from 'lucide-react';
import { Test, TestAttempt } from '../../types';

export const StudentTestTakePage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const { studentProfile, user } = useAuth();
  const { success, warning } = useToast();

  const studentId = studentProfile?.id || 'stu-01';
  const studentName = studentProfile?.fullName || user?.name || 'Student';

  const test = db.getTestById(testId || 'tst-01') || db.getTests()[0];
  const existingAttempt = db.getAttemptByStudentAndTest(studentId, test.id);

  // Check questions
  const questions = test.questions.length > 0 ? test.questions : [
    {
      id: 'q-demo-1',
      questionText: 'महाराष्ट्रात सर्वात जास्त पाऊस कोणत्या ठिकाणी पडतो?',
      options: [
        { key: 'A', text: 'महाबळेश्वर' },
        { key: 'B', text: 'आंबोली' },
        { key: 'C', text: 'माथेरान' },
        { key: 'D', text: 'लोणावळा' },
      ],
      correctOption: 'B' as const,
      marks: 5,
      negativeMarks: 1.25,
      explanation: 'सिंधुदुर्ग जिल्ह्यातील आंबोली हे महाराष्ट्रात सर्वाधिक पाऊस पडणारे ठिकाण आहे.',
      subject: 'महाराष्ट्र भूगोल',
    },
    {
      id: 'q-demo-2',
      questionText: 'मराठी वर्णमालेत एकूण किती व्यंजने आहेत?',
      options: [
        { key: 'A', text: '34' },
        { key: 'B', text: '36' },
        { key: 'C', text: '14' },
        { key: 'D', text: '48' },
      ],
      correctOption: 'A' as const,
      marks: 5,
      negativeMarks: 1.25,
      explanation: 'मराठी वर्णमालेत 34 मूल व्यंजने आहेत.',
      subject: 'मराठी व्याकरण',
    },
  ];

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: 'A' | 'B' | 'C' | 'D' | null }>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(test.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(!!existingAttempt);
  const [attemptResult, setAttemptResult] = useState<TestAttempt | null>(existingAttempt || null);

  // Countdown timer
  useEffect(() => {
    if (isSubmitted || timeLeftSeconds <= 0) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, timeLeftSeconds]);

  const handleSelectOption = (optKey: 'A' | 'B' | 'C' | 'D') => {
    const qId = questions[currentQuestionIdx].id;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: prev[qId] === optKey ? null : optKey,
    }));
  };

  const handleSubmitTest = (isAutoSubmit = false) => {
    if (isSubmitted) return;

    let correctCount = 0;
    let incorrectCount = 0;
    let totalMarks = 0;

    const evaluatedAnswers = questions.map(q => {
      const selected = selectedAnswers[q.id] || null;
      const isCorrect = selected === q.correctOption;
      let marksForQ = 0;

      if (selected !== null) {
        if (isCorrect) {
          marksForQ = q.marks;
          correctCount++;
        } else {
          marksForQ = -q.negativeMarks;
          incorrectCount++;
        }
      }
      totalMarks += marksForQ;

      return {
        questionId: q.id,
        selectedOption: selected,
        isCorrect,
        marksObtained: marksForQ,
      };
    });

    const maxMarks = questions.reduce((acc, q) => acc + q.marks, 0);
    const percentage = Math.max(0, Math.round((totalMarks / maxMarks) * 100));
    const isPassed = totalMarks >= test.passingMarks;

    const attempt: TestAttempt = {
      id: `att-${Date.now()}`,
      testId: test.id,
      testTitle: test.title,
      studentId: studentId,
      studentName: studentName,
      startTime: new Date().toISOString(),
      submittedTime: new Date().toISOString(),
      answers: evaluatedAnswers,
      totalMarksObtained: Math.max(0, totalMarks),
      totalQuestions: questions.length,
      correctCount: correctCount,
      incorrectCount: incorrectCount,
      unattemptedCount: questions.length - (correctCount + incorrectCount),
      percentage: percentage,
      isPassed: isPassed,
      rank: Math.floor(1 + Math.random() * 5),
    };

    db.saveTestAttempt(attempt);
    setAttemptResult(attempt);
    setIsSubmitted(true);

    if (isAutoSubmit) {
      warning('Time is up! Your exam was automatically submitted.');
    } else {
      success('Online exam submitted successfully! Your scorecard is ready.');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // If already submitted, display comprehensive Scorecard View
  if (isSubmitted && attemptResult) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto pb-16">
        <Card className="p-6 sm:p-8 space-y-6 text-center border-2 border-rajmudra-orange">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-rajmudra-orange mx-auto flex items-center justify-center shadow-md">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <Badge variant={attemptResult.isPassed ? 'green' : 'red'} size="md">
              {attemptResult.isPassed ? 'TEST PASSED' : 'NEEDS IMPROVEMENT'}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-rajmudra-charcoal font-devanagari">
              परीक्षेचा निकाल व विश्लेषण (Scorecard)
            </h2>
            <p className="text-xs text-gray-500">{attemptResult.testTitle}</p>
          </div>

          {/* Score Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
              <div className="text-2xl font-black text-rajmudra-orange">{attemptResult.totalMarksObtained}</div>
              <div className="text-xs font-semibold text-gray-700">Marks Obtained</div>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="text-2xl font-black text-green-700">{attemptResult.correctCount}</div>
              <div className="text-xs font-semibold text-gray-700">Correct Answers</div>
            </div>
            <div className="p-4 rounded-xl bg-red-50 border border-red-200">
              <div className="text-2xl font-black text-red-600">{attemptResult.incorrectCount}</div>
              <div className="text-xs font-semibold text-gray-700">Incorrect Answers</div>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <div className="text-2xl font-black text-blue-600">#{attemptResult.rank}</div>
              <div className="text-xs font-semibold text-gray-700">Batch Rank</div>
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <Button variant="primary" onClick={() => navigate('/student/results')}>
              Go to Results Hub
            </Button>
            <Button variant="outline" onClick={() => navigate('/student/tests')}>
              Back to Tests
            </Button>
          </div>
        </Card>

        {/* Question by Question Review */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-rajmudra-charcoal font-devanagari">
            प्रश्नोत्तरे व सविस्तर स्पष्टीकरण (Detailed Review)
          </h3>

          {questions.map((q, idx) => {
            const userAns = attemptResult.answers.find(a => a.questionId === q.id);
            const isCorrect = userAns?.isCorrect;
            const isUnattempted = !userAns?.selectedOption;

            return (
              <Card key={q.id} className="p-5 space-y-3 border border-gray-200">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gray-200 font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-rajmudra-orange uppercase">{q.subject}</span>
                  </div>
                  <Badge variant={isCorrect ? 'green' : isUnattempted ? 'gray' : 'red'}>
                    {isCorrect ? '+5 Marks' : isUnattempted ? 'Not Attempted' : '-1.25 Negative'}
                  </Badge>
                </div>

                <h4 className="text-sm font-bold text-rajmudra-charcoal font-devanagari">
                  {q.questionText}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map(opt => {
                    const isSelected = userAns?.selectedOption === opt.key;
                    const isCorrectOpt = q.correctOption === opt.key;

                    return (
                      <div
                        key={opt.key}
                        className={`p-3 rounded-xl border flex items-center justify-between ${
                          isCorrectOpt
                            ? 'bg-green-50 border-green-400 text-green-900 font-bold'
                            : isSelected
                            ? 'bg-red-50 border-red-400 text-red-900 font-semibold'
                            : 'bg-gray-50 border-gray-200 text-gray-700'
                        }`}
                      >
                        <span>
                          <strong>{opt.key}.</strong> {opt.text}
                        </span>
                        {isCorrectOpt && <Check className="w-4 h-4 text-green-700" />}
                        {isSelected && !isCorrectOpt && <XCircle className="w-4 h-4 text-red-600" />}
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed font-devanagari">
                    <strong>स्पष्टीकरण (Explanation):</strong> {q.explanation}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Active Test Runner Interface
  const curQ = questions[currentQuestionIdx];
  const answeredCount = Object.values(selectedAnswers).filter(Boolean).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Active Exam Sticky Header */}
      <div className="bg-rajmudra-black text-white p-4 rounded-2xl border border-rajmudra-border-gray shadow-premium-dark flex items-center justify-between">
        <div>
          <h2 className="text-sm sm:text-base font-bold font-devanagari">{test.title}</h2>
          <p className="text-[11px] text-gray-400">Total Questions: {questions.length} | Passing: {test.passingMarks} Marks</p>
        </div>

        {/* Live Timer Clock */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rajmudra-charcoal border border-orange-500/50 text-rajmudra-orange font-mono font-black text-base shadow-glow-orange">
          <Clock className="w-4 h-4 animate-pulse" />
          <span>{formatTime(timeLeftSeconds)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Current Question */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6 sm:p-8 space-y-6 border border-gray-200">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-xs font-bold text-rajmudra-orange uppercase tracking-wider">
                Question {currentQuestionIdx + 1} of {questions.length} ({curQ.subject})
              </span>
              <span className="text-xs text-gray-500">
                +{curQ.marks} Marks / -{curQ.negativeMarks} Negative
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-rajmudra-charcoal font-devanagari leading-relaxed">
              {curQ.questionText}
            </h3>

            {/* Options List */}
            <div className="space-y-3">
              {curQ.options.map(opt => {
                const isSelected = selectedAnswers[curQ.id] === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleSelectOption(opt.key as 'A' | 'B' | 'C' | 'D')}
                    className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-medium border-2 transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-orange-50 border-rajmudra-orange text-rajmudra-charcoal shadow-sm'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>
                      <strong className="mr-2 text-rajmudra-orange font-bold">{opt.key}.</strong>
                      {opt.text}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-rajmudra-orange bg-rajmudra-orange text-white' : 'border-gray-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Question Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <Button
                variant="outline"
                size="sm"
                disabled={currentQuestionIdx === 0}
                onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Previous
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedAnswers(prev => ({ ...prev, [curQ.id]: null }))}
                className="text-xs text-gray-500"
              >
                Clear Response
              </Button>

              <Button
                variant="primary"
                size="sm"
                disabled={currentQuestionIdx === questions.length - 1}
                onClick={() => setCurrentQuestionIdx(prev => Math.min(questions.length - 1, prev + 1))}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Next Question
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: Question Palette & Submit */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 space-y-4 border border-gray-200">
            <h4 className="text-sm font-bold text-rajmudra-charcoal border-b pb-2">
              Question Palette ({answeredCount} / {questions.length} Answered)
            </h4>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isAns = !!selectedAnswers[q.id];
                const isCur = currentQuestionIdx === idx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIdx(idx)}
                    className={`h-9 rounded-xl font-bold text-xs transition-all flex items-center justify-center ${
                      isCur
                        ? 'ring-2 ring-rajmudra-orange ring-offset-2 bg-rajmudra-orange text-white'
                        : isAns
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2 text-[11px] text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-600 rounded-sm" />
                <span>Answered Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-gray-200 rounded-sm" />
                <span>Unattempted Questions</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  if (window.confirm('Are you sure you want to submit your online test?')) {
                    handleSubmitTest();
                  }
                }}
                className="w-full shadow-glow-orange bg-green-600 hover:bg-green-700 text-white font-bold"
              >
                Submit Online Test
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
