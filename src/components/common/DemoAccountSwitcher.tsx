import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserCheck, ShieldCheck, GraduationCap, ArrowRightLeft, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export const DemoAccountSwitcher: React.FC = () => {
  const { user, login, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleRoleSelect = (role: 'ADMIN' | 'TEACHER' | 'STUDENT', path: string) => {
    switchRole(role);
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className="bg-rajmudra-black/90 backdrop-blur-md text-white rounded-2xl shadow-premium-dark border border-rajmudra-border-gray p-2 transition-all duration-300">
        <div className="flex items-center justify-between gap-3 px-2 py-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rajmudra-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rajmudra-orange"></span>
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Demo Role Switcher</span>
              <span className="text-xs font-bold text-rajmudra-orange">
                {user ? `${user.role} (${user.name.split(' ')[0]})` : 'Public Visitor'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-lg bg-rajmudra-charcoal hover:bg-rajmudra-orange text-white transition-colors"
            title="Toggle Role Quick Switcher"
          >
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {isOpen && (
          <div className="mt-3 pt-3 border-t border-rajmudra-charcoal-light flex flex-col gap-1.5 w-64 animate-in fade-in slide-in-from-bottom-2">
            <button
              onClick={() => handleRoleSelect('STUDENT', '/student/dashboard')}
              className={`flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors ${
                user?.role === 'STUDENT' ? 'bg-rajmudra-orange text-white font-bold' : 'hover:bg-rajmudra-charcoal text-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-orange-300" />
                <div>
                  <div className="font-semibold">Student Portal</div>
                  <div className="text-[10px] text-gray-300">student@rajmudra.com</div>
                </div>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20">Go &rarr;</span>
            </button>

            <button
              onClick={() => handleRoleSelect('TEACHER', '/teacher/dashboard')}
              className={`flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors ${
                user?.role === 'TEACHER' ? 'bg-rajmudra-orange text-white font-bold' : 'hover:bg-rajmudra-charcoal text-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-300" />
                <div>
                  <div className="font-semibold">Teacher Portal</div>
                  <div className="text-[10px] text-gray-300">teacher@rajmudra.com</div>
                </div>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20">Go &rarr;</span>
            </button>

            <button
              onClick={() => handleRoleSelect('ADMIN', '/admin/dashboard')}
              className={`flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors ${
                user?.role === 'ADMIN' ? 'bg-rajmudra-orange text-white font-bold' : 'hover:bg-rajmudra-charcoal text-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <div>
                  <div className="font-semibold">Admin Portal</div>
                  <div className="text-[10px] text-gray-300">admin@rajmudra.com</div>
                </div>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20">Go &rarr;</span>
            </button>

            <div className="pt-2 border-t border-rajmudra-charcoal-light flex items-center justify-between text-[11px] px-1 text-gray-400">
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                  setIsOpen(false);
                }}
                className="hover:text-red-400 underline"
              >
                Logout (Public)
              </button>
              <button
                onClick={() => {
                  navigate('/apply');
                  setIsOpen(false);
                }}
                className="hover:text-rajmudra-orange font-medium"
              >
                Apply Online &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

