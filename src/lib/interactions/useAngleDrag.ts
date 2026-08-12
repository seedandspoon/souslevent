"use client";

import { useCallback, useRef, useState } from "react";
import { angleFromCenter } from "./angle";

/**
 * Fait tourner une valeur d'angle (0-360°) en glissant le doigt/la souris
 * autour du centre d'un élément SVG. `svgRef` doit pointer vers l'élément
 * <svg> ; le centre est déduit de son viewBox et de son rectangle affiché.
 */
export function useAngleDrag(initial: number, viewBoxCenter: { x: number; y: number }) {
  const [angle, setAngle] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const toSvgPoint = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;
    const x = ((clientX - rect.left) / rect.width) * viewBox.width + viewBox.x;
    const y = ((clientY - rect.top) / rect.height) * viewBox.height + viewBox.y;
    return { x, y };
  }, []);

  const updateFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const p = toSvgPoint(clientX, clientY);
      if (!p) return;
      setAngle(angleFromCenter(viewBoxCenter.x, viewBoxCenter.y, p.x, p.y));
    },
    [toSvgPoint, viewBoxCenter.x, viewBoxCenter.y]
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      (e.target as Element).setPointerCapture(e.pointerId);
      setDragging(true);
      updateFromPointer(e.clientX, e.clientY);
    },
    [updateFromPointer]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      updateFromPointer(e.clientX, e.clientY);
    },
    [dragging, updateFromPointer]
  );

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    (e.target as Element).releasePointerCapture(e.pointerId);
    setDragging(false);
  }, []);

  return {
    angle,
    setAngle,
    dragging,
    svgRef,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp },
  };
}
