"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/assignment-decoder", label: "Assignment Decoder" },
  { href: "/writing-studio", label: "Writing Studio" },
];

export function Header() {
  const currentPath = usePathname();

  return (
    <header className="border-b border-border bg-paper/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-sm font-bold text-white">
            RC
          </div>
          <div>
            <span className="font-serif text-lg font-semibold text-ink group-hover:text-accent transition-colors">
              Research Copilot
            </span>
            <p className="hidden text-xs text-ink-light sm:block">Internal Research Workflow</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent-light text-accent"
                    : "text-ink-muted hover:bg-paper-dark hover:text-ink"
                }`}
              >
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">
                  {item.href === "/"
                    ? "Home"
                    : item.href === "/assignment-decoder"
                      ? "Decoder"
                      : "Studio"}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
