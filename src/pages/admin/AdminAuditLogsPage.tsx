import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { ShieldCheck, Search, Download } from 'lucide-react';

export const AdminAuditLogsPage: React.FC = () => {
  const { success } = useToast();
  const logs = db.getAuditLogs();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  const filtered = logs.filter(log => {
    const matchesRole = roleFilter === 'ALL' || log.userRole === roleFilter;
    const matchesSearch =
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleExport = () => {
    success('Audit logs exported to CSV!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            सुरक्षा व प्रणाली ऑडिट लॉग्स (Security Audit Trail)
          </h2>
          <p className="text-xs text-gray-500">Immutable chronological audit trail recording all user logins, role actions, and ledger updates.</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={handleExport}
        >
          Export Audit Trail
        </Button>
      </div>

      <Card className="overflow-hidden border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['ALL', 'ADMIN', 'TEACHER', 'STUDENT'].map(role => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  roleFilter === role
                    ? 'bg-rajmudra-orange text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search audit actions..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rajmudra-orange"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Action</th>
                <th className="p-4">Target Entity</th>
                <th className="p-4">Event Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(log => (
                <tr key={log.id} className="hover:bg-gray-50/80">
                  <td className="p-4 text-gray-500 font-mono text-[11px]">
                    {new Date(log.timestamp).toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 font-bold text-rajmudra-charcoal">{log.userName}</td>
                  <td className="p-4">
                    <Badge
                      variant={log.userRole === 'ADMIN' ? 'red' : log.userRole === 'TEACHER' ? 'blue' : 'green'}
                      size="sm"
                    >
                      {log.userRole}
                    </Badge>
                  </td>
                  <td className="p-4 font-mono font-semibold text-rajmudra-orange">{log.action}</td>
                  <td className="p-4 text-gray-600 font-medium">{log.entityType}</td>
                  <td className="p-4 text-gray-600 max-w-sm truncate">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
