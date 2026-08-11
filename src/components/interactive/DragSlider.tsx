"use client";

import { useCallback, useRef, useState } from "react";
import clsx from "clsx";
import { clamp } from "@/lib/interactions/angle";

export function DragSlider({
  value,
  onChange,
  leftLabel,
  rightLabel,
  tone = "brand",
}: {
  value: number; // 0-100
  onChange: (v: number) => void;
  leftLabel: string;
  rightLabel: string;
  tone?: "brand" | "accent";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const pct = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
      onChange(Math.round(pct));
    },
    [onChange]
  );

  function onPointerDown(e: React.PointerEvent) {
    (e.target as Element).setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  }
  function onPointerUp(e: React.PointerEvent) {
    (e.target as Element).releasePointerCapture(e.pointerId);
    setDragging(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between text-xs font-medium text-ink-soft mb-2">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative h-11 rounded-full bg-surface-2 touch-none cursor-pointer select-none"
      >
        <div
          className={clsx(
            "absolute top-0 left-0 h-full rounded-full",
            tone === "accent" ? "bg-accent-soft" : "bg-brand-100"
          )}
          style={{ width: `${value}%` }}
        />
        <div
          className={clsx(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full shadow-md transition-transform",
            tone === "accent" ? "bg-accent" : "bg-brand-500",
            dragging && "scale-110"
          )}
          style={{ left: `${value}%` }}
        />
      </div>
    </div>
  );
}
