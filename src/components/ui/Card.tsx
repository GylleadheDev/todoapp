import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

export const Card = ({ children, className, ...props }: CardProps) => (
  <div
    className={cn(
      "rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl shadow-black/10 backdrop-blur",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
