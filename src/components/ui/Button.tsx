import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

const baseStyles =
  "inline-flex cursor-pointer items-center justify-center rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50 disabled:cursor-not-allowed disabled:opacity-60";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/30 hover:bg-[var(--sage)]/80",
  secondary:
    "bg-[var(--sage)] text-[var(--ink)] shadow-lg shadow-[var(--sage)]/30 hover:bg-[var(--deep)]/80",
  outline:
    "border border-[var(--ink)]/20 text-[var(--ink)]/80 hover:border-[var(--ink)]/40 hover:text-[var(--ink)]",
  ghost: "text-[var(--ink)]/70 hover:text-[var(--ink)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs uppercase tracking-[0.25em]",
  md: "px-6 py-2 text-sm",
  lg: "px-7 py-3 text-sm",
};

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

export const buttonStyles = ({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: ButtonStyleOptions = {}) =>
  cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className
  );

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonStyles ({ variant, size, fullWidth, className })}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
