export function Footer() {
  return (
    <footer className="border-t border-border bg-paper-dark/50 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-serif text-sm text-ink-muted">
            Research Copilot — Private Internal Tool
          </p>
          <p className="text-xs text-ink-light">
            Assignment Decoder powered by OpenAI
          </p>
        </div>
      </div>
    </footer>
  );
}
