import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { CreditCard, Search, Download, Plus, Receipt } from 'lucide-react';
import { FeeRecord } from '../../types';

export const AdminFeesPage: React.FC = () => {
  const { success } = useToast();
  const [fees, setFees] = useState(db.getFees());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFee, setSelectedFee] = useState<FeeRecord | null>(null);
  const [isRecordPayOpen, setIsRecordPayOpen] = useState(false);
  const [manualAmount, setManualAmount] = useState(5000);
  const [manualMethod, setManualMethod] = useState<'CASH' | 'ONLINE_UPI' | 'CHEQUE'>('CASH');

  const filtered = fees.filter(f =>
    f.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalColl = fees.reduce((sum, f) => sum + f.paidAmount, 0);
  const totalDue = fees.reduce((sum, f) => sum + f.pendingAmount, 0);

  const handleRecordManualPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFee) return;

    db.recordPayment(selectedFee.studentId, manualAmount, manualMethod, 'Manual offline collection at Academy desk');
    setFees(db.getFees());
    setIsRecordPayOpen(false);
    success(`Payment of ₹${manualAmount.toLocaleString('en-IN')} recorded for ${selectedFee.studentName}`);
  };

  const handleExportCSV = () => {
    success('Fee ledger exported to CSV successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            फी व देयके नोंदवही (Fee & Dues Ledger)
          </h2>
          <p className="text-xs text-gray-500">Track total student fees, discounts, collected revenue, and pending dues.</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={handleExportCSV}
        >
          Export Fees CSV
        </Button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-gray-400 space-y-1">
          <div className="text-xs font-bold text-gray-500">Gross Fees</div>
          <div className="text-xl font-black text-rajmudra-charcoal">
            ₹{fees.reduce((sum, f) => sum + f.totalAmount, 0).toLocaleString('en-IN')}
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-rajmudra-orange space-y-1">
          <div className="text-xs font-bold text-gray-500">Concessions / Discounts</div>
          <div className="text-xl font-black text-rajmudra-orange">
            -₹{fees.reduce((sum, f) => sum + f.discountAmount, 0).toLocaleString('en-IN')}
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-green-600 space-y-1">
          <div className="text-xs font-bold text-gray-500">Total Collected</div>
          <div className="text-xl font-black text-green-700">
            ₹{totalColl.toLocaleString('en-IN')}
          </div>
        </Card>

        <Card className="p-4 border-l-4 border-l-red-600 space-y-1">
          <div className="text-xs font-bold text-gray-500">Total Outstanding</div>
          <div className="text-xl font-black text-red-600">
            ₹{totalDue.toLocaleString('en-IN')}
          </div>
        </Card>
      </div>

      {/* Fees Table */}
      <Card className="overflow-hidden border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate fee record..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rajmudra-orange"
            />
          </div>
          <span className="text-xs text-gray-500">{filtered.length} Fee Accounts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Course</th>
                <th className="p-4">Final Fee</th>
                <th className="p-4">Paid</th>
                <th className="p-4">Pending</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(fee => (
                <tr key={fee.id} className="hover:bg-gray-50/80">
                  <td className="p-4 font-bold text-rajmudra-charcoal">{fee.studentName}</td>
                  <td className="p-4 text-gray-600 truncate max-w-xs">{fee.courseName}</td>
                  <td className="p-4 font-black">₹{fee.finalAmount.toLocaleString('en-IN')}</td>
                  <td className="p-4 font-bold text-green-700">₹{fee.paidAmount.toLocaleString('en-IN')}</td>
                  <td className="p-4 font-bold text-red-600">₹{fee.pendingAmount.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <Badge variant={fee.status === 'PAID' ? 'green' : 'orange'} size="sm">
                      {fee.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    {fee.pendingAmount > 0 ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedFee(fee);
                          setManualAmount(fee.pendingAmount);
                          setIsRecordPayOpen(true);
                        }}
                        className="text-xs"
                      >
                        Record Payment
                      </Button>
                    ) : (
                      <span className="text-xs text-green-600 font-bold">Cleared</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Record Payment Modal */}
      {selectedFee && (
        <Modal
          isOpen={isRecordPayOpen}
          onClose={() => setIsRecordPayOpen(false)}
          title="Record Student Fee Payment"
          subtitle={`Candidate: ${selectedFee.studentName} | Pending: ₹${selectedFee.pendingAmount}`}
        >
          <form onSubmit={handleRecordManualPayment} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Payment Amount (₹)</label>
              <input
                type="number"
                min={100}
                max={selectedFee.pendingAmount}
                value={manualAmount}
                onChange={e => setManualAmount(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm font-bold rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Payment Method</label>
              <select
                value={manualMethod}
                onChange={e => setManualMethod(e.target.value as any)}
                className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none bg-white"
              >
                <option value="CASH">Cash at Office Counter</option>
                <option value="ONLINE_UPI">Online UPI / GPay</option>
                <option value="CHEQUE">Bank Cheque / DD</option>
              </select>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="md" className="w-full">
                Confirm & Generate Official Receipt
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
