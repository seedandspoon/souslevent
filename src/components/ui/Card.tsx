import { type ReactNode } from "react";
import clsx from "clsx";

export function Card({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}) {
  return (
    <As
      className={clsx(
        "rounded-2xl bg-surface border border-border shadow-[0_1px_2px_rgba(11,34,57,0.04)]",
        className
      )}
    >
      {children}
    </As>
  );
}
