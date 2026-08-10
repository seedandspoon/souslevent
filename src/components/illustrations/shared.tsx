import type { ReactNode } from "react";

export function IllustrationFrame({
  children,
  viewBox = "0 0 400 220",
  label,
}: {
  children: ReactNode;
  viewBox?: string;
  label: string;
}) {
  return (
    <div className="rounded-xl bg-brand-50 py-4">
      <svg
        viewBox={viewBox}
        role="img"
        aria-label={label}
        className="w-full h-auto max-h-56 mx-auto"
        style={{ color: "var(--color-brand-700)" }}
      >
        {children}
      </svg>
    </div>
  );
}

export const INK = "var(--color-ink)";
export const BRAND = "var(--color-brand-500)";
export const BRAND_SOFT = "var(--color-brand-300)";
export const ACCENT = "var(--color-accent)";
export const SUCCESS = "var(--color-success)";
export const DANGER = "var(--color-danger)";
export const SURFACE = "var(--color-surface)";

export function Label({
  x,
  y,
  children,
  anchor = "middle",
  fill = INK,
  size = 12,
  weight = 600,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  fill?: string;
  size?: number;
  weight?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
      fontFamily="var(--font-sans), sans-serif"
    >
      {children}
    </text>
  );
}
