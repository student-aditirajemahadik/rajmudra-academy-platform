import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { Send, Bell, CheckCircle2 } from 'lucide-react';

export const AdminNotificationsPage: React.FC = () => {
  const { success } = useToast();
  const [notifications, setNotifications] = useState(db.getNotifications());
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetType, setTargetType] = useState<'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT'>('INFO');
  const [targetUser, setTargetUser] = useState<'ALL' | 'usr-stu-01' | 'usr-teach-01'>('ALL');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;

    db.sendNotification({
      userId: targetUser,
      title,
      message,
      type: targetType,
    });

    setNotifications(db.getNotifications());
    setTitle('');
    setMessage('');
    success('Broadcast push notification sent successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
          सूचना व नोटिफिकेशन्स प्रेषक (In-App Notification Dispatcher)
        </h2>
        <p className="text-xs text-gray-500">Send real-time in-app alerts and notifications to enrolled students and faculty.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Send Box */}
        <div className="lg:col-span-5">
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari">
              नवीन अलर्ट पाठवा (Broadcast Alert)
            </h3>

            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Target Recipient</label>
                <select
                  value={targetUser}
                  onChange={e => setTargetUser(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white"
                >
                  <option value="ALL">All Active Students & Faculty</option>
                  <option value="usr-stu-01">Student (Prathamesh Kulkarni)</option>
                  <option value="usr-teach-01">Faculty (Prof. Ramesh Shinde)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Alert Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. उद्याची सराव परीक्षा वेळ"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Alert Message</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Type notification message..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Type</label>
                <select
                  value={targetType}
                  onChange={e => setTargetType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white"
                >
                  <option value="INFO">Informational (Blue)</option>
                  <option value="SUCCESS">Success (Green)</option>
                  <option value="WARNING">Urgent Notice (Orange)</option>
                  <option value="ALERT">Critical Alert (Red)</option>
                </select>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                leftIcon={<Send className="w-4 h-4" />}
                className="w-full"
              >
                Broadcast Notification
              </Button>
            </form>
          </Card>
        </div>

        {/* Live List */}
        <div className="lg:col-span-7">
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari">
              अलीकडील नोटिफिकेशन्स (Dispatched In-App Alerts)
            </h3>

            <div className="space-y-3">
              {notifications.map(item => (
                <div key={item.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-gray-500">
                    <span className="font-bold text-rajmudra-orange">{item.type}</span>
                    <span>{new Date(item.createdAt).toLocaleString()}</span>
                  </div>
                  <h4 className="text-xs font-bold text-rajmudra-charcoal">{item.title}</h4>
                  <p className="text-[11px] text-gray-600">{item.message}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

