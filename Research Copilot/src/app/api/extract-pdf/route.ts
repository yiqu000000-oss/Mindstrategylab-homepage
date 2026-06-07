import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

async function extractTextFromPdf(buffer: Buffer) {
  const { PDFParse } = await import("pdf-parse");
  const parser = new PDFParse({ data: buffer });

  try {
    const result = await parser.getText();
    return {
      text: result.text.trim(),
      pageCount: result.total,
    };
  } finally {
    await parser.destroy();
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No PDF file provided." }, { status: 400 });
    }

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a PDF." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10 MB." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const { text, pageCount } = await extractTextFromPdf(buffer);

    if (!text) {
      return NextResponse.json(
        { error: "No text could be extracted from this PDF." },
        { status: 422 },
      );
    }

    return NextResponse.json({
      text,
      fileName: file.name,
      pageCount,
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Failed to extract text from PDF. The file may be corrupted or password-protected.",
      },
      { status: 500 },
    );
  }
}
