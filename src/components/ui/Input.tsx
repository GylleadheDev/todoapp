import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: string;
  containerClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, className, containerClassName, ...props }, ref) => {
    return (
      <label className={cn("block text-sm text-[var(--ink)]/70", containerClassName)}>
        {label && (
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[var(--sage)]">
            {label}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--ink)] shadow-sm outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20",
            error && "border-red-300 focus:border-red-400 focus:ring-red-200",
            className
          )}
          {...props}
        />
        {(helperText || error) && (
          <span className={cn("mt-2 block text-xs", error ? "text-red-500" : "text-[var(--muted)]")}>
            {error ?? helperText}
          </span>
        )}
      </label>
    );
  }
);

Input.displayName = "Input";
