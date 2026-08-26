import React from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { Download, FileSpreadsheet, BarChart2, TrendingUp, Users, CreditCard, CalendarCheck, Award } from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
  const { success } = useToast();

  const exportReport = (reportType: string) => {
    let filename = `Rajmudra_${reportType}_Report_${new Date().toISOString().split('T')[0]}.csv`;
    let headers = '';
    let rows = '';

    if (reportType === 'Students') {
      headers = 'Student ID,Full Name,Email,Phone,Qualification,City,Status\n';
      rows = db.getStudents().map(s => `"${s.studentId}","${s.fullName}","${s.email}","${s.phone}","${s.education.qualification}","${s.address.city}","${s.status}"`).join('\n');
    } else if (reportType === 'Fees') {
      headers = 'Student Name,Course,Total Amount,Discount,Paid Amount,Pending Amount,Status\n';
      rows = db.getFees().map(f => `"${f.studentName}","${f.courseName}",${f.totalAmount},${f.discountAmount},${f.paidAmount},${f.pendingAmount},"${f.status}"`).join('\n');
    } else if (reportType === 'Attendance') {
      headers = 'Date,Student Name,Batch,Status,Teacher\n';
      rows = db.getAttendance().map(a => `"${a.date}","${a.studentName}","${a.batchName}","${a.status}","${a.markedByTeacherId}"`).join('\n');
    } else if (reportType === 'Results') {
      headers = 'Student Name,Test Title,Score,Total Marks,Percentage,Rank,Status\n';
      rows = db.getResults().map(r => `"${r.studentName}","${r.testTitle}",${r.score},${r.totalMarks},${r.percentage},${r.rank},"${r.status}"`).join('\n');
    } else {
      headers = 'App Number,Candidate Name,Course,Date,Status\n';
      rows = db.getApplications().map(a => `"${a.applicationNumber}","${a.personalInfo.fullName}","${a.courseSelection.courseName}","${a.submissionDate}","${a.status}"`).join('\n');
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(headers + rows);
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    success(`Generated and downloaded ${reportType} CSV report!`);
  };

  const reportCards = [
    {
      title: 'Admissions & Applications Report',
      desc: 'Full candidate applications, approval dates, selected courses, and verification status.',
      type: 'Admissions',
      icon: <FileSpreadsheet className="w-6 h-6 text-rajmudra-orange" />,
    },
    {
      title: 'Active Students Master Report',
      desc: 'Enrolled students roster with contact numbers, addresses, education qualifications and batch allocations.',
      type: 'Students',
      icon: <Users className="w-6 h-6 text-blue-600" />,
    },
    {
      title: 'Fee Collection & Pending Dues Report',
      desc: 'Detailed financial ledger of total package amounts, discounts, collected receipts and balance dues.',
      type: 'Fees',
      icon: <CreditCard className="w-6 h-6 text-green-600" />,
    },
    {
      title: 'Academy-Wide Attendance Logs',
      desc: 'Session by session attendance tracking logs across all active classroom and physical batches.',
      type: 'Attendance',
      icon: <CalendarCheck className="w-6 h-6 text-amber-500" />,
    },
    {
      title: 'Competitive Mock Test Results & Merit',
      desc: 'Student scores, accuracy percentages, passing criteria and batch merit ranks.',
      type: 'Results',
      icon: <Award className="w-6 h-6 text-purple-600" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
          अहवाल व डेटा निर्यात (Reports & Analytics Hub)
        </h2>
        <p className="text-xs text-gray-500">Generate and export institutional CSV reports for auditing, reviews, and analytics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCards.map((rep, idx) => (
          <Card key={idx} hoverEffect className="p-6 border border-gray-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-2xl w-fit border border-gray-200">
                {rep.icon}
              </div>
              <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari">{rep.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{rep.desc}</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="w-4 h-4" />}
              onClick={() => exportReport(rep.type)}
              className="w-full text-xs"
            >
              Export {rep.type} CSV
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
