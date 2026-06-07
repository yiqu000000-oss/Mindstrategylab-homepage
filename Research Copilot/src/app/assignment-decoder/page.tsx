"use client";

import { useState } from "react";
import { PdfUpload } from "@/components/PdfUpload";
import {
  BadgeList,
  Button,
  Card,
  CardBody,
  CardHeader,
  OutputPlaceholder,
  PageHeader,
  TextArea,
} from "@/components/ui";
import { AssignmentAnalysis } from "@/lib/assignment-analysis";

function AnalysisOutput({ analysis }: { analysis: AssignmentAnalysis }) {
  return (
    <div className="space-y-6">
      <div className="rounded-md bg-accent-light/40 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-light">
          Assignment Type
        </p>
        <p className="mt-1 font-serif text-lg font-semibold text-ink">
          {analysis.assignmentType}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-md bg-paper px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-light">
            Due Date
          </p>
          <p className="mt-1 text-sm font-medium text-ink">{analysis.dueDate}</p>
        </div>
        <div className="rounded-md bg-paper px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-light">
            Word Count
          </p>
          <p className="mt-1 text-sm font-medium text-ink">{analysis.wordCount}</p>
        </div>
        <div className="rounded-md bg-paper px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-light">
            Format
          </p>
          <p className="mt-1 text-sm font-medium text-ink">{analysis.format}</p>
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-serif text-base font-semibold text-ink">
          Detected Title
        </h3>
        <p className="rounded-md border border-border bg-paper px-4 py-3 text-sm text-ink-muted italic">
          {analysis.detectedTitle}
        </p>
      </div>

      <div>
        <h3 className="mb-3 font-serif text-base font-semibold text-ink">
          Key Requirements
        </h3>
        <BadgeList items={analysis.keyRequirements} />
      </div>

      <div>
        <h3 className="mb-3 font-serif text-base font-semibold text-ink">
          Suggested Structure
        </h3>
        <BadgeList items={analysis.suggestedStructure} variant="success" />
      </div>

      <div>
        <h3 className="mb-3 font-serif text-base font-semibold text-ink">
          Key Topics
        </h3>
        <BadgeList items={analysis.keyTopics} />
      </div>

      <div>
        <h3 className="mb-3 font-serif text-base font-semibold text-ink">
          Potential Pitfalls
        </h3>
        <BadgeList items={analysis.potentialPitfalls} variant="warning" />
      </div>

      <div>
        <h3 className="mb-3 font-serif text-base font-semibold text-ink">
          Submission Checklist
        </h3>
        <ul className="space-y-2">
          {analysis.submissionChecklist.map((item, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm text-ink-muted">
              <input
                type="checkbox"
                id={`check-${i}`}
                className="h-4 w-4 rounded border-border text-accent focus:ring-accent"
                readOnly
              />
              <label htmlFor={`check-${i}`}>{item}</label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 font-serif text-base font-semibold text-ink">
          Heuristic Questions
        </h3>
        <ul className="space-y-2">
          {analysis.heuristicQuestions.map((question, i) => (
            <li
              key={i}
              className="rounded-md border border-border bg-paper px-3 py-2.5 text-sm text-ink-muted"
            >
              {question}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function AssignmentDecoderPage() {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState<AssignmentAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    const text = input.trim();
    if (!text) {
      setError("Please paste or upload assignment instructions before analyzing.");
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await fetch("/api/analyze-assignment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = (await response.json()) as AssignmentAnalysis & { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Failed to analyze assignment. Please try again.");
        return;
      }

      setAnalysis(data);
    } catch {
      setError(
        "Unable to reach the analysis service. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        badge="Assignment Decoder"
        title="Decode Your Assignment"
        description="Paste your assignment instructions below. Research Copilot will break down requirements, identify key deliverables, and suggest a structured research approach."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Assignment Instructions"
            subtitle="Upload a PDF or paste the full assignment brief, rubric, or syllabus excerpt"
          />
          <CardBody className="space-y-4">
            <PdfUpload onTextExtracted={setInput} disabled={loading} />
            <TextArea
              id="assignment-input"
              label="Instructions"
              placeholder="Paste your assignment instructions here...

Example: Write a 2,500-word comparative analysis examining two democratic systems. Use Chicago style. Due March 15. Include at least 8 peer-reviewed sources..."
              value={input}
              onChange={setInput}
              rows={16}
            />
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-ink-light">
                {input.trim()
                  ? `${input.trim().split(/\s+/).length} words`
                  : "No input yet"}
              </p>
              <Button onClick={handleAnalyze} loading={loading} disabled={!input.trim()}>
                Analyze Assignment
              </Button>
            </div>
            {error && (
              <div className="flex items-start gap-2.5 rounded-md border border-border bg-paper px-3 py-2.5">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-warning"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
                <p className="text-sm text-ink-muted">{error}</p>
              </div>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Analysis Output"
            subtitle="AI-generated breakdown based on your assignment text"
          />
          <CardBody>
            {loading ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center rounded-md border border-border bg-paper/50 px-6 py-12 text-center">
                <svg
                  className="mb-4 h-8 w-8 animate-spin text-accent"
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
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <p className="text-sm text-ink-muted">Analyzing your assignment…</p>
              </div>
            ) : analysis ? (
              <AnalysisOutput analysis={analysis} />
            ) : (
              <OutputPlaceholder message="Analysis results will appear here after you click Analyze Assignment." />
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
