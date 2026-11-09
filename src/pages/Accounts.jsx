import React from 'react';
import { Download, ArrowDownRight, ArrowUpRight, Plus } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useHotel } from '../context/HotelContext';

export const Accounts = () => {
  const { accounts: accountsSummary, createTransaction } = useHotel();

  const recordTransaction = async () => {
    const type = window.prompt('Transaction type: enter Income or Expense', 'Income');
    if (!type) return;
    const transactionType = type.trim().toLowerCase();
    if (!['income', 'expense'].includes(transactionType)) {
      window.alert('Transaction type must be Income or Expense.');
      return;
    }
    const category = window.prompt('Transaction category');
    if (!category?.trim()) return;
    const description = window.prompt('Transaction description');
    if (description === null) return;
    const amount = Number(window.prompt('Amount in INR'));
    if (!Number.isFinite(amount) || amount <= 0) {
      window.alert('Enter a positive transaction amount.');
      return;
    }
    await createTransaction({
      type: transactionType === 'income' ? 'Income' : 'Expense',
      category: category.trim(),
      description: description.trim(),
      amount,
      method: 'Cash',
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7B7D85] mb-1 font-sans">
            <span>Finance</span>
            <span>/</span>
            <span className="text-[#C9A36A] font-semibold">Accounts & Revenue</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18233F]">
            Hotel Financial Ledger & Audits
          </h2>
          <p className="text-xs sm:text-sm text-[#7B7D85] mt-1 font-sans">
            Consolidated daily revenues, room folios, vendor settlements, and cash flow
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => window.print()}
          icon={Download}
        >
          Print / Save Report
        </Button>
        <Button variant="primary" onClick={recordTransaction} icon={Plus}>Record Transaction</Button>
      </div>

      {/* Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card hoverEffect padding="p-5">
          <span className="text-xs font-semibold text-[#7B7D85] uppercase tracking-wider">
            Recorded Income
          </span>
          <p className="text-2xl font-serif font-bold text-[#18233F] mt-1">
            {accountsSummary.monthlyRevenue}
          </p>
          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2 font-semibold">
            <span>Sum of saved income transactions</span>
          </div>
        </Card>

        <Card hoverEffect padding="p-5">
          <span className="text-xs font-semibold text-[#7B7D85] uppercase tracking-wider">
            Recorded Expenses
          </span>
          <p className="text-2xl font-serif font-bold text-slate-800 mt-1">
            {accountsSummary.monthlyExpenses}
          </p>
          <div className="flex items-center gap-1 text-xs text-[#7B7D85] mt-2">
            <span>Sum of saved expense transactions</span>
          </div>
        </Card>

        <Card hoverEffect padding="p-5">
          <span className="text-xs font-semibold text-[#7B7D85] uppercase tracking-wider">
            Recorded Net Balance
          </span>
          <p className="text-2xl font-serif font-bold text-emerald-700 mt-1">
            {accountsSummary.netProfit}
          </p>
          <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2 font-semibold">
            <span>Income minus expenses</span>
          </div>
        </Card>

        <Card hoverEffect padding="p-5">
          <span className="text-xs font-semibold text-[#7B7D85] uppercase tracking-wider">
            Recorded Margin
          </span>
          <p className="text-2xl font-serif font-bold text-[#A37E45] mt-1">
            {accountsSummary.profitMargin}
          </p>
          <div className="flex items-center gap-1 text-xs text-[#A37E45] mt-2 font-semibold">
            <span>Calculated from recorded ledger entries</span>
          </div>
        </Card>
      </div>

      {/* Recent Ledger Transactions */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-[#ECE8E1] bg-white flex justify-between items-center">
          <h3 className="text-base font-serif font-bold text-[#18233F]">
            Recent Financial Transactions & Settlements
          </h3>
          <span className="text-xs text-[#7B7D85]">PostgreSQL ledger</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] text-[#7B7D85] uppercase tracking-wider text-[11px] font-semibold border-b border-[#ECE8E1]">
                <th className="py-3 px-6">Transaction ID</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Type</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Description</th>
                <th className="py-3 px-6">Method</th>
                <th className="py-3 px-6 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE8E1]/80">
              {accountsSummary.recentTransactions.map(txn => (
                <tr key={txn.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-3.5 px-6 font-mono font-bold text-[#18233F]">{txn.id}</td>
                  <td className="py-3.5 px-6 text-[#7B7D85]">{txn.date}</td>
                  <td className="py-3.5 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                        txn.type === 'Income'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {txn.type === 'Income' ? (
                        <ArrowDownRight className="w-3 h-3" />
                      ) : (
                        <ArrowUpRight className="w-3 h-3" />
                      )}
                      {txn.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-[#18233F] font-medium">{txn.category}</td>
                  <td className="py-3.5 px-6 text-[#7B7D85]">{txn.description}</td>
                  <td className="py-3.5 px-6 text-[#7B7D85]">{txn.method}</td>
                  <td
                    className={`py-3.5 px-6 text-right font-serif font-bold text-sm ${
                      txn.type === 'Income' ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {txn.type === 'Income' ? '+' : '-'}₹{txn.amount.toLocaleString('en-IN')}
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

export default Accounts;
