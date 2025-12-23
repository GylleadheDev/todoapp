import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type AuthShellProps = {
  title: string;
  subtitle: string;
  benefits: string[];
  footer?: ReactNode;
  children: ReactNode;
};

export const AuthShell = ({
  title,
  subtitle,
  benefits,
  footer,
  children,
}: AuthShellProps) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -left-24 top-16 h-52 w-52 rounded-full bg-[var(--accent-2)]/40 blur-3xl" />
      <div className="absolute -right-20 top-40 h-56 w-56 rounded-full bg-[var(--mist)] blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-40 w-[30rem] -translate-x-1/2 rounded-full bg-[var(--sage)]/15 blur-3xl" />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sage)]">
            acesso seguro
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-[var(--ink)]/70 sm:text-base">
            {subtitle}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--sage)]"
              >
                {benefit}
              </div>
            ))}
          </div>
        </div>

        <Card className="space-y-6">
          {children}
          {footer}
        </Card>
      </div>
    </section>
  );
};
