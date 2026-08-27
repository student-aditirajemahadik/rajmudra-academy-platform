import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, StudentProfile, TeacherProfile } from '../types';
import { db } from '../services/db';

interface AuthContextType {
  user: User | null;
  studentProfile: StudentProfile | null;
  teacherProfile: TeacherProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: 'ADMIN' | 'TEACHER' | 'STUDENT') => boolean;
  logout: () => void;
  switchRole: (role: 'ADMIN' | 'TEACHER' | 'STUDENT') => void;
  refreshProfiles: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'rma_auth_user_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfiles = (currentUser: User | null) => {
    if (!currentUser) {
      setStudentProfile(null);
      setTeacherProfile(null);
      return;
    }

    if (currentUser.role === 'STUDENT') {
      const sp = db.getStudents().find(s => s.userId === currentUser.id || s.email === currentUser.email) || null;
      setStudentProfile(sp);
      setTeacherProfile(null);
    } else if (currentUser.role === 'TEACHER') {
      const tp = db.getTeachers().find(t => t.userId === currentUser.id || t.email === currentUser.email) || null;
      setTeacherProfile(tp);
      setStudentProfile(null);
    } else {
      setStudentProfile(null);
      setTeacherProfile(null);
    }
  };

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser) as User;
        setUser(parsed);
        loadProfiles(parsed);
      }
    } catch (e) {
      console.error('Failed to parse auth session', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (email: string, requestedRole?: 'ADMIN' | 'TEACHER' | 'STUDENT'): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check known demo accounts
    let foundUser = db.getUsers().find(u => u.email.toLowerCase() === cleanEmail);

    if (!foundUser) {
      // Fallback matching by role or auto-create demo user
      if (cleanEmail.includes('admin') || requestedRole === 'ADMIN') {
        foundUser = db.getUsers().find(u => u.role === 'ADMIN');
      } else if (cleanEmail.includes('teacher') || requestedRole === 'TEACHER') {
        foundUser = db.getUsers().find(u => u.role === 'TEACHER');
      } else {
        foundUser = db.getUsers().find(u => u.role === 'STUDENT');
      }
    }

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(foundUser));
      loadProfiles(foundUser);
      db.logAction(foundUser.id, foundUser.name, foundUser.role, 'LOGIN', 'User', foundUser.id, `User logged in as ${foundUser.role}`);
      return true;
    }

    return false;
  };

  const logout = () => {
    if (user) {
      db.logAction(user.id, user.name, user.role, 'LOGOUT', 'User', user.id, 'User logged out');
    }
    setUser(null);
    setStudentProfile(null);
    setTeacherProfile(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const switchRole = (role: 'ADMIN' | 'TEACHER' | 'STUDENT') => {
    const targetUser = db.getUsers().find(u => u.role === role);
    if (targetUser) {
      setUser(targetUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(targetUser));
      loadProfiles(targetUser);
      db.logAction(targetUser.id, targetUser.name, targetUser.role, 'SWITCH_ROLE', 'User', targetUser.id, `Switched demo role to ${role}`);
    }
  };

  const refreshProfiles = () => {
    if (user) {
      loadProfiles(user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        studentProfile,
        teacherProfile,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchRole,
        refreshProfiles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

