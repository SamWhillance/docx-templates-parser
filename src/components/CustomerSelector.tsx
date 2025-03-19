"use client";

import { motion } from "framer-motion";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 mr-1.5 sm:mr-2 text-pink-400 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
        </svg>
        Preview for Customer
      </h2>

      <div className="relative mt-1 sm:mt-2">
        <button
          type="button"
          className="relative w-full bg-gradient-to-r from-indigo-700 to-indigo-600 border border-indigo-500 rounded-lg shadow-md pl-3 sm:pl-4 pr-8 sm:pr-10 py-2 sm:py-3 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-sm sm:text-base transition-all duration-200 hover:from-indigo-600 hover:to-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex items-center">
            <motion.span
              className="flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs sm:text-sm font-bold mr-2 sm:mr-3 shadow-md"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
                repeatDelay: 1,
              }}
            >
              {selectedCustomer.charAt(0)}
            </motion.span>
            <span className="block truncate text-white font-bold">
              {selectedCustomer}
            </span>
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {isOpen && (
          <motion.div
            className="absolute z-10 mt-1 w-full bg-indigo-700 shadow-xl rounded-lg py-1 overflow-hidden border border-indigo-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="max-h-48 sm:max-h-56 overflow-auto py-1 text-sm sm:text-base">
              {customers.map((customer) => (
                <li
                  key={customer}
                  className={`
                    cursor-pointer select-none relative py-2 sm:py-3 pl-3 sm:pl-4 pr-7 sm:pr-9 flex items-center
                    ${
                      customer === selectedCustomer
                        ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white"
                        : "text-white hover:bg-indigo-600/50"
                    }
                  `}
                  onClick={() => {
                    onSelectCustomer(customer);
                    setIsOpen(false);
                  }}
                >
                  <span className="flex items-center">
                    <span className="flex items-center justify-center h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs sm:text-sm font-bold mr-2 sm:mr-3 shadow-md">
                      {customer.charAt(0)}
                    </span>
                    <span className="block truncate font-medium">
                      {customer}
                    </span>
                  </span>
                  {customer === selectedCustomer && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 text-pink-300">
                      <svg
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
