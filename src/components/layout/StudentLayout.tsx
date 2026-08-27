import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DemoAccountSwitcher } from '../common/DemoAccountSwitcher';
import {
  LayoutDashboard,
  User,
  FileCheck,
  BookOpen,
  Users,
  CalendarCheck,
  CreditCard,
  FileText,
  HelpCircle,
  Award,
  FolderLock,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

export const StudentLayout: React.FC = () => {
  const { user, studentProfile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', path: '/student/profile', icon: User },
    { name: 'Admission Application', path: '/student/application', icon: FileCheck },
    { name: 'My Course', path: '/student/course', icon: BookOpen },
    { name: 'My Batch', path: '/student/batch', icon: Users },
    { name: 'Attendance', path: '/student/attendance', icon: CalendarCheck },
    { name: 'Fees & Receipts', path: '/student/fees', icon: CreditCard },
    { name: 'Study Material', path: '/student/material', icon: FileText },
    { name: 'Online Tests', path: '/student/tests', icon: HelpCircle },
    { name: 'Exam Results', path: '/student/results', icon: Award },
    { name: 'Documents', path: '/student/documents', icon: FolderLock },
    { name: 'Notices', path: '/student/notices', icon: Bell },
    { name: 'Settings', path: '/student/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
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

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-rajmudra-charcoal text-white flex flex-col transition-transform duration-300 ease-in-out border-r border-rajmudra-border-gray ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-rajmudra-charcoal-light flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/rajmudra-academy-platform/assets/rajmudra-logo.png"
              alt="Rajmudra Academy"
              className="w-10 h-10 rounded-full border border-rajmudra-orange object-cover shadow-glow-orange"
            />
            <div>
              <div className="text-sm font-black text-white font-devanagari">॥ राजमुद्रा ॥</div>
              <div className="text-[10px] text-rajmudra-orange font-bold uppercase tracking-wider">
                Student Portal
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

        {/* Student Profile Card in Sidebar */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-rajmudra-charcoal-dark border border-rajmudra-charcoal-light flex items-center gap-3">
          <img
            src={studentProfile?.avatar || user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
            alt="Student Avatar"
            className="w-11 h-11 rounded-full object-cover border-2 border-rajmudra-orange"
          />
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-white truncate">{studentProfile?.fullName || user?.name || 'Student'}</div>
            <div className="text-[10px] text-rajmudra-orange font-semibold">{studentProfile?.studentId || 'RMA-STU-2026-001'}</div>
            <span className="inline-block mt-0.5 text-[9px] px-1.5 py-0.2 rounded bg-green-900/60 text-green-300 border border-green-700/50">
              Active Student
            </span>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-rajmudra-orange text-white shadow-glow-orange font-bold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-rajmudra-orange'}`} />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer with Logout */}
        <div className="p-4 border-t border-rajmudra-charcoal-light space-y-2">
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
              <h1 className="text-base sm:text-lg font-bold text-rajmudra-charcoal">
                विद्यार्थी कक्ष (Student Portal)
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Welcome back, {studentProfile?.fullName || user?.name}! Keep working towards your goal.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/student/notices"
              className="relative p-2 rounded-full text-gray-600 hover:bg-orange-50 hover:text-rajmudra-orange transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rajmudra-orange rounded-full animate-ping" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rajmudra-orange rounded-full" />
            </Link>

            <Link
              to="/"
              className="text-xs text-gray-600 hover:text-rajmudra-orange font-medium hidden md:inline-block border border-gray-200 px-3 py-1.5 rounded-lg hover:border-rajmudra-orange transition-colors"
            >
              Public Website &rarr;
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

