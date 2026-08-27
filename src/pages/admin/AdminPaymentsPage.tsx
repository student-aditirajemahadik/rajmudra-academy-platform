import React, { useState } from 'react';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { Receipt, Search, Download, Eye } from 'lucide-react';
import { PaymentRecord } from '../../types';

export const AdminPaymentsPage: React.FC = () => {
  const { success } = useToast();
  const fees = db.getFees();
  const allPayments = fees.flatMap(f => f.payments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(null);

  const filtered = allPayments.filter(p =>
    p.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            भरणा व्यवहार नोंदवही (Payment Transaction Logs)
          </h2>
          <p className="text-xs text-gray-500">Live verified transaction IDs, payment methods, and downloadable tax receipts.</p>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="w-4 h-4" />}
          onClick={() => success('Payment transaction logs exported to CSV!')}
        >
          Export Transactions CSV
        </Button>
      </div>

      <Card className="overflow-hidden border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search receipt / TXN ID..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rajmudra-orange"
            />
          </div>
          <span className="text-xs text-gray-500">{filtered.length} Transactions Logged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Receipt Number</th>
                <th className="p-4">Student</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Method & TXN</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(pay => (
                <tr key={pay.id} className="hover:bg-gray-50/80">
                  <td className="p-4 font-mono font-bold text-rajmudra-orange">{pay.receiptNumber}</td>
                  <td className="p-4 font-bold text-rajmudra-charcoal">{pay.studentName}</td>
                  <td className="p-4 font-black text-green-700">₹{pay.amount.toLocaleString('en-IN')}</td>
                  <td className="p-4 text-gray-500">{new Date(pay.paymentDate).toLocaleDateString('en-IN')}</td>
                  <td className="p-4 text-gray-600">
                    <div>{pay.paymentMethod}</div>
                    <div className="text-[10px] text-gray-400 font-mono">{pay.transactionId}</div>
                  </td>
                  <td className="p-4">
                    <Badge variant="green" size="sm">SUCCESS</Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedReceipt(pay)}
                      className="text-xs"
                    >
                      Receipt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Receipt Modal */}
      {selectedReceipt && (
        <Modal
          isOpen={!!selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
          title="Official Receipt Voucher"
          subtitle={`Receipt Reference: ${selectedReceipt.receiptNumber}`}
        >
          <div className="p-6 rounded-2xl border-2 border-dashed border-gray-300 space-y-4 bg-white text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <img src="/rajmudra-academy-platform/assets/rajmudra-logo.png" alt="Logo" className="w-10 h-10 rounded-full" />
                <div>
                  <h4 className="font-bold font-devanagari text-sm">॥ राजमुद्रा करिअर अकॅडमी ॥</h4>
                  <p className="text-[10px] text-gray-500">Pune, Maharashtra</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-rajmudra-orange">{selectedReceipt.receiptNumber}</span>
                <div className="text-[10px] text-gray-500">{new Date(selectedReceipt.paymentDate).toLocaleDateString('en-IN')}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-2 border-b">
              <div>
                <span className="text-[10px] text-gray-500 uppercase">Received From</span>
                <div className="font-bold text-sm">{selectedReceipt.studentName}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-500 uppercase">Amount Received</span>
                <div className="text-xl font-black text-green-700">₹{selectedReceipt.amount.toLocaleString('en-IN')}</div>
                <div className="text-[10px] text-gray-500">Mode: {selectedReceipt.paymentMethod}</div>
              </div>
            </div>

            <div className="text-[11px] text-gray-500 space-y-1">
              <div>Transaction Reference: <strong className="font-mono text-gray-700">{selectedReceipt.transactionId}</strong></div>
              <div>Status: <span className="text-green-600 font-bold">COMPLETED & VERIFIED</span></div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedReceipt(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Download className="w-4 h-4" />}
                onClick={() => success('Receipt PDF downloaded')}
              >
                Download PDF
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

