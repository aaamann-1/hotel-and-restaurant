import React from 'react';
import { RefreshCw } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useHotel } from '../context/HotelContext';

export const Inventory = () => {
  const { inventory: items, updateInventoryStock, refreshInventory, showToast } = useHotel();

  const updateStock = async (item) => {
    const value = window.prompt(`Enter the new stock quantity for ${item.name}`, String(item.inStock));
    if (value === null) return;
    const quantity = Number(value);
    if (!Number.isInteger(quantity) || quantity < 0) {
      window.alert('Enter a whole number that is zero or greater.');
      return;
    }
    await updateInventoryStock(item.id, quantity);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECE8E1]">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#7B7D85] mb-1 font-sans">
            <span>Operations</span>
            <span>/</span>
            <span className="text-[#C9A36A] font-semibold">Inventory Management</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#18233F]">
            Hotel Supplies & Central Stock Ledger
          </h2>
          <p className="text-xs sm:text-sm text-[#7B7D85] mt-1 font-sans">
            Stock monitoring for housekeeping linens, guest toiletries, wine cellar, and kitchen produce
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => refreshInventory().then(() => showToast('Stock levels refreshed from the database.', 'success')).catch(error => showToast(error.message, 'error'))}
          icon={RefreshCw}
        >
          Refresh Stock
        </Button>
      </div>

      {/* Inventory Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] text-[#7B7D85] uppercase tracking-wider text-[11px] font-semibold border-b border-[#ECE8E1]">
                <th className="py-3.5 px-6">SKU Code</th>
                <th className="py-3.5 px-6">Item Description</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Current Stock</th>
                <th className="py-3.5 px-6">Threshold</th>
                <th className="py-3.5 px-6">Supplier</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECE8E1]/80">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-[#18233F]">{item.id}</td>
                  <td className="py-4 px-6 font-semibold text-[#18233F]">{item.name}</td>
                  <td className="py-4 px-6 text-[#7B7D85]">{item.category}</td>
                  <td className="py-4 px-6 font-bold text-[#18233F]">
                    {item.inStock} {item.unit}
                  </td>
                  <td className="py-4 px-6 text-[#7B7D85]">
                    {item.minThreshold} {item.unit}
                  </td>
                  <td className="py-4 px-6 text-[#7B7D85]">{item.supplier}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        item.status === 'Optimal'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => updateStock(item)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#FAF5EC] text-[#A37E45] border border-[#E5D0AB] hover:bg-[#C9A36A] hover:text-white transition-all shadow-sm"
                    >
                      Update Stock
                    </button>
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

export default Inventory;
