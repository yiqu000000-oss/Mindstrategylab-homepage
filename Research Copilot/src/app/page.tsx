import Link from "next/link";

const features = [
  {
    title: "Assignment Decoder",
    description:
      "Paste your assignment instructions and receive a structured breakdown of requirements, deadlines, formatting rules, and a suggested research approach.",
    href: "/assignment-decoder",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
      />
    ),
  },
  {
    title: "Writing Studio",
    description:
      "Refine drafts with academic polishing — improve tone, clarity, and scholarly register while preserving your original argument and voice.",
    href: "/writing-studio",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    ),
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Decode the Assignment",
    description: "Understand exactly what is being asked before you begin researching.",
  },
  {
    step: "02",
    title: "Plan Your Approach",
    description: "Use the structured analysis to outline your argument and source strategy.",
  },
  {
    step: "03",
    title: "Draft & Refine",
    description: "Write your first draft, then polish it to meet academic standards.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-paper-dark/60 to-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-block rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Private · Internal Use Only
            </span>
            <h1 className="font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl text-balance">
              Your internal research workflow companion
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              Research Copilot is a private, internal tool designed to support academic
              research workflows. It helps researchers decode complex assignment briefs,
              plan structured approaches, and refine written work to meet scholarly
              standards — all within a secure, team-only environment.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/assignment-decoder"
                className="inline-flex items-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
              >
                Start with Assignment Decoder
              </Link>
              <Link
                href="/writing-studio"
                className="inline-flex items-center rounded-md border border-border bg-white px-5 py-2.5 text-sm font-semibold text-ink-muted hover:bg-paper-dark transition-colors"
              >
                Open Writing Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 rounded-lg border border-border bg-accent-light/40 px-4 py-3">
            <svg
              className="mt-0.5 h-5 w-5 shrink-0 text-accent"
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
            <p className="text-sm text-ink-muted">
              <strong className="font-semibold text-ink">Internal tool notice:</strong>{" "}
              This application is not publicly available and is intended exclusively for
              authorized team members. Assignment Decoder uses OpenAI for live analysis;
              Writing Studio still uses placeholder output until connected.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-ink">Core Tools</h2>
            <p className="mt-3 text-ink-muted">
              Two focused modules to support your research from brief to final draft.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group rounded-lg border border-border bg-white p-6 shadow-sm transition-all hover:border-accent/30 hover:shadow-md"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-accent-light text-accent">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="font-serif text-xl font-semibold text-ink group-hover:text-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {feature.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-accent">
                  Open tool
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="border-t border-border bg-paper-dark/40 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-ink">Suggested Workflow</h2>
            <p className="mt-3 text-ink-muted">
              A simple three-step process for tackling any research assignment.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {workflowSteps.map((item) => (
              <div key={item.step} className="relative">
                <span className="font-serif text-4xl font-bold text-border-dark">
                  {item.step}
                </span>
                <h3 className="mt-2 font-serif text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
