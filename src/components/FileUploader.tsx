"use client";

import { useRef, useState } from "react";

import { motion } from "framer-motion";

interface FileUploaderProps {
  onFilesUploaded: (files: File[]) => void;
}

export default function FileUploader({ onFilesUploaded }: FileUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).filter((file) =>
        file.name.endsWith(".docx")
      );

      if (files.length > 0) {
        setSelectedFiles(files);
        onFilesUploaded(files);
      }
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          type="button"
          onClick={handleClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative overflow-hidden px-6 py-3 sm:px-10 sm:py-5 rounded-full text-base sm:text-lg font-bold text-white shadow-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50 transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 to-violet-500 opacity-0"
            animate={{ opacity: isHovering ? 0.5 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <span className="relative z-10 flex items-center justify-center">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Upload Files
          </span>
        </motion.button>
        <p className="mt-2 sm:mt-3 text-sm font-medium text-white">
          .DOCX files only
        </p>
        <input
          ref={inputRef}
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleChange}
          accept=".docx"
          multiple
        />
      </motion.div>

      {selectedFiles.length > 0 && (
        <motion.div
          className="mt-4 sm:mt-6 bg-indigo-700/30 backdrop-blur-sm overflow-hidden p-3 sm:p-5 rounded-lg sm:rounded-xl shadow-lg border border-indigo-600/30"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-sm sm:text-md font-semibold text-white mb-2 sm:mb-3 flex items-center">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-pink-400 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            Selected Files
          </h3>
          <ul className="space-y-1.5 sm:space-y-2 max-h-[200px] overflow-y-auto pr-1">
            {selectedFiles.map((file, idx) => (
              <motion.li
                key={idx}
                className="flex items-center py-2 sm:py-3 px-3 sm:px-4 bg-indigo-600/30 rounded-lg text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-pink-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium text-white truncate flex-1 mr-2">
                  {file.name}
                </span>
                <span className="text-xs text-indigo-200 bg-indigo-800/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md flex-shrink-0">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
