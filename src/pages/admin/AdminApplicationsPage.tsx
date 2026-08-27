import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import {
  FileCheck,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  UserPlus,
  FileText,
  Building,
} from 'lucide-react';
import { Application, ApplicationStatus } from '../../types';

export const AdminApplicationsPage: React.FC = () => {
  const { success, warning } = useToast();
  const [applications, setApplications] = useState(db.getApplications());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const batches = db.getBatches();

  const filtered = applications.filter(app => {
    const matchesSearch =
      app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.personalInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.personalInfo.phone.includes(searchTerm) ||
      app.courseSelection.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (app: Application, newStatus: ApplicationStatus, remarks?: string) => {
    const updated: Application = {
      ...app,
      status: newStatus,
      reviewedDate: new Date().toISOString(),
      reviewedBy: 'Director Sandip Patil',
      reviewRemarks: remarks || `Status updated to ${newStatus}`,
    };

    // If enrolling, create/link student & enrollment record
    if (newStatus === 'ENROLLED') {
      const studentId = app.studentId || `stu-${Date.now()}`;
      const rollNo = `RMA-ROLL-${Math.floor(100 + Math.random() * 900)}`;

      db.saveEnrollment({
        id: `enr-${Date.now()}`,
        studentId,
        studentName: app.personalInfo.fullName,
        courseId: app.courseSelection.courseId,
        courseName: app.courseSelection.courseName,
        batchId: app.assignedBatchId || app.courseSelection.preferredBatchId || 'btc-01',
        batchName: app.courseSelection.preferredBatchName || 'Police Bharti Morning Batch',
        applicationId: app.id,
        enrollmentDate: new Date().toISOString().split('T')[0],
        rollNumber: rollNo,
        status: 'ACTIVE',
      });
    }

    db.saveApplication(updated);
    setApplications(db.getApplications());
    setSelectedApp(null);
    success(`Application ${app.applicationNumber} updated to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            प्रवेश अर्ज व्यवस्थापन (Admission Applications)
          </h2>
          <p className="text-xs text-gray-500">Screen candidate submissions, verify documents, and approve batch enrollments.</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {['ALL', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'ENROLLED', 'REJECTED'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-rajmudra-orange text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, name, phone..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rajmudra-orange"
          />
        </div>
      </div>

      {/* Applications Table */}
      <Card className="overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">App ID</th>
                <th className="p-4">Candidate Name</th>
                <th className="p-4">Applied Course</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(app => (
                <tr key={app.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-rajmudra-orange">{app.applicationNumber}</td>
                  <td className="p-4">
                    <div className="font-bold text-rajmudra-charcoal">{app.personalInfo.fullName}</div>
                    <div className="text-[11px] text-gray-500">{app.personalInfo.phone} • {app.personalInfo.city}</div>
                  </td>
                  <td className="p-4 text-gray-700 max-w-xs truncate">{app.courseSelection.courseName}</td>
                  <td className="p-4 text-gray-500">{new Date(app.submissionDate).toLocaleDateString('en-IN')}</td>
                  <td className="p-4">
                    <Badge
                      variant={
                        app.status === 'ENROLLED'
                          ? 'green'
                          : app.status === 'APPROVED'
                          ? 'blue'
                          : app.status === 'REJECTED'
                          ? 'red'
                          : 'orange'
                      }
                      size="sm"
                    >
                      {app.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Eye className="w-3.5 h-3.5" />}
                      onClick={() => setSelectedApp(app)}
                      className="text-xs"
                    >
                      View / Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Application Review Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title="Review Admission Application"
          subtitle={`Application Reference: ${selectedApp.applicationNumber}`}
          maxWidth="2xl"
        >
          <div className="space-y-6 text-xs sm:text-sm text-rajmudra-charcoal">
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Candidate</span>
                <div className="font-bold text-sm">{selectedApp.personalInfo.fullName}</div>
                <div className="text-gray-500">{selectedApp.personalInfo.email} | {selectedApp.personalInfo.phone}</div>
                <div className="text-gray-500">DOB: {selectedApp.personalInfo.dob} ({selectedApp.personalInfo.gender})</div>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Address & Category</span>
                <div className="font-medium">{selectedApp.personalInfo.address}, {selectedApp.personalInfo.city}</div>
                <div className="text-rajmudra-orange font-bold">Category: {selectedApp.personalInfo.category}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-orange-50/60 p-4 rounded-xl border border-orange-200">
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Selected Program</span>
                <div className="font-bold text-sm text-rajmudra-charcoal">{selectedApp.courseSelection.courseName}</div>
                <div className="text-gray-600">Mode: {selectedApp.courseSelection.mode} | Hostel: {selectedApp.courseSelection.hostelRequired ? 'Yes' : 'No'}</div>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Education & Marks</span>
                <div className="font-bold">{selectedApp.educationInfo.highestQualification}</div>
                <div className="text-gray-600">Score: {selectedApp.educationInfo.marksPercentage} ({selectedApp.educationInfo.passingYear})</div>
              </div>
            </div>

            {/* Documents */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500">Uploaded Verification Documents</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedApp.documents.map((d, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-rajmudra-orange" />
                      <span className="truncate">{d.title}</span>
                    </div>
                    <Badge variant="green" size="sm">Uploaded</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleUpdateStatus(selectedApp, 'REJECTED', 'Application rejected by admission desk')}
              >
                Reject
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateStatus(selectedApp, 'UNDER_REVIEW', 'Under document review')}
                >
                  Mark Under Review
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleUpdateStatus(selectedApp, 'APPROVED', 'Approved for enrollment')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Approve Application
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleUpdateStatus(selectedApp, 'ENROLLED', 'Enrolled into active batch')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Enroll in Batch &rarr;
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

