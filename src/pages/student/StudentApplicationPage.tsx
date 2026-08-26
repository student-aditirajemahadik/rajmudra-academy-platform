import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import {
  FileCheck,
  CheckCircle2,
  Clock,
  Check,
  ArrowRight,
  ShieldCheck,
  Calendar,
  FileText,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StudentApplicationPage: React.FC = () => {
  const { studentProfile } = useAuth();
  const navigate = useNavigate();

  const studentId = studentProfile?.id || 'stu-01';
  const applications = db.getApplications().filter(a => a.studentId === studentId || a.id === 'app-01');
  const app = applications[0] || db.getApplications()[0];

  const timelineSteps = [
    { key: 'SUBMITTED', label: 'Application Submitted', desc: 'Application received and logged into system' },
    { key: 'UNDER_REVIEW', label: 'Under Review', desc: 'Admission desk screening and document check' },
    { key: 'APPROVED', label: 'Approved', desc: 'Verification confirmed by Director' },
    { key: 'ENROLLED', label: 'Enrolled & Active', desc: 'Batch allocated & roll number assigned' },
  ];

  const getStepStatus = (stepKey: string) => {
    const states = ['SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'ENROLLED'];
    const currentIdx = states.indexOf(app.status);
    const stepIdx = states.indexOf(stepKey);

    if (app.status === 'REJECTED') return 'rejected';
    if (stepIdx <= currentIdx) return 'completed';
    if (stepIdx === currentIdx + 1) return 'current';
    return 'pending';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            प्रवेश अर्ज स्थिती (Admission Application Status)
          </h2>
          <p className="text-xs text-gray-500">Track the end-to-end lifecycle of your academy admission.</p>
        </div>

        <Badge variant={app.status === 'ENROLLED' ? 'green' : 'orange'} size="md">
          Status: {app.status}
        </Badge>
      </div>

      {/* Main Application Summary Card */}
      <Card className="p-6 sm:p-8 space-y-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase">Application Reference</span>
            <h3 className="text-2xl font-black text-rajmudra-orange font-mono tracking-wider">
              {app.applicationNumber}
            </h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Course: <strong>{app.courseSelection.courseName}</strong>
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-gray-500 block">Date of Application</span>
            <span className="text-xs sm:text-sm font-bold text-rajmudra-charcoal">
              {new Date(app.submissionDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Visual Timeline Stepper */}
        <div className="py-4">
          <h4 className="text-sm font-bold text-rajmudra-charcoal mb-6 font-devanagari">
            प्रवेश प्रगती आलेख (Application Lifecycle Timeline)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {timelineSteps.map((step, idx) => {
              const status = getStepStatus(step.key);
              return (
                <div
                  key={step.key}
                  className={`p-4 rounded-2xl border transition-all ${
                    status === 'completed'
                      ? 'bg-green-50/70 border-green-300 text-green-900'
                      : status === 'current'
                      ? 'bg-orange-50 border-rajmudra-orange text-rajmudra-charcoal shadow-sm'
                      : 'bg-gray-50 border-gray-200 text-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        status === 'completed'
                          ? 'bg-green-600 text-white'
                          : status === 'current'
                          ? 'bg-rajmudra-orange text-white shadow-glow-orange'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {status === 'completed' ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                    </div>
                    <span className="text-xs font-bold uppercase">{step.key}</span>
                  </div>
                  <div className="text-xs font-bold text-rajmudra-charcoal">{step.label}</div>
                  <p className="text-[11px] text-gray-500 mt-1 leading-snug">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verification Remarks */}
        {app.reviewRemarks && (
          <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-xs sm:text-sm text-gray-800 space-y-1">
            <strong className="text-rajmudra-orange block">Admission Desk Note:</strong>
            <p>{app.reviewRemarks}</p>
          </div>
        )}

        {/* Uploaded Documents Tracker */}
        <div className="space-y-3 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-bold text-rajmudra-charcoal font-devanagari">
            अपलोड केलेली कागदपत्रे (Uploaded Verification Documents)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {app.documents.map((doc, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-rajmudra-orange" />
                  <div>
                    <div className="text-xs font-bold text-rajmudra-charcoal truncate">{doc.title}</div>
                    <div className="text-[10px] text-gray-500">{doc.fileName}</div>
                  </div>
                </div>
                <Badge variant={doc.status === 'VERIFIED' ? 'green' : 'orange'} size="sm">
                  {doc.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
