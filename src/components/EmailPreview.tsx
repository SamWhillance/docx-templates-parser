"use client";

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
      <h2 className="text-lg font-semibold mb-4">Email Preview</h2>
      <div className="border border-gray-300 rounded-md bg-white p-4 min-h-64">
        <div dangerouslySetInnerHTML={{ __html: getPreviewHtml() }} />
      </div>
    </div>
  );
}
