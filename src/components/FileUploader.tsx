"use client";

import { useRef, useState } from "react";

interface FileUploaderProps {
  onFilesUploaded: (files: File[]) => void;
}

export default function FileUploader({ onFilesUploaded }: FileUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("File input change event triggered");
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).filter((file) =>
        file.name.endsWith(".docx")
      );

      console.log(`${files.length} DOCX files selected`);
      if (files.length > 0) {
        setSelectedFiles(files);
        onFilesUploaded(files);
      }
    }
  };

  const handleClick = () => {
    console.log("FileUploader click handler triggered");
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={handleClick}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Upload Files
        </button>
        <p className="mt-2 text-sm text-gray-500">.DOCX files only</p>
        <input
          ref={inputRef}
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleChange}
          accept=".docx"
          multiple
        />
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Selected Files:</h3>
          <ul className="mt-2 text-sm text-gray-500">
            {selectedFiles.map((file, idx) => (
              <li key={idx} className="flex items-center py-1">
                <svg
                  className="w-4 h-4 mr-2 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
