"use client";

import { useEffect, useState } from "react";

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
      <h2 className="text-lg font-semibold mb-4">Email HTML Editor</h2>
      <textarea
        className="w-full h-64 p-4 border border-gray-300 rounded-md font-mono text-sm"
        value={html}
        onChange={(e) => setHtml(e.target.value)}
        placeholder="Enter your HTML email template here..."
      />
    </div>
  );
}
