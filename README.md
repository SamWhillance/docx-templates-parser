# DOCX Template Extractor

A Next.js application that allows users to upload DOCX files, extract template strings (like `{{first_name}}`, `{{email}}`), and preview emails with these template strings replaced by actual values.

## Features

- Upload multiple DOCX files
- Extract template strings from DOCX files (format: `{{variable_name}}`)
- Edit HTML email templates with the extracted template strings
- Preview emails with template strings replaced by actual values
- Select different customers to view personalized previews

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/docx-templates-parser.git
cd docx-templates-parser
```

2. Install the dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## How to Use

1. **Upload DOCX Files**: Click on the upload area or drag and drop DOCX files to upload them.
2. **View Template Strings**: After uploading, the application will extract and display all template strings found in the files.
3. **Edit Email HTML**: Use the editor to modify the HTML of the email template.
4. **Preview Email**: Select a customer from the dropdown to see how the email would look with the template strings replaced.
5. **Send Email**: Click the 'Send Email' button (Note: This is a demo, no emails will actually be sent).

## Notes

- The application only processes `.docx` files
- Template strings should be in the format `{{variable_name}}`
- This is a proof-of-concept demo, not intended for production use

## Technologies Used

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
