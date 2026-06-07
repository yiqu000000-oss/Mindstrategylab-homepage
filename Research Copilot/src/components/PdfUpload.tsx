"use client";

import { useRef, useState } from "react";

type UploadStatus =
  | { state: "idle" }
  | { state: "uploading"; fileName: string }
  | { state: "success"; fileName: string; pageCount?: number }
  | { state: "error"; message: string };

interface PdfUploadProps {
  onTextExtracted: (text: string) => void;
  disabled?: boolean;
}

export function PdfUpload({ onTextExtracted, disabled = false }: PdfUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<UploadStatus>({ state: "idle" });
  const [isDragging, setIsDragging] = useState(false);

  const processFile = async (file: File) => {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setStatus({ state: "error", message: "Please select a PDF file." });
      return;
    }

    setStatus({ state: "uploading", fileName: file.name });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/extract-pdf", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as {
        text?: string;
        fileName?: string;
        pageCount?: number;
        error?: string;
      };

      if (!response.ok) {
        setStatus({
          state: "error",
          message: data.error ?? "Failed to extract text from PDF.",
        });
        return;
      }

      if (data.text) {
        onTextExtracted(data.text);
        setStatus({
          state: "success",
          fileName: data.fileName ?? file.name,
          pageCount: data.pageCount,
        });
      }
    } catch {
      setStatus({
        state: "error",
        message: "Upload failed. Please check your connection and try again.",
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      void processFile(file);
    }
    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const file = event.dataTransfer.files?.[0];
    if (file) {
      void processFile(file);
    }
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`rounded-md border-2 border-dashed px-4 py-5 text-center transition-colors ${
          isDragging
            ? "border-accent bg-accent-light/50"
            : "border-border bg-paper/50 hover:border-border-dark"
        } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload PDF file"
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
        />

        <svg
          className="mx-auto mb-2 h-8 w-8 text-border-dark"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>

        <p className="text-sm font-medium text-ink">
          {status.state === "uploading" ? "Extracting text…" : "Upload assignment PDF"}
        </p>
        <p className="mt-1 text-xs text-ink-light">
          Drag and drop or click to browse · PDF only · Max 10 MB
        </p>
      </div>

      {status.state === "uploading" && (
        <div className="flex items-center gap-2.5 rounded-md border border-border bg-accent-light/40 px-3 py-2.5">
          <svg
            className="h-4 w-4 shrink-0 animate-spin text-accent"
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
          <p className="text-sm text-ink-muted">
            Extracting text from <span className="font-medium text-ink">{status.fileName}</span>…
          </p>
        </div>
      )}

      {status.state === "success" && (
        <div className="flex items-center gap-2.5 rounded-md border border-border bg-paper px-3 py-2.5">
          <svg
            className="h-4 w-4 shrink-0 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-sm text-ink-muted">
            Extracted text from{" "}
            <span className="font-medium text-ink">{status.fileName}</span>
            {status.pageCount != null && (
              <span className="text-ink-light"> · {status.pageCount} pages</span>
            )}
            {" "}and placed it in the instructions field.
          </p>
        </div>
      )}

      {status.state === "error" && (
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
          <p className="text-sm text-ink-muted">{status.message}</p>
        </div>
      )}
    </div>
  );
}
