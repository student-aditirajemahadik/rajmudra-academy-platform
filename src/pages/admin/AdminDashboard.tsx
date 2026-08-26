import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import {
  GraduationCap,
  Users,
  FileCheck,
  BookOpen,
  Layers,
  CreditCard,
  TrendingUp,
  Receipt,
  Award,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const students = db.getStudents();
  const teachers = db.getTeachers();
  const courses = db.getCourses();
  const batches = db.getBatches();
  const applications = db.getApplications();
  const fees = db.getFees();
  const enquiries = db.getEnquiries();

  const pendingApps = applications.filter(a => a.status === 'SUBMITTED' || a.status === 'UNDER_REVIEW');
  const activeStudents = students.filter(s => s.status === 'ACTIVE');

  const totalRevenue = fees.reduce((sum, f) => sum + f.paidAmount, 0);
  const totalPendingFees = fees.reduce((sum, f) => sum + f.pendingAmount, 0);

  // Charts mock data
  const monthlyAdmissionsData = [
    { month: 'Jan', admissions: 42, revenue: 630000 },
    { month: 'Feb', admissions: 58, revenue: 870000 },
    { month: 'Mar', admissions: 75, revenue: 1125000 },
    { month: 'Apr', admissions: 90, revenue: 1350000 },
    { month: 'May', admissions: 110, revenue: 1650000 },
    { month: 'Jun', admissions: 145, revenue: 2175000 },
    { month: 'Jul', admissions: 180, revenue: 2700000 },
    { month: 'Aug', admissions: 220, revenue: 3300000 },
  ];

  const coursePopularityData = [
    { name: 'Police Bharti', value: 45, color: '#FF6000' },
    { name: 'MPSC Rajyaseva', value: 25, color: '#2563EB' },
    { name: 'MPSC Combined', value: 18, color: '#16A34A' },
    { name: 'Talathi & Saral Seva', value: 12, color: '#D97706' },
  ];

  const recentPayments = fees.flatMap(f => f.payments).slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Executive Welcome Bar */}
      <div className="bg-gradient-to-r from-rajmudra-black via-rajmudra-charcoal to-rajmudra-black rounded-3xl p-6 sm:p-8 text-white border border-rajmudra-border-gray shadow-premium-dark flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Master Administration • Academic Session 2026-27</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-devanagari">
            राजमुद्रा अकॅडमी नियंत्रण केंद्र (Admin Control Hub)
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            Real-time analytics, admissions management, financial ledger, and academic operations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            leftIcon={<FileCheck className="w-4 h-4" />}
            onClick={() => navigate('/admin/applications')}
            className="shadow-glow-orange text-xs sm:text-sm"
          >
            Review {pendingApps.length} New Applications
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/admin/reports')}
            className="text-white border-gray-600 hover:border-rajmudra-orange hover:bg-rajmudra-orange text-xs sm:text-sm"
          >
            Generate Reports
          </Button>
        </div>
      </div>

      {/* 9 KPI Cards Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card hoverEffect className="p-4 border-l-4 border-l-rajmudra-orange space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span>Total Students</span>
            <GraduationCap className="w-4 h-4 text-rajmudra-orange" />
          </div>
          <div className="text-2xl font-black text-rajmudra-charcoal">{students.length}</div>
          <div className="text-[10px] text-green-600 font-semibold">{activeStudents.length} Active in Batches</div>
        </Card>

        <Card hoverEffect className="p-4 border-l-4 border-l-amber-500 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span>Pending Apps</span>
            <FileCheck className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">{pendingApps.length}</div>
          <div className="text-[10px] text-gray-500">Need Verification</div>
        </Card>

        <Card hoverEffect className="p-4 border-l-4 border-l-blue-600 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span>Total Faculty</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-700">{teachers.length}</div>
          <div className="text-[10px] text-gray-500">Active Instructors</div>
        </Card>

        <Card hoverEffect className="p-4 border-l-4 border-l-green-600 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span>Total Fees Coll.</span>
            <CreditCard className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-green-700">₹{(totalRevenue / 1000).toFixed(0)}K</div>
          <div className="text-[10px] text-gray-500">Collected</div>
        </Card>

        <Card hoverEffect className="p-4 border-l-4 border-l-red-600 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
            <span>Pending Fees</span>
            <Receipt className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-red-600">₹{(totalPendingFees / 1000).toFixed(0)}K</div>
          <div className="text-[10px] text-red-600 font-semibold">Outstanding Dues</div>
        </Card>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Monthly Admissions Trend Area Chart */}
        <div className="lg:col-span-8">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari">
                  मासिक प्रवेश व महसूल कल (Monthly Admissions & Revenue Trend)
                </h3>
                <p className="text-xs text-gray-500">Admission volumes and fee collection growth over 2026</p>
              </div>
              <Badge variant="orange">Live Analytics</Badge>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyAdmissionsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAdmissions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6000" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#FF6000" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', color: '#fff', borderRadius: '12px', border: 'none' }}
                  />
                  <Area type="monotone" dataKey="admissions" stroke="#FF6000" fillOpacity={1} fill="url(#colorAdmissions)" name="New Students" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Course Popularity Pie Chart */}
        <div className="lg:col-span-4">
          <Card className="p-6 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari">
                अभ्यासक्रम लोकप्रियता (Course Share)
              </h3>
              <p className="text-xs text-gray-500">Percentage distribution of student enrollments</p>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={coursePopularityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {coursePopularityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {coursePopularityData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-700 font-medium truncate">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Applications & Recent Payments Table Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-7">
          <Card className="overflow-hidden border border-gray-200">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari">
                  नवीनतम प्रवेश अर्ज (Recent Applications)
                </h3>
                <p className="text-xs text-gray-500">{pendingApps.length} Applications awaiting review</p>
              </div>
              <Link to="/admin/applications" className="text-xs font-bold text-rajmudra-orange hover:underline">
                View All &rarr;
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                  <tr>
                    <th className="p-3.5">App Number</th>
                    <th className="p-3.5">Student</th>
                    <th className="p-3.5">Course</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {applications.slice(0, 5).map(app => (
                    <tr key={app.id} className="hover:bg-gray-50/80">
                      <td className="p-3.5 font-mono font-bold text-rajmudra-orange">{app.applicationNumber}</td>
                      <td className="p-3.5 font-semibold text-rajmudra-charcoal">{app.personalInfo.fullName}</td>
                      <td className="p-3.5 text-gray-600 truncate max-w-[140px]">{app.courseSelection.courseName}</td>
                      <td className="p-3.5">
                        <Badge variant={app.status === 'ENROLLED' ? 'green' : app.status === 'APPROVED' ? 'blue' : 'orange'} size="sm">
                          {app.status}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-right">
                        <Link to="/admin/applications" className="text-xs font-bold text-rajmudra-orange hover:underline">
                          Review
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Recent Payments Feed */}
        <div className="lg:col-span-5">
          <Card className="overflow-hidden border border-gray-200">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari">
                  अलिकडचा फी भरणा (Recent Payments)
                </h3>
                <p className="text-xs text-gray-500">Live verified fee logs</p>
              </div>
              <Link to="/admin/payments" className="text-xs font-bold text-rajmudra-orange hover:underline">
                Logs &rarr;
              </Link>
            </div>

            <div className="divide-y divide-gray-100 text-xs">
              {recentPayments.map(pay => (
                <div key={pay.id} className="p-3.5 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <div className="font-bold text-rajmudra-charcoal">{pay.studentName}</div>
                    <div className="text-[10px] text-gray-500 font-mono">{pay.receiptNumber} • {pay.paymentMethod}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-green-700">₹{pay.amount.toLocaleString('en-IN')}</div>
                    <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.2 rounded font-bold">SUCCESS</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
