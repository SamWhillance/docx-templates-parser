"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

interface HtmlEditorProps {
  defaultHtml: string;
  onChange: (html: string) => void;
}

export default function HtmlEditor({ defaultHtml, onChange }: HtmlEditorProps) {
  const [html, setHtml] = useState(defaultHtml);

  useEffect(() => {
    onChange(html);
  }, [html, onChange]);

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
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
        Email HTML Editor
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative rounded-xl overflow-hidden shadow-lg"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/20 to-violet-700/20 backdrop-blur-[2px] z-0"></div>
        <textarea
          className="w-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px] p-4 sm:p-5 rounded-xl font-mono text-sm sm:text-base bg-white/95 text-gray-800 border-0 shadow-inner resize-y focus:ring-2 focus:ring-indigo-500 focus:outline-none relative z-10"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="Enter your HTML email template here..."
          spellCheck="false"
        />
      </motion.div>
      <p className="mt-2 text-xs sm:text-sm text-indigo-200 italic">
        Edit the HTML template including your template variables like{" "}
        {"{{first_name}}"}
      </p>
    </div>
  );
}
