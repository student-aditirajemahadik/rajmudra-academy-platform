import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import {
  Menu,
  X,
  GraduationCap,
  PhoneCall,
  LogIn,
  LayoutDashboard,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

export const PublicHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Batches', path: '/batches' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'Results', path: '/results' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Notices', path: '/notices' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN') return '/admin/dashboard';
    if (user.role === 'TEACHER') return '/teacher/dashboard';
    return '/student/dashboard';
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top emergency announcement ticker bar */}
      <div className="bg-rajmudra-black text-white text-xs py-1.5 px-4 border-b border-rajmudra-charcoal-light">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="bg-rajmudra-orange text-[10px] font-extrabold px-2 py-0.5 rounded text-white uppercase tracking-wider animate-pulse">
              Admissions Open
            </span>
            <span className="text-gray-300 font-medium truncate">
              महाराष्ट्र पोलीस भरती व MPSC नवीन बॅचेस प्रवेश सुरू | मर्यादित जागा!
            </span>
          </div>
          <div className="flex items-center gap-4 text-gray-300 text-[11px]">
            <a href="tel:+919822012345" className="flex items-center gap-1 hover:text-rajmudra-orange transition-colors">
              <PhoneCall className="w-3 h-3 text-rajmudra-orange" />
              <span>+91 98220 12345</span>
            </a>
            <span className="text-gray-600">|</span>
            <span className="text-orange-400 font-medium">पुणे • सातारा • अहिल्यानगर</span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-rajmudra-charcoal/95 backdrop-blur-md shadow-premium-dark border-b border-rajmudra-border-gray py-2.5'
            : 'bg-rajmudra-black border-b border-rajmudra-charcoal py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo with Devanagari branding */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative overflow-hidden rounded-full p-0.5 bg-gradient-to-tr from-rajmudra-orange to-amber-400 group-hover:scale-105 transition-transform duration-300 shadow-glow-orange">
              <img
                src={`/rajmudra-academy-platform/assets/rajmudra-logo.png`}
                alt="Rajmudra Career Academy Logo"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover bg-black"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black text-lg sm:text-xl tracking-tight flex items-center gap-1.5 font-devanagari">
                ॥ राजमुद्रा ॥
                <span className="text-[10px] font-bold text-rajmudra-orange px-1.5 py-0.2 rounded bg-orange-950/60 border border-orange-500/30">
                  SINCE 2017
                </span>
              </span>
              <span className="text-gray-300 text-xs font-semibold tracking-wider uppercase font-devanagari">
                करिअर अकॅडमी • Pune
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-rajmudra-orange bg-white/10 font-semibold'
                      : 'text-gray-200 hover:text-rajmudra-orange hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {user ? (
              <Button
                variant="outline"
                size="sm"
                leftIcon={<LayoutDashboard className="w-4 h-4" />}
                onClick={() => navigate(getDashboardPath())}
                className="border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-white"
              >
                {user.role} Dashboard
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<LogIn className="w-4 h-4" />}
                onClick={() => navigate('/login')}
                className="text-gray-200 hover:text-white hover:bg-white/10"
              >
                Student Login
              </Button>
            )}

            <Button
              variant="primary"
              size="sm"
              leftIcon={<GraduationCap className="w-4 h-4" />}
              onClick={() => navigate('/apply')}
              className="shadow-glow-orange"
            >
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-rajmudra-orange" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-rajmudra-charcoal border-b border-rajmudra-border-gray px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-1.5 mb-4">
              {navLinks.map(link => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
                      isActive
                        ? 'bg-rajmudra-orange text-white'
                        : 'text-gray-200 hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                    <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-gray-700 flex flex-col gap-2">
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center"
                leftIcon={<GraduationCap className="w-5 h-5" />}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/apply');
                }}
              >
                Apply for Online Admission
              </Button>

              <Button
                variant="outline"
                size="md"
                className="w-full justify-center text-gray-200 border-gray-600 hover:border-rajmudra-orange hover:bg-rajmudra-orange hover:text-white"
                leftIcon={<LogIn className="w-5 h-5" />}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate(getDashboardPath());
                }}
              >
                {user ? `${user.role} Portal` : 'Portal Login'}
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};




