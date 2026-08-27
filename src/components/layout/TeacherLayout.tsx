import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DemoAccountSwitcher } from '../common/DemoAccountSwitcher';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  FileText,
  HelpCircle,
  Award,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

export const TeacherLayout: React.FC = () => {
  const { user, teacherProfile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/teacher/dashboard', icon: LayoutDashboard },
    { name: 'My Batches', path: '/teacher/batches', icon: Users },
    { name: 'Student Roster', path: '/teacher/students', icon: GraduationCap },
    { name: 'Mark Attendance', path: '/teacher/attendance', icon: CalendarCheck },
    { name: 'Study Material', path: '/teacher/material', icon: FileText },
    { name: 'Create / View Tests', path: '/teacher/tests', icon: HelpCircle },
    { name: 'Marks & Grading', path: '/teacher/marks', icon: Award },
    { name: 'Notices & Circulars', path: '/teacher/notices', icon: Bell },
    { name: 'My Profile', path: '/teacher/profile', icon: User },
    { name: 'Settings', path: '/teacher/settings', icon: Settings },
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

      {/* Teacher Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-rajmudra-charcoal text-white flex flex-col transition-transform duration-300 ease-in-out border-r border-rajmudra-border-gray ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-rajmudra-charcoal-light flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/rajmudra-academy-platform/assets/rajmudra-logo.png"
              alt="Rajmudra Academy"
              className="w-10 h-10 rounded-full border border-rajmudra-orange object-cover shadow-glow-orange"
            />
            <div>
              <div className="text-sm font-black text-white font-devanagari">॥ राजमुद्रा ॥</div>
              <div className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                Teacher Portal
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

        {/* Teacher Info Card */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-rajmudra-charcoal-dark border border-rajmudra-charcoal-light flex items-center gap-3">
          <img
            src={teacherProfile?.avatar || user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'}
            alt="Teacher Avatar"
            className="w-11 h-11 rounded-full object-cover border-2 border-blue-400"
          />
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-white truncate">{teacherProfile?.fullName || user?.name || 'Faculty'}</div>
            <div className="text-[10px] text-blue-400 font-semibold truncate">{teacherProfile?.subject?.split('&')[0] || 'Faculty Member'}</div>
            <span className="inline-block mt-0.5 text-[9px] px-1.5 py-0.2 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">
              Verified Instructor
            </span>
          </div>
        </div>

        {/* Nav Items */}
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

        {/* Logout */}
        <div className="p-4 border-t border-rajmudra-charcoal-light">
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
                प्राध्यापक कक्ष (Teacher Portal)
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Assigned Batches: {teacherProfile?.assignedBatchIds.length || 2} | Academic Year 2026-27
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/teacher/attendance"
              className="bg-rajmudra-orange-light text-rajmudra-orange border border-orange-200 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-rajmudra-orange hover:text-white transition-colors hidden sm:flex items-center gap-1.5"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              Quick Attendance
            </Link>

            <Link
              to="/"
              className="text-xs text-gray-600 hover:text-rajmudra-orange font-medium hidden md:inline-block border border-gray-200 px-3 py-1.5 rounded-lg hover:border-rajmudra-orange transition-colors"
            >
              Public Website &rarr;
            </Link>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <DemoAccountSwitcher />
    </div>
  );
};

