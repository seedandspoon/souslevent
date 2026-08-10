import clsx from "clsx";

export function ProgressBar({
  value,
  className,
  colorClassName = "bg-brand-500",
  trackClassName = "bg-surface-2",
  height = "h-2",
}: {
  value: number;
  className?: string;
  colorClassName?: string;
  trackClassName?: string;
  height?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={clsx("w-full rounded-full overflow-hidden", height, trackClassName, className)}>
      <div
        className={clsx("h-full rounded-full transition-all duration-500 ease-out", colorClassName)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
