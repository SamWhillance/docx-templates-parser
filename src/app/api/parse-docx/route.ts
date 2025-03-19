import * as fs from "fs";
import * as os from "os";
import * as path from "path";

import { NextRequest, NextResponse } from "next/server";

import JSZip from "jszip";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const templateStrings = new Set<string>();
    const debugInfo: any[] = [];

    // Process each file to extract template strings
    for (const file of files) {
      try {
        console.log(`Processing file: ${file.name}, size: ${file.size} bytes`);

        // Convert file to Buffer
        const buffer = await file.arrayBuffer();

        // Use JSZip to properly extract the content of the DOCX file
        const zip = new JSZip();
        const docx = await zip.loadAsync(buffer);

        // Extract document.xml content which contains the main text
        const documentXml = await extractDocumentXml(docx);
        debugInfo.push({
          fileName: file.name,
          documentXmlSample:
            documentXml?.substring(0, 500) + "..." || "Not found",
        });

        console.log("documentXml", documentXml);

        // If document.xml was found, extract content from it
        if (documentXml) {
          console.log(`Found document.xml in ${file.name}`);

          // Extract text content from the XML
          const textContent = extractTextFromXml(documentXml);
          console.log(
            `Extracted text content from ${file.name}: ${textContent.substring(
              0,
              100
            )}...`
          );

          // Find template strings in the extracted text
          const matches = findAllTemplateStrings(textContent);

          if (matches.length > 0) {
            console.log(
              `Found ${matches.length} template strings in ${file.name}`
            );
            matches.forEach((match) => templateStrings.add(match));
          } else {
            console.log(
              `No template strings found in extracted text from ${file.name}`
            );

            // Try to find template strings directly in the XML
            const xmlMatches = findAllTemplateStrings(documentXml);
            if (xmlMatches.length > 0) {
              console.log(
                `Found ${xmlMatches.length} template strings in raw XML from ${file.name}`
              );
              xmlMatches.forEach((match) => templateStrings.add(match));
            } else {
              console.log(
                `No template strings found in raw XML from ${file.name} either`
              );

              // Last resort: check all files in the zip
              let foundAny = false;
              for (const filename of Object.keys(docx.files)) {
                // Skip non-text files
                if (filename.endsWith(".xml") || filename.endsWith(".rels")) {
                  try {
                    const content = await docx.files[filename].async("text");
                    const contentMatches = findAllTemplateStrings(content);
                    if (contentMatches.length > 0) {
                      console.log(
                        `Found ${contentMatches.length} template strings in ${filename}`
                      );
                      contentMatches.forEach((match) =>
                        templateStrings.add(match)
                      );
                      foundAny = true;
                    }
                  } catch (err) {
                    console.log(`Error reading ${filename}: ${err}`);
                  }
                }
              }

              if (!foundAny) {
                console.log(
                  `No template strings found in any file within ${file.name}`
                );
              }
            }
          }
        } else {
          console.log(`Could not find document.xml in ${file.name}`);

          // Try searching all files in the DOCX
          let foundAny = false;
          for (const filename of Object.keys(docx.files)) {
            // Skip non-text files
            if (filename.endsWith(".xml") || filename.endsWith(".rels")) {
              try {
                const content = await docx.files[filename].async("text");
                const matches = findAllTemplateStrings(content);
                if (matches.length > 0) {
                  console.log(
                    `Found ${matches.length} template strings in ${filename}`
                  );
                  matches.forEach((match) => templateStrings.add(match));
                  foundAny = true;
                }
              } catch (err) {
                console.log(`Error reading ${filename}: ${err}`);
              }
            }
          }

          if (!foundAny) {
            console.log(
              `No template strings found in any file within ${file.name}`
            );
          }
        }

        if (templateStrings.size === 0) {
          console.log(`No template strings found in ${file.name}`);
        } else {
          console.log(
            `Found ${templateStrings.size} template strings in ${file.name}`
          );
        }
      } catch (fileError: any) {
        console.error(`Error processing file ${file.name}:`, fileError);
        debugInfo.push({
          fileName: file.name,
          error: fileError.toString(),
          stack: fileError.stack,
        });
        // Continue with other files even if one fails
      }
    }

    const templateArray = Array.from(templateStrings);
    console.log(
      "Total template strings found:",
      templateArray.length,
      templateArray
    );

    return NextResponse.json({
      templateStrings: templateArray,
      debug: debugInfo,
    });
  } catch (error: any) {
    console.error("Error parsing DOCX:", error);
    return NextResponse.json(
      { error: "Failed to parse DOCX files", details: error.toString() },
      { status: 500 }
    );
  }
}

/**
 * Extract the document.xml content from the DOCX zip file
 */
async function extractDocumentXml(zip: JSZip): Promise<string | null> {
  // The main content is typically in word/document.xml
  const documentXmlFile = zip.file("word/document.xml");
  if (documentXmlFile) {
    return await documentXmlFile.async("text");
  }
  return null;
}

/**
 * Extract plain text from Word XML
 */
function extractTextFromXml(xml: string): string {
  // Extract text content from <w:t> tags which contain the actual text
  const textRegex = /<w:t[^>]*>(.*?)<\/w:t>/g;
  let match;
  let extractedText = "";

  while ((match = textRegex.exec(xml)) !== null) {
    extractedText += match[1] + " ";
  }

  return extractedText.trim();
}

/**
 * Find all template strings in content
 */
function findAllTemplateStrings(content: string): string[] {
  if (!content) return [];

  const results = new Set<string>();

  // Try to remove XML entities that might interfere with the matching
  const cleanedContent = content
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

  // Pattern for {{...}} template strings
  const regex = /{{([^{}]+)}}/g;
  let match;

  while ((match = regex.exec(cleanedContent)) !== null) {
    // match[0] contains the full match (e.g., {{first_name}})
    results.add(match[0]);
  }

  // Manual search as a fallback
  if (results.size === 0) {
    let position = 0;
    while (true) {
      const openBracePos = cleanedContent.indexOf("{{", position);
      if (openBracePos === -1) break;

      const closeBracePos = cleanedContent.indexOf("}}", openBracePos);
      if (closeBracePos === -1) break;

      const template = cleanedContent.substring(
        openBracePos,
        closeBracePos + 2
      );
      if (template.length > 3 && template.length < 100) {
        // Basic validation
        results.add(template);
      }

      position = closeBracePos + 2;
    }
  }

  return Array.from(results);
}
