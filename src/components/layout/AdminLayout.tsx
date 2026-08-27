import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DemoAccountSwitcher } from '../common/DemoAccountSwitcher';
import {
  LayoutDashboard,
  FileCheck,
  GraduationCap,
  UserCheck,
  BookOpen,
  Layers,
  UserPlus,
  CalendarCheck,
  CreditCard,
  Receipt,
  FileText,
  HelpCircle,
  Award,
  Bell,
  Send,
  Image,
  MessageSquareQuote,
  PhoneIncoming,
  BarChart3,
  Settings,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Shield,
  RotateCcw,
} from 'lucide-react';
import { db } from '../../services/db';
import { useToast } from '../../context/ToastContext';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { success } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuSections = [
    {
      title: 'मुख्य संचालन (Core Operations)',
      items: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Applications', path: '/admin/applications', icon: FileCheck, badge: 'New' },
        { name: 'Students', path: '/admin/students', icon: GraduationCap },
        { name: 'Teachers / Faculty', path: '/admin/teachers', icon: UserCheck },
        { name: 'Courses', path: '/admin/courses', icon: BookOpen },
        { name: 'Batches', path: '/admin/batches', icon: Layers },
        { name: 'Enrollments', path: '/admin/enrollments', icon: UserPlus },
      ],
    },
    {
      title: 'शैक्षणिक व परीक्षा (Academics & Exams)',
      items: [
        { name: 'Attendance Records', path: '/admin/attendance', icon: CalendarCheck },
        { name: 'Study Material Hub', path: '/admin/material', icon: FileText },
        { name: 'Tests & Exams', path: '/admin/tests', icon: HelpCircle },
        { name: 'Exam Results', path: '/admin/results', icon: Award },
      ],
    },
    {
      title: 'आर्थिक व लेखा (Finance & Accounts)',
      items: [
        { name: 'Fees & Dues', path: '/admin/fees', icon: CreditCard },
        { name: 'Payment Logs', path: '/admin/payments', icon: Receipt },
      ],
    },
    {
      title: 'संवाद व वेबसाइट (Media & Leads)',
      items: [
        { name: 'Notices & Circulars', path: '/admin/notices', icon: Bell },
        { name: 'Notifications', path: '/admin/notifications', icon: Send },
        { name: 'Enquiries / Leads CRM', path: '/admin/enquiries', icon: PhoneIncoming },
        { name: 'Gallery Manager', path: '/admin/gallery', icon: Image },
        { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
      ],
    },
    {
      title: 'अहवाल व नियंत्रण (Reports & Settings)',
      items: [
        { name: 'Reports & Export', path: '/admin/reports', icon: BarChart3 },
        { name: 'Academy Settings', path: '/admin/settings', icon: Settings },
        { name: 'Audit Logs', path: '/admin/audit-logs', icon: ShieldCheck },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo data back to factory defaults?')) {
      db.resetToDefaults();
      success('Demo data restored to initial state');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-rajmudra-off-white flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-rajmudra-black text-white flex flex-col transition-transform duration-300 ease-in-out border-r border-rajmudra-border-gray ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-rajmudra-charcoal flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={`/rajmudra-academy-platform/assets/rajmudra-logo.png`}
              alt="Rajmudra Academy"
              className="w-10 h-10 rounded-full border-2 border-rajmudra-orange object-cover shadow-glow-orange"
            />
            <div>
              <div className="text-sm font-black text-white font-devanagari">॥ राजमुद्रा ॥</div>
              <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Super Admin
              </div>
            </div>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Quick Profile */}
        <div className="p-3 mx-3 my-2 rounded-xl bg-rajmudra-charcoal border border-rajmudra-charcoal-light flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rajmudra-orange flex items-center justify-center font-bold text-xs text-white">
              SP
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">Director Sandip Patil</div>
              <div className="text-[10px] text-gray-400">Master Administrator</div>
            </div>
          </div>
          <button
            onClick={handleResetData}
            title="Reset Mock Database to Initial State"
            className="p-1.5 rounded-lg bg-rajmudra-charcoal-dark hover:bg-rajmudra-orange text-gray-300 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-4 overflow-y-auto">
          {menuSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <div className="px-3 text-[10px] font-bold tracking-wider text-gray-500 uppercase">
                {section.title}
              </div>
              {section.items.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-rajmudra-orange text-white shadow-glow-orange font-bold'
                        : 'text-gray-300 hover:bg-rajmudra-charcoal hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-rajmudra-orange'}`} />
                      <span>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                          {item.badge}
                        </span>
                      )}
                      {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-rajmudra-charcoal">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-red-950/40 text-red-400 hover:bg-red-900/60 hover:text-white border border-red-800/30 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-rajmudra-charcoal flex items-center gap-2">
                प्रशासन कक्ष (Admin Management Hub)
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Rajmudra Career Academy Administration & Operations Control Center
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetData}
              className="hidden md:flex items-center gap-1.5 text-xs text-gray-600 hover:text-rajmudra-orange border border-gray-200 px-2.5 py-1.5 rounded-lg hover:border-rajmudra-orange transition-colors"
              title="Reset sample data"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
              <span>Reset Data</span>
            </button>

            <Link
              to="/admin/reports"
              className="bg-rajmudra-charcoal text-white text-xs px-3 py-1.5 rounded-lg font-semibold hover:bg-black transition-colors hidden sm:flex items-center gap-1.5"
            >
              <BarChart3 className="w-3.5 h-3.5 text-rajmudra-orange" />
              <span>Reports Hub</span>
            </Link>

            <Link
              to="/"
              className="text-xs text-gray-600 hover:text-rajmudra-orange font-medium hidden sm:inline-block border border-gray-200 px-3 py-1.5 rounded-lg hover:border-rajmudra-orange transition-colors"
            >
              Public Site &rarr;
            </Link>
          </div>
        </header>

        {/* Sub-view Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <DemoAccountSwitcher />
    </div>
  );
};




