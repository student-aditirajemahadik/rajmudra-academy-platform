import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useToast } from '../../context/ToastContext';
import {
  LogIn,
  GraduationCap,
  UserCheck,
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user } = useAuth();
  const { success, error } = useToast();

  const [email, setEmail] = useState('student@rajmudra.com');
  const [password, setPassword] = useState('student123');
  const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'TEACHER' | 'ADMIN'>('STUDENT');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const ok = login(email, selectedRole);
      setIsLoading(false);

      if (ok) {
        success(`Welcome to Rajmudra Academy Portal! Logged in as ${selectedRole}`);
        if (selectedRole === 'ADMIN') navigate('/admin/dashboard');
        else if (selectedRole === 'TEACHER') navigate('/teacher/dashboard');
        else navigate('/student/dashboard');
      } else {
        error('Invalid login credentials. Please use the quick demo accounts.');
      }
    }, 400);
  };

  const handleQuickDemoLogin = (role: 'STUDENT' | 'TEACHER' | 'ADMIN') => {
    setSelectedRole(role);
    let demoEmail = 'student@rajmudra.com';
    let demoPass = 'student123';
    let target = '/student/dashboard';

    if (role === 'TEACHER') {
      demoEmail = 'teacher@rajmudra.com';
      demoPass = 'teacher123';
      target = '/teacher/dashboard';
    } else if (role === 'ADMIN') {
      demoEmail = 'admin@rajmudra.com';
      demoPass = 'admin123';
      target = '/admin/dashboard';
    }

    setEmail(demoEmail);
    setPassword(demoPass);

    login(demoEmail, role);
    success(`Logged in as ${role}`);
    navigate(target);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-100 to-orange-50/40">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-block relative p-1 bg-gradient-to-tr from-rajmudra-orange to-amber-400 rounded-full shadow-glow-orange mb-2">
            <img
              src="/rajmudra-academy-platform/assets/rajmudra-logo.png"
              alt="Rajmudra Academy"
              className="w-16 h-16 rounded-full object-cover bg-black"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-rajmudra-charcoal font-devanagari">
            ॥ राजमुद्रा करिअर अकॅडमी ॥
          </h2>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
            Academy Management Platform Portal
          </p>
        </div>

        {/* Quick Demo Switcher Tabs */}
        <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setSelectedRole('STUDENT');
              setEmail('student@rajmudra.com');
              setPassword('student123');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              selectedRole === 'STUDENT'
                ? 'bg-rajmudra-orange text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedRole('TEACHER');
              setEmail('teacher@rajmudra.com');
              setPassword('teacher123');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              selectedRole === 'TEACHER'
                ? 'bg-rajmudra-orange text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Teacher</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedRole('ADMIN');
              setEmail('admin@rajmudra.com');
              setPassword('admin123');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              selectedRole === 'ADMIN'
                ? 'bg-rajmudra-orange text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {/* Login Form Card */}
        <Card className="p-6 sm:p-8 space-y-5 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Email Address (ईमेल आयडी)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Password (पासवर्ड)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full shadow-glow-orange"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to {selectedRole} Portal
            </Button>
          </form>

          {/* Quick 1-Click Demo Launcher */}
          <div className="pt-4 border-t border-gray-100 space-y-2 text-center">
            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              ⚡ 1-Click Demo Quick Access
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('STUDENT')}
                className="p-2 rounded-xl bg-orange-50 text-rajmudra-orange border border-orange-200 text-xs font-bold hover:bg-rajmudra-orange hover:text-white transition-colors"
              >
                Student Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('TEACHER')}
                className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold hover:bg-blue-600 hover:text-white transition-colors"
              >
                Teacher Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('ADMIN')}
                className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-600 hover:text-white transition-colors"
              >
                Admin Demo
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

