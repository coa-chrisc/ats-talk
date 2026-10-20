/**
 * Slide 28's own drawings: a panel's numeral; a panel's
 * square navy outline, drawn on; a panel's
 * name in HTML, wrapping in its column; the green line
 * that joins a panel to its tile; and a tile, a green-edged box on the
 * process's idle tint with its words in navy. Script-free: every word is
 * passed in. SVG for the plane's marks (ready.css paints them).
 */
"use client";

import type { ReactNode } from "react";
import type { Box, Point } from "@/components/deck/kit";
import { Words } from "./parts";

/** A panel's numeral: 56 px semibold in the process's green, set from its left end, centred on `at` up and down. */
export function Numeral({ id, at, text }: { id: string; at: Point; text: string }) {
  return (
    <text className="rd-numeral" data-build={id} x={at.x} y={at.y} textAnchor="start" dominantBaseline="central">
      {text}
    </text>
  );
}

/** A panel: a square navy edge, no fill, drawn on (`draw`). */
export function Panel({ id, at }: { id: string; at: Box }) {
  return <rect className="rd-panel dk-draw" data-build={id} x={at.x} y={at.y} width={at.w} height={at.h} pathLength={1} />;
}

/** Words in HTML wrapping inside their box, their lines balanced: a panel's name, 32 px semibold navy. */
export function Note({ id, at, children }: { id: string; at: Box; children: ReactNode }) {
  return (
    <div className="rd-note" data-build={id} style={{ left: at.x, top: at.y, width: at.w, height: at.h }}>
      {children}
    </div>
  );
}

/** Words set on lines, one text each, every line's middle `pitch` under the last. */
export function Lines({ id, at, lines, pitch, size, strong = false }: { id?: string; at: Point; lines: readonly string[]; pitch: number; size: "label" | "text"; strong?: boolean }) {
  return (
    <g data-build={id}>
      {lines.map((line, i) => (
        <Words key={i} at={{ x: at.x, y: at.y + i * pitch }} text={line} anchor="start" size={size} strong={strong} />
      ))}
    </g>
  );
}

/** The green line from a panel's foot down to its tile, drawn down (`draw`). */
export function Drop({ id, from, to }: { id: string; from: Point; to: Point }) {
  return <path className="rd-drop dk-draw" data-build={id} d={`M${from.x} ${from.y}L${to.x} ${to.y}`} pathLength={1} />;
}

/** A tile: a green-edged box on the process's idle tint, its words in navy on its lines. It lands as one part. */
export function WordTile({ id, at, rx, words, pitch }: { id: string; at: Box; rx: number; words: { at: Point; lines: readonly string[] }; pitch: number }) {
  return (
    <g data-build={id}>
      <rect className="rd-tile" x={at.x} y={at.y} width={at.w} height={at.h} rx={rx} />
      <Lines at={words.at} lines={words.lines} pitch={pitch} size="label" strong />
    </g>
  );
}
