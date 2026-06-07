import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  badge?: string;
}

export function PageHeader({ title, description, badge }: PageHeaderProps) {
  return (
    <div className="mb-8 border-b border-border pb-8">
      {badge && (
        <span className="mb-3 inline-block rounded-full bg-accent-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
          {badge}
        </span>
      )}
      <h1 className="font-serif text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-base text-ink-muted leading-relaxed">{description}</p>
    </div>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-border bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
}

export function CardHeader({ title, subtitle }: CardHeaderProps) {
  return (
    <div className="border-b border-border px-5 py-4">
      <h2 className="font-serif text-lg font-semibold text-ink">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-ink-light">{subtitle}</p>}
    </div>
  );
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className = "" }: CardBodyProps) {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>;
}

interface TextAreaProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}

export function TextArea({
  id,
  label,
  placeholder,
  value,
  onChange,
  rows = 12,
}: TextAreaProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full resize-y rounded-md border border-border bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-light focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-shadow"
      />
    </div>
  );
}

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  loading?: boolean;
}

export function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  loading = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover focus:ring-accent",
    secondary:
      "border border-border bg-white text-ink-muted hover:bg-paper-dark focus:ring-border-dark",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]}`}
    >
      {loading && (
        <svg
          className="h-4 w-4 animate-spin"
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
      )}
      {children}
    </button>
  );
}

interface OutputPlaceholderProps {
  message: string;
}

export function OutputPlaceholder({ message }: OutputPlaceholderProps) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-md border-2 border-dashed border-border bg-paper/50 px-6 py-12 text-center">
      <svg
        className="mb-4 h-10 w-10 text-border-dark"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
      <p className="text-sm text-ink-light">{message}</p>
    </div>
  );
}

interface BadgeListProps {
  items: string[];
  variant?: "default" | "warning" | "success";
}

export function BadgeList({ items, variant = "default" }: BadgeListProps) {
  const dotColors = {
    default: "bg-accent",
    warning: "bg-warning",
    success: "bg-success",
  };

  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-ink-muted">
          <span
            className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dotColors[variant]}`}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
