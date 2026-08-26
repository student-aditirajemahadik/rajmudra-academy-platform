import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { Settings, Lock, Bell } from 'lucide-react';

export const TeacherSettingsPage: React.FC = () => {
  const { success } = useToast();
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass) return;
    success('Teacher password updated successfully!');
    setCurrentPass('');
    setNewPass('');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
          प्राध्यापक खाते सेटिंग्ज (Faculty Settings)
        </h2>
        <p className="text-xs text-gray-500">Security preferences and faculty portal access settings.</p>
      </div>

      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-rajmudra-charcoal border-b pb-2">
          <Lock className="w-4 h-4 text-rajmudra-orange" />
          <span>Change Password</span>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Current Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={currentPass}
              onChange={e => setCurrentPass(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={newPass}
              onChange={e => setNewPass(e.target.value)}
              className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
            />
          </div>

          <Button type="submit" variant="primary" size="sm" className="w-full">
            Update Password
          </Button>
        </form>
      </Card>
    </div>
  );
};
