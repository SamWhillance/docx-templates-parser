"use client";

import CustomerSelector from "@/components/CustomerSelector";
import EmailPreview from "@/components/EmailPreview";
import FileUploader from "@/components/FileUploader";
import HtmlEditor from "@/components/HtmlEditor";
import TemplateStringList from "@/components/TemplateStringList";
import { motion } from "framer-motion";
import { useState } from "react";

const DEFAULT_HTML = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      font-family: Arial, sans-serif; 
      margin: 0; 
      padding: 0; 
      background-color: #f7f7f7;
      color: #333333;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background-color: #ffffff;
      box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    }
    .header { 
      background: linear-gradient(to right, #6366f1, #8b5cf6); 
      padding: 20px; 
      text-align: center;
      color: white;
    }
    .content { 
      padding: 30px 20px; 
      line-height: 1.5;
    }
    .footer { 
      background-color: #f1f1f1; 
      padding: 15px; 
      text-align: center; 
      font-size: 12px;
      color: #666666;
    }
    .button {
      display: inline-block;
      background: linear-gradient(to right, #ec4899, #8b5cf6);
      color: white;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      margin: 20px 0;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Welcome {{first_name}}!</h2>
    </div>
    <div class="content">
      <p>Hello {{first_name}},</p>
      <p>Thank you for signing up. We're excited to have you join us!</p>
      <p>Please confirm your email address: <strong>{{email}}</strong></p>
      <p><a href="#" class="button">Confirm Email</a></p>
      <p>If you didn't sign up for this service, please ignore this email.</p>
      <p>Best regards,<br>The Team</p>
    </div>
    <div class="footer">
      <p>© 2024 Company. All rights reserved.</p>
      <p>Contact: support@example.com | <a href="#">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>`;

const CUSTOMERS = ["Billy", "Sam", "Sarah", "Emily"];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function Home() {
  const [templateStrings, setTemplateStrings] = useState<string[]>([]);
  const [emailHtml, setEmailHtml] = useState(DEFAULT_HTML);
  const [selectedCustomer, setSelectedCustomer] = useState(CUSTOMERS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(1);

  const handleFilesUploaded = async (files: File[]) => {
    if (files.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/parse-docx", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (
        data.templateStrings &&
        Array.isArray(data.templateStrings) &&
        data.templateStrings.length > 0
      ) {
        setTemplateStrings(data.templateStrings);
        setActiveStep(2);
      } else {
        setError(
          "No template strings were found in the uploaded files. Please ensure the files contain template strings in the format {{variable_name}}."
        );
      }
    } catch (err) {
      setError(
        "An error occurred while parsing the files. Please try again or use different files."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <header className="bg-gradient-to-r from-violet-800 to-indigo-900 relative overflow-hidden py-6 sm:py-10">
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 20 L40 20 M20 0 L20 40"
                  stroke="white"
                  strokeWidth="0.5"
                  fill="none"
                />
              </pattern>
              <linearGradient
                id="headerGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#headerGradient)" />
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500">
                DOCX Template Extractor
              </span>
            </motion.h1>
            <motion.p
              className="mt-2 sm:mt-3 text-base sm:text-lg md:text-xl text-indigo-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Extract, edit and preview email templates from DOCX files
            </motion.p>
          </motion.div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col space-y-6 sm:space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Step navigation */}
          <div className="bg-indigo-800/40 backdrop-blur-sm rounded-lg shadow-lg px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Progress
              </h2>
            </div>
            <div className="w-full bg-indigo-950/50 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 h-2.5 rounded-full transition-all duration-700 ease-in-out"
                style={{ width: `${activeStep * 20}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-white">
              <span
                className={activeStep >= 1 ? "text-pink-300 font-bold" : ""}
              >
                Upload
              </span>
              <span
                className={activeStep >= 2 ? "text-pink-300 font-bold" : ""}
              >
                Extract
              </span>
              <span
                className={activeStep >= 3 ? "text-pink-300 font-bold" : ""}
              >
                Edit
              </span>
              <span
                className={activeStep >= 4 ? "text-pink-300 font-bold" : ""}
              >
                Preview
              </span>
              <span
                className={activeStep >= 5 ? "text-pink-300 font-bold" : ""}
              >
                Send
              </span>
            </div>
          </div>

          {/* Step 1: File Upload */}
          <motion.div
            className="bg-indigo-800/50 backdrop-blur-sm overflow-hidden rounded-xl sm:rounded-2xl shadow-lg"
            variants={itemVariants}
          >
            <div className="px-4 py-5 sm:px-6 sm:py-6 md:p-8">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-600 text-white font-bold text-lg mr-3 sm:mr-4 flex-shrink-0">
                  1
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Upload DOCX Files
                </h2>
              </div>
              <FileUploader onFilesUploaded={handleFilesUploaded} />

              {isLoading && (
                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="inline-flex items-center px-4 py-2 bg-indigo-700/50 rounded-lg">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="text-white">Processing files...</span>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="inline-flex items-center px-4 py-2 bg-red-500/30 text-white rounded-lg text-sm">
                    <svg
                      className="w-5 h-5 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-wrap">{error}</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Step 2: Template Strings */}
          <motion.div
            className={`bg-indigo-800/50 backdrop-blur-sm overflow-hidden rounded-xl sm:rounded-2xl shadow-lg ${
              activeStep >= 2 ? "ring-2 ring-pink-500/50" : ""
            }`}
            variants={itemVariants}
            onClick={() => templateStrings.length > 0 && setActiveStep(2)}
          >
            <div className="px-4 py-5 sm:px-6 sm:py-6 md:p-8">
              <div className="flex items-center mb-4">
                <div
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                    activeStep >= 2 ? "bg-pink-600" : "bg-indigo-600"
                  } text-white font-bold text-lg mr-3 sm:mr-4 flex-shrink-0`}
                >
                  2
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Extracted Template Strings
                </h2>
              </div>
              <TemplateStringList templateStrings={templateStrings} />
              {templateStrings.length > 0 && (
                <motion.div
                  className="mt-6 flex justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 border-0"
                    onClick={() => setActiveStep(3)}
                  >
                    Continue to HTML Editor
                    <svg
                      className="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Step 3: Email HTML Editor */}
          <motion.div
            className={`bg-indigo-800/50 backdrop-blur-sm overflow-hidden rounded-xl sm:rounded-2xl shadow-lg ${
              activeStep >= 3 ? "ring-2 ring-pink-500/50" : ""
            }`}
            variants={itemVariants}
            onClick={() => templateStrings.length > 0 && setActiveStep(3)}
          >
            <div className="px-4 py-5 sm:px-6 sm:py-6 md:p-8">
              <div className="flex items-center mb-4">
                <div
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                    activeStep >= 3 ? "bg-pink-600" : "bg-indigo-600"
                  } text-white font-bold text-lg mr-3 sm:mr-4 flex-shrink-0`}
                >
                  3
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Edit Email HTML
                </h2>
              </div>
              <HtmlEditor
                defaultHtml={DEFAULT_HTML}
                onChange={(html) => {
                  setEmailHtml(html);
                  if (activeStep === 3) setActiveStep(4);
                }}
              />
              {activeStep === 3 && (
                <motion.div
                  className="mt-6 flex justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 border-0"
                    onClick={() => setActiveStep(4)}
                  >
                    Continue to Preview
                    <svg
                      className="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Step 4: Preview */}
          <motion.div
            className={`bg-indigo-800/50 backdrop-blur-sm overflow-hidden rounded-xl sm:rounded-2xl shadow-lg ${
              activeStep >= 4 ? "ring-2 ring-pink-500/50" : ""
            }`}
            variants={itemVariants}
            onClick={() => templateStrings.length > 0 && setActiveStep(4)}
          >
            <div className="px-4 py-5 sm:px-6 sm:py-6 md:p-8">
              <div className="flex items-center mb-4">
                <div
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                    activeStep >= 4 ? "bg-pink-600" : "bg-indigo-600"
                  } text-white font-bold text-lg mr-3 sm:mr-4 flex-shrink-0`}
                >
                  4
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Preview Email
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <div className="bg-indigo-700/40 p-6 rounded-xl backdrop-blur-sm">
                    <CustomerSelector
                      customers={CUSTOMERS}
                      selectedCustomer={selectedCustomer}
                      onSelectCustomer={setSelectedCustomer}
                    />
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <EmailPreview
                    html={emailHtml}
                    templateStrings={
                      templateStrings.length > 0
                        ? templateStrings
                        : extractTemplateStrings(DEFAULT_HTML)
                    }
                    selectedCustomer={selectedCustomer}
                  />
                </div>
              </div>
              {activeStep === 4 && (
                <motion.div
                  className="mt-6 flex justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 border-0"
                    onClick={() => setActiveStep(5)}
                  >
                    Continue to Send
                    <svg
                      className="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Step 5: Send Email (dummy) */}
          <motion.div
            className={`bg-indigo-800/50 backdrop-blur-sm overflow-hidden rounded-xl sm:rounded-2xl shadow-lg ${
              activeStep >= 5 ? "ring-2 ring-pink-500/50" : ""
            }`}
            variants={itemVariants}
            onClick={() => templateStrings.length > 0 && setActiveStep(5)}
          >
            <div className="px-4 py-5 sm:px-6 sm:py-6 md:p-8">
              <div className="flex items-center mb-6 sm:mb-8">
                <div
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                    activeStep >= 5 ? "bg-pink-600" : "bg-indigo-600"
                  } text-white font-bold text-lg mr-3 sm:mr-4 flex-shrink-0`}
                >
                  5
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Send Email
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 max-w-4xl mx-auto">
                <div className="w-full sm:w-auto">
                  <motion.button
                    type="button"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-medium rounded-2xl shadow-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 transform transition-all duration-300 border-0"
                    onClick={() =>
                      alert("This is a demo - no emails will be sent!")
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-6 h-6 sm:w-7 sm:h-7 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Send Email Now
                  </motion.button>
                </div>

                <div className="flex-1 max-w-xl">
                  <div className="bg-indigo-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6">
                    <div className="flex items-start space-x-3">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-300 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-white mb-1">
                          Demo Mode Active
                        </h3>
                        <p className="text-xs sm:text-sm text-indigo-200">
                          This is a demo application. No emails will actually be
                          sent. The preview above shows how your email would
                          look if sent.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <footer className="mt-8 sm:mt-12 bg-indigo-900/70 backdrop-blur-sm py-4 sm:py-6">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center text-white text-sm">
          <p>© 2024 DOCX Template Extractor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function extractTemplateStrings(html: string): string[] {
  const matches = html.match(/{{([^{}]+)}}/g) || [];
  return [...new Set(matches)];
}
