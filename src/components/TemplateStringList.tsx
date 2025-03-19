"use client";

import { motion } from "framer-motion";

interface TemplateStringListProps {
  templateStrings: string[];
}

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function TemplateStringList({
  templateStrings,
}: TemplateStringListProps) {
  if (templateStrings.length === 0) {
    return (
      <div className="w-full py-8 sm:py-12 text-center rounded-lg sm:rounded-xl bg-indigo-700/30 backdrop-blur-sm shadow-inner">
        <svg
          className="mx-auto h-10 w-10 sm:h-14 sm:w-14 text-indigo-200 mb-3 sm:mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <p className="text-white font-medium text-base sm:text-lg mb-1">
          No template strings found
        </p>
        <p className="text-indigo-200 text-sm sm:text-base px-4">
          Please upload a DOCX file with template variables
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <motion.div
        className="bg-indigo-700/30 backdrop-blur-sm overflow-hidden rounded-lg sm:rounded-xl shadow-inner"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        <ul className="divide-y divide-indigo-600/30 max-h-[400px] overflow-y-auto">
          {templateStrings.map((str, index) => (
            <motion.li
              key={index}
              className="px-4 sm:px-6 py-3 sm:py-4 hover:bg-indigo-600/30 transition-colors duration-150"
              variants={itemVariants}
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center flex-wrap sm:flex-nowrap">
                <div className="flex-shrink-0 mr-3 sm:mr-0">
                  <div className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-0 sm:ml-4 flex-1 mt-2 sm:mt-0 w-full sm:w-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                    <p className="text-base sm:text-lg font-bold text-white break-all">
                      {str}
                    </p>
                    <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-pink-500/20 text-pink-200 border border-pink-500/20 inline-flex items-center justify-center w-fit">
                      Template Variable
                    </span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-indigo-100">
                    Ready to use in your email template
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
