import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { Settings, Lock, Bell, Shield, Save } from 'lucide-react';

export const StudentSettingsPage: React.FC = () => {
  const { success } = useToast();
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass) {
      alert('Please fill in password fields.');
      return;
    }
    success('Password updated successfully!');
    setCurrentPass('');
    setNewPass('');
  };

  const handleSavePreferences = () => {
    success('Notification preferences updated!');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
          खाते सेटिंग्ज (Account Settings)
        </h2>
        <p className="text-xs text-gray-500">Manage your portal security, password and notification preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Security & Password */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-rajmudra-charcoal border-b pb-2">
            <Lock className="w-4 h-4 text-rajmudra-orange" />
            <span>Change Portal Password</span>
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

        {/* Notifications */}
        <Card className="p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-rajmudra-charcoal border-b pb-2">
              <Bell className="w-4 h-4 text-rajmudra-orange" />
              <span>Notification Channels</span>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer">
                <div>
                  <div className="text-xs font-bold text-rajmudra-charcoal">Email Notifications</div>
                  <div className="text-[10px] text-gray-500">Receive exam alerts on email</div>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={e => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 text-rajmudra-orange rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer">
                <div>
                  <div className="text-xs font-bold text-rajmudra-charcoal">SMS / WhatsApp Alerts</div>
                  <div className="text-[10px] text-gray-500">Receive urgent timetable changes</div>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={e => setSmsAlerts(e.target.checked)}
                  className="w-4 h-4 text-rajmudra-orange rounded"
                />
              </label>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSavePreferences}
            className="w-full"
          >
            Save Preferences
          </Button>
        </Card>
      </div>
    </div>
  );
};

