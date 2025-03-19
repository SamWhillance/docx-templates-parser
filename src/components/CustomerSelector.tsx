"use client";

interface CustomerSelectorProps {
  customers: string[];
  selectedCustomer: string;
  onSelectCustomer: (customer: string) => void;
}

export default function CustomerSelector({
  customers,
  selectedCustomer,
  onSelectCustomer,
}: CustomerSelectorProps) {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Preview for Customer</h2>
      <div className="relative">
        <select
          className="block w-full p-2.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={selectedCustomer}
          onChange={(e) => onSelectCustomer(e.target.value)}
        >
          {customers.map((customer) => (
            <option key={customer} value={customer}>
              {customer}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
