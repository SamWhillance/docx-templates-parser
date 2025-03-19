import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DOCX Template Extractor",
  description: "Extract template strings from DOCX files and preview emails",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen">
      <body
        className={`${inter.className} min-h-screen overflow-x-hidden m-0 p-0 w-full antialiased bg-gradient-to-b from-violet-900 via-indigo-900 to-purple-900`}
      >
        <div className="min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}
