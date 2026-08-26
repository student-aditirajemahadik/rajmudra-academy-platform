import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/db';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { CreditCard, Receipt, CheckCircle2, Download, ShieldCheck, Sparkles } from 'lucide-react';
import { PaymentRecord } from '../../types';

export const StudentFeesPage: React.FC = () => {
  const { studentProfile } = useAuth();
  const { success } = useToast();
  const studentId = studentProfile?.id || 'stu-01';

  const [feeRecord, setFeeRecord] = useState(
    db.getFeeByStudentId(studentId) || db.getFees()[0]
  );
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [payAmount, setPayAmount] = useState<number>(feeRecord?.pendingAmount || 5000);
  const [payMethod, setPayMethod] = useState<'ONLINE_UPI' | 'NET_BANKING' | 'CREDIT_CARD'>('ONLINE_UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(null);

  const handleSimulatedPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (payAmount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      const payment = db.recordPayment(studentId, payAmount, payMethod, 'Student Demo Payment');
      const updated = db.getFeeByStudentId(studentId) || feeRecord;
      setFeeRecord(updated);
      setIsProcessing(false);
      setIsPayModalOpen(false);
      setSelectedReceipt(payment);
      success(`₹${payAmount.toLocaleString('en-IN')} payment successful! Receipt generated.`);
    }, 600);
  };

  const handleDownloadReceipt = () => {
    success('Fee Receipt downloaded successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-rajmudra-charcoal font-devanagari">
            फी व देयके (Fees & Payment Receipts)
          </h2>
          <p className="text-xs text-gray-500">Track admission installments, due dates and download official receipts.</p>
        </div>

        {feeRecord.pendingAmount > 0 ? (
          <Button
            variant="primary"
            size="md"
            leftIcon={<CreditCard className="w-4 h-4" />}
            onClick={() => {
              setPayAmount(feeRecord.pendingAmount);
              setIsPayModalOpen(true);
            }}
            className="shadow-glow-orange"
          >
            Pay Pending Fees (Demo)
          </Button>
        ) : (
          <Badge variant="green" size="md">
            ✓ 100% Fees Paid
          </Badge>
        )}
      </div>

      {/* Fee Breakdown Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-gray-400 space-y-1">
          <div className="text-xs font-bold text-gray-500">Course Total Fee</div>
          <div className="text-xl sm:text-2xl font-black text-rajmudra-charcoal">
            ₹{feeRecord.totalAmount.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-gray-400">Standard Package</div>
        </Card>

        <Card className="p-5 border-l-4 border-l-rajmudra-orange space-y-1">
          <div className="text-xs font-bold text-gray-500">Discount / Concession</div>
          <div className="text-xl sm:text-2xl font-black text-rajmudra-orange">
            -₹{feeRecord.discountAmount.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-green-600 font-semibold">Scholarship Applied</div>
        </Card>

        <Card className="p-5 border-l-4 border-l-green-600 space-y-1">
          <div className="text-xs font-bold text-gray-500">Total Paid Amount</div>
          <div className="text-xl sm:text-2xl font-black text-green-700">
            ₹{feeRecord.paidAmount.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-green-600 font-semibold">Verified Receipts</div>
        </Card>

        <Card className="p-5 border-l-4 border-l-amber-500 space-y-1">
          <div className="text-xs font-bold text-gray-500">Pending Due Balance</div>
          <div className="text-xl sm:text-2xl font-black text-amber-600">
            ₹{feeRecord.pendingAmount.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-gray-500">Due: {feeRecord.dueDate}</div>
        </Card>
      </div>

      {/* Payment History Table */}
      <Card className="overflow-hidden border border-gray-200">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-rajmudra-charcoal font-devanagari">
            भरणा पावती इतिहास (Payment History & Receipts)
          </h3>
          <span className="text-xs text-gray-500">{feeRecord.payments.length} Transactions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Receipt No</th>
                <th className="p-4">Payment Date</th>
                <th className="p-4">Amount Paid</th>
                <th className="p-4">Method / TXN ID</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Receipt Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {feeRecord.payments.map(pay => (
                <tr key={pay.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-rajmudra-orange">{pay.receiptNumber}</td>
                  <td className="p-4 text-gray-600">{new Date(pay.paymentDate).toLocaleDateString('en-IN')}</td>
                  <td className="p-4 font-black text-rajmudra-charcoal">₹{pay.amount.toLocaleString('en-IN')}</td>
                  <td className="p-4 text-gray-600">
                    <div>{pay.paymentMethod}</div>
                    <div className="text-[10px] text-gray-400 font-mono">{pay.transactionId}</div>
                  </td>
                  <td className="p-4">
                    <Badge variant="green" size="sm">PAID</Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Receipt className="w-3.5 h-3.5" />}
                      onClick={() => setSelectedReceipt(pay)}
                      className="text-xs"
                    >
                      View Receipt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pay Modal (Simulated) */}
      <Modal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
        title="Simulated Online Fee Payment"
        subtitle="Test fee payment workflow for Rajmudra Academy (Demo Sandbox)"
      >
        <form onSubmit={handleSimulatedPayment} className="space-y-4">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>This is a demo payment simulator. No real money will be deducted.</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Payment Amount (रक्कम)
            </label>
            <input
              type="number"
              min={100}
              max={feeRecord.pendingAmount || 5000}
              value={payAmount}
              onChange={e => setPayAmount(Number(e.target.value))}
              className="w-full px-4 py-2 text-sm font-bold rounded-xl border border-gray-200 focus:ring-2 focus:ring-rajmudra-orange focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'ONLINE_UPI', label: 'UPI / GPay' },
                { key: 'NET_BANKING', label: 'Net Banking' },
                { key: 'CREDIT_CARD', label: 'Debit Card' },
              ].map(m => (
                <button
                  type="button"
                  key={m.key}
                  onClick={() => setPayMethod(m.key as any)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-colors ${
                    payMethod === m.key
                      ? 'bg-rajmudra-orange text-white border-rajmudra-orange'
                      : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isProcessing}
              className="w-full shadow-glow-orange"
            >
              Complete ₹{payAmount.toLocaleString('en-IN')} Demo Payment
            </Button>
          </div>
        </form>
      </Modal>

      {/* Official Receipt Modal */}
      {selectedReceipt && (
        <Modal
          isOpen={!!selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
          title="Official Fee Receipt (शुल्क भरणा पावती)"
          subtitle={`Receipt: ${selectedReceipt.receiptNumber}`}
        >
          <div className="space-y-6 text-rajmudra-charcoal">
            {/* Printable Receipt Layout */}
            <div className="p-6 rounded-2xl border-2 border-dashed border-gray-300 space-y-4 bg-white text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <img src="/assets/rajmudra-logo.jpeg" alt="Logo" className="w-10 h-10 rounded-full" />
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
                  <div className="text-xs text-gray-500">Course: {feeRecord.courseName}</div>
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
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedReceipt(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Download className="w-4 h-4" />}
                onClick={handleDownloadReceipt}
              >
                Download Receipt PDF
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
