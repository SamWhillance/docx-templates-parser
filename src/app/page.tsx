"use client";

import CustomerSelector from "@/components/CustomerSelector";
import EmailPreview from "@/components/EmailPreview";
import FileUploader from "@/components/FileUploader";
import HtmlEditor from "@/components/HtmlEditor";
import TemplateStringList from "@/components/TemplateStringList";
import { useState } from "react";

const DEFAULT_HTML = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background-color: #f1f1f1; padding: 10px; text-align: center; }
    .footer { background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; }
    .content { padding: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Welcome {{first_name}}!</h2>
    </div>
    <div class="content">
      <p>Hello {{first_name}},</p>
      <p>Thank you for signing up. Please confirm your email address: {{email}}</p>
      <p>Best regards,<br>The Team</p>
    </div>
    <div class="footer">
      <p>© 2024 Company. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;

const CUSTOMERS = ["Billy", "Sam", "Sarah", "Emily"];

export default function Home() {
  const [templateStrings, setTemplateStrings] = useState<string[]>([]);
  const [emailHtml, setEmailHtml] = useState(DEFAULT_HTML);
  const [selectedCustomer, setSelectedCustomer] = useState(CUSTOMERS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesUploaded = async (files: File[]) => {
    console.log("handleFilesUploaded called with", files.length, "files");
    if (files.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach((file) => {
        console.log(
          `Adding file to FormData: ${file.name}, size: ${file.size}`
        );
        formData.append("files", file);
      });

      console.log("Sending POST request to /api/parse-docx");
      const response = await fetch("/api/parse-docx", {
        method: "POST",
        body: formData,
      });

      console.log("Response received:", response.status, response.statusText);
      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (
        data.templateStrings &&
        Array.isArray(data.templateStrings) &&
        data.templateStrings.length > 0
      ) {
        console.log("Setting template strings:", data.templateStrings);
        setTemplateStrings(data.templateStrings);
      } else {
        console.log("No template strings found in response");
        setError(
          "No template strings were found in the uploaded files. Please ensure the files contain template strings in the format {{variable_name}}."
        );
      }
    } catch (err) {
      console.error("Error processing files:", err);
      setError(
        "An error occurred while parsing the files. Please try again or use different files."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            DOCX Template Extractor
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-8">
          {/* Step 1: File Upload */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-semibold mb-4">
                Step 1: Upload DOCX Files
              </h2>
              <FileUploader onFilesUploaded={handleFilesUploaded} />

              {isLoading && (
                <div className="mt-4 text-center">
                  <p className="text-gray-500">Processing files...</p>
                </div>
              )}

              {error && (
                <div className="mt-4 text-center">
                  <p className="text-red-500">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Step 2: Template Strings */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-semibold mb-4">
                Step 2: Extracted Template Strings
              </h2>
              <TemplateStringList templateStrings={templateStrings} />
            </div>
          </div>

          {/* Step 3: Email HTML Editor */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-semibold mb-4">
                Step 3: Edit Email HTML
              </h2>
              <HtmlEditor defaultHtml={DEFAULT_HTML} onChange={setEmailHtml} />
            </div>
          </div>

          {/* Step 4: Preview */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-semibold mb-4">
                Step 4: Preview Email
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="md:col-span-1">
                  <CustomerSelector
                    customers={CUSTOMERS}
                    selectedCustomer={selectedCustomer}
                    onSelectCustomer={setSelectedCustomer}
                  />
                </div>
                <div className="md:col-span-3">
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
            </div>
          </div>

          {/* Step 5: Send Email (dummy) */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6 text-center">
              <button
                type="button"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() =>
                  alert("This is a demo - no emails will be sent!")
                }
              >
                Send Email
              </button>
              <p className="mt-2 text-sm text-gray-500">
                Note: This is a demo application. No emails will actually be
                sent.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function extractTemplateStrings(html: string): string[] {
  const matches = html.match(/{{([^{}]+)}}/g) || [];
  return [...new Set(matches)];
}
