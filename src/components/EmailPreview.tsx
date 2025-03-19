"use client";

import { motion } from "framer-motion";

interface EmailPreviewProps {
  html: string;
  templateStrings: string[];
  selectedCustomer: string;
}

export default function EmailPreview({
  html,
  templateStrings,
  selectedCustomer,
}: EmailPreviewProps) {
  const getPreviewHtml = () => {
    let previewHtml = html;

    // Create a mapping of template variables to customer data
    const customerData: Record<string, string> = {
      first_name: selectedCustomer,
      last_name: "Smith",
      email: `${selectedCustomer.toLowerCase()}@example.com`,
      company: "ACME Corp",
      phone: "555-123-4567",
    };

    // Replace each template string with the corresponding value
    templateStrings.forEach((template) => {
      // Remove {{ and }} from the template string to get the variable name
      const variableName = template.replace(/{{|}}/g, "").trim();
      const value = customerData[variableName] || `[${variableName}]`;
      previewHtml = previewHtml.replace(new RegExp(template, "g"), value);
    });

    return previewHtml;
  };

  return (
    <div className="w-full">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 mr-1.5 sm:mr-2 text-pink-400 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        Email Preview
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative rounded-xl overflow-hidden shadow-xl bg-white"
      >
        <div className="border-t-8 border-indigo-600 bg-gray-50">
          <div className="border-b border-gray-200 py-2 px-4 bg-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="text-xs text-gray-500 ml-2">Email Preview</div>
            </div>
          </div>
          <div className="overflow-auto max-h-[400px] sm:max-h-[500px] md:max-h-[600px] p-4 sm:p-6 md:p-8">
            <div
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sm:p-8 md:p-10 text-gray-800 text-sm sm:text-base max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: getPreviewHtml() }}
            />
          </div>
        </div>
      </motion.div>
      <p className="mt-3 text-xs sm:text-sm text-indigo-200 italic">
        This is how your email will look with {selectedCustomer}'s information
      </p>
    </div>
  );
}
