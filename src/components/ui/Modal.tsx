import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export const Modal = ({
  open,
  onClose,
  title,
  children,
  footer,
  className,
}: ModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-xl rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl shadow-black/30",
          className
        )}
      >
        <div className="flex items-start justify-between gap-4">
          {title && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sage)]">
                modal
              </p>
              <h3 className="text-xl font-semibold text-[var(--ink)]">
                {title}
              </h3>
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-[var(--ink)]/60 transition hover:text-[var(--ink)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6">{children}</div>
        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  );
};
