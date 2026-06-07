"use client";

import { useState } from "react";
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
import { PolishedDraft, generateMockPolish } from "@/lib/mock-data";

function PolishOutput({ result }: { result: PolishedDraft }) {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="rounded-md bg-paper px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-light">
            Original
          </p>
          <p className="mt-1 text-sm font-medium text-ink">
            {result.originalWordCount} words
          </p>
        </div>
        <div className="rounded-md bg-paper px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-light">
            Polished
          </p>
          <p className="mt-1 text-sm font-medium text-ink">
            {result.polishedWordCount} words
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-serif text-base font-semibold text-ink">
          Polished Text
        </h3>
        <div className="rounded-md border border-border bg-paper px-4 py-4">
          <p className="font-serif text-sm leading-relaxed text-ink whitespace-pre-wrap">
            {result.polishedText}
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-serif text-base font-semibold text-ink">
          Improvements Applied
        </h3>
        <BadgeList items={result.improvements} variant="success" />
      </div>
    </div>
  );
}

export default function WritingStudioPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<PolishedDraft | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePolish = () => {
    setLoading(true);
    setTimeout(() => {
      setResult(generateMockPolish(input));
      setLoading(false);
    }, 800);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        badge="Writing Studio"
        title="Academic Writing Studio"
        description="Paste a draft paragraph or section below. Research Copilot will refine the language for academic tone, clarity, and scholarly register while preserving your core argument."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="Your Draft"
            subtitle="Enter the text you'd like to polish"
          />
          <CardBody className="space-y-4">
            <TextArea
              id="draft-input"
              label="Draft Text"
              placeholder="Paste your draft text here...

Example: Democracy is a system where people get to vote. Different countries have very different ways of doing this. This essay will look at how the UK and US systems work and show why they produce different results."
              value={input}
              onChange={setInput}
              rows={16}
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-ink-light">
                {input.trim()
                  ? `${input.trim().split(/\s+/).length} words`
                  : "No input yet"}
              </p>
              <Button onClick={handlePolish} loading={loading}>
                Academic Polishing
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Polished Output"
            subtitle="Refined text with improvement notes"
          />
          <CardBody>
            {result ? (
              <PolishOutput result={result} />
            ) : (
              <OutputPlaceholder message="Polished output will appear here after you click Academic Polishing." />
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
