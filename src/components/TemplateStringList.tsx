"use client";

interface TemplateStringListProps {
  templateStrings: string[];
}

export default function TemplateStringList({
  templateStrings,
}: TemplateStringListProps) {
  if (templateStrings.length === 0) {
    return (
      <div className="w-full py-8 text-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">
          No template strings found. Please upload a DOCX file.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Extracted Template Strings</h2>
      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul className="divide-y divide-gray-200">
          {templateStrings.map((str, index) => (
            <li key={index} className="px-6 py-4">
              <div className="flex items-center">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {str}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
