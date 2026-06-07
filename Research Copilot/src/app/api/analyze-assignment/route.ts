import { NextRequest, NextResponse } from "next/server";
import {
  ASSIGNMENT_ANALYSIS_LIST_FIELDS,
  ASSIGNMENT_ANALYSIS_STRING_FIELDS,
  AssignmentAnalysis,
} from "@/lib/assignment-analysis";

export const runtime = "nodejs";

const MAX_INPUT_LENGTH = 50000;

const SYSTEM_PROMPT = `You are an expert academic research assistant. Analyze assignment instructions and produce a structured breakdown to help a student plan their work.

Rules:
- Base every point solely on the provided assignment text.
- Do not invent requirements, deadlines, or constraints that are not stated or clearly implied.
- For dueDate, wordCount, format, and detectedTitle: extract from the text when present; otherwise use "Not specified in assignment".
- Be concise, actionable, and written in clear academic language.
- For list fields, provide 4–8 distinct items each unless the assignment is very short.

Return valid JSON with exactly these keys:
- assignmentType: short label (e.g. "Comparative Essay", "Literature Review")
- dueDate: deadline if stated, otherwise "Not specified in assignment"
- wordCount: required length if stated, otherwise "Not specified in assignment"
- format: citation/style/formatting requirements if stated, otherwise "Not specified in assignment"
- detectedTitle: the assignment title or topic if identifiable, otherwise "Not specified in assignment"
- keyRequirements: array of explicit requirements from the brief
- suggestedStructure: array of recommended sections or outline steps
- keyTopics: array of themes, concepts, or subject areas to address
- potentialPitfalls: array of common mistakes or risks for this specific assignment
- submissionChecklist: array of concrete items to verify before submitting
- heuristicQuestions: array of reflective questions the student should answer while working`;

function parseAnalysis(content: string): AssignmentAnalysis {
  const parsed = JSON.parse(content) as Partial<AssignmentAnalysis>;

  for (const field of ASSIGNMENT_ANALYSIS_STRING_FIELDS) {
    if (typeof parsed[field] !== "string" || !parsed[field]!.trim()) {
      throw new Error(`Invalid analysis response: missing ${field}`);
    }
  }

  for (const field of ASSIGNMENT_ANALYSIS_LIST_FIELDS) {
    if (!Array.isArray(parsed[field])) {
      throw new Error(`Invalid analysis response: missing ${field}`);
    }
  }

  return {
    assignmentType: parsed.assignmentType!.trim(),
    dueDate: parsed.dueDate!.trim(),
    wordCount: parsed.wordCount!.trim(),
    format: parsed.format!.trim(),
    detectedTitle: parsed.detectedTitle!.trim(),
    keyRequirements: parsed.keyRequirements!.map(String),
    suggestedStructure: parsed.suggestedStructure!.map(String),
    keyTopics: parsed.keyTopics!.map(String),
    potentialPitfalls: parsed.potentialPitfalls!.map(String),
    submissionChecklist: parsed.submissionChecklist!.map(String),
    heuristicQuestions: parsed.heuristicQuestions!.map(String),
  };
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "OpenAI API key is not configured. Add OPENAI_API_KEY to your .env.local file and restart the dev server.",
      },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as { text?: string };
    const text = body.text?.trim();

    if (!text) {
      return NextResponse.json(
        { error: "Assignment text is required." },
        { status: 400 },
      );
    }

    if (text.length > MAX_INPUT_LENGTH) {
      return NextResponse.json(
        { error: "Assignment text exceeds the maximum length of 50,000 characters." },
        { status: 400 },
      );
    }

    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey });

    const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

    const completion = await openai.chat.completions.create({
      model,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Analyze the following assignment instructions:\n\n${text}`,
        },
      ],
      temperature: 0.3,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "No analysis was returned from the model." },
        { status: 502 },
      );
    }

    const analysis = parseAnalysis(content);
    return NextResponse.json(analysis);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to analyze assignment.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
