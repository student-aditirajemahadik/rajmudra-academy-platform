import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { MessageSquare, Phone, Mail, Search, CheckCircle } from 'lucide-react';
import { Enquiry } from '../../types';

export const AdminEnquiriesPage: React.FC = () => {
  const { success } = useToast();
  const [enquiries, setEnquiries] = useState(db.getEnquiries());
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = enquiries.filter(e =>
    e.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.phone.includes(searchTerm) ||
    e.courseInterested.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateStatus = (enquiry: Enquiry, status: Enquiry['status']) => {
    const updated = { ...enquiry, status };
    db.saveEnquiry(updated);
    setEnquiries(db.getEnquiries());
    success(`Enquiry from ${enquiry.fullName} updated to ${status}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            चौकशी व समुपदेशन लीड्स (Enquiries & Leads CRM)
          </h2>
          <p className="text-xs text-gray-500">Track student queries, counsel prospects, and record admission conversion status.</p>
        </div>

        <div className="relative w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
          />
        </div>
      </div>

      <Card className="overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Lead Name</th>
                <th className="p-4">Phone / Email</th>
                <th className="p-4">Interested Course</th>
                <th className="p-4">Message / Query</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Lead Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/80">
                  <td className="p-4 font-bold text-rajmudra-charcoal">{item.fullName}</td>
                  <td className="p-4 text-gray-600">
                    <div>{item.phone}</div>
                    <div className="text-[11px] text-gray-400">{item.email}</div>
                  </td>
                  <td className="p-4 text-rajmudra-orange font-semibold">{item.courseInterested}</td>
                  <td className="p-4 text-gray-600 max-w-xs truncate">{item.message}</td>
                  <td className="p-4">
                    <Badge
                      variant={
                        item.status === 'CONVERTED'
                          ? 'green'
                          : item.status === 'INTERESTED'
                          ? 'blue'
                          : item.status === 'CONTACTED'
                          ? 'yellow'
                          : 'orange'
                      }
                      size="sm"
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={item.status}
                      onChange={e => handleUpdateStatus(item, e.target.value as any)}
                      className="px-2.5 py-1 text-xs rounded-lg border border-gray-200 bg-white font-medium focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
                    >
                      <option value="NEW">NEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="INTERESTED">INTERESTED</option>
                      <option value="CONVERTED">CONVERTED</option>
                      <option value="NOT_INTERESTED">NOT_INTERESTED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
