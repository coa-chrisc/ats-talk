/**
 * Slide 22a's own drawn pieces: a seat badge on a developer's chest, the
 * meter that steps up a cell for each small piece of work, the piece of
 * work itself, and the dashed boundary between the two sides. SVG for the
 * plane's marks, but the boundary, which is dashed and so cannot draw on:
 * it is HTML holding its own SVG and wipes on (`wipe`). Moved with the house
 * moves only; painted by first-budget.css. Every word is passed in.
 */
"use client";

import type { Box, Point } from "@/components/deck/kit";

/** A seat badge: a small navy card with a white line across it. It lands whole (`rise`). */
export function SeatBadge({ id, at, rx }: { id: string; at: Box; rx: number }) {
  return (
    <g className="fs-badge" data-build={id}>
      <rect className="fs-badge__card" x={at.x} y={at.y} width={at.w} height={at.h} rx={rx} />
      <path className="fs-badge__line" d={`M${at.x + 7} ${at.y + at.h / 2}H${at.x + at.w - 7}`} />
    </g>
  );
}

/** The meter's outline and the rules between its cells, drawn on in navy (`draw`). */
export function Meter({ id, at, ticks, rx }: { id: string; at: Box; ticks: readonly number[]; rx: number }) {
  return (
    <g className="fs-meter" data-build={id}>
      <rect className="fs-meter__edge dk-draw" x={at.x} y={at.y} width={at.w} height={at.h} rx={rx} pathLength={1} />
      <path className="fs-meter__ticks" d={ticks.map((x) => `M${x} ${at.y + 6}V${at.y + at.h - 6}`).join("")} />
    </g>
  );
}

/** A small piece of work: a navy dot that travels on `x` into its cell. */
export function Token({ id, at, r }: { id: string; at: Point; r: number }) {
  return <circle className="fs-token" data-build={id} cx={at.x} cy={at.y} r={r} />;
}

/** The dashed line down between the two sides, in navy. HTML holding its own SVG, as a dashed line cannot draw on: it wipes on from the top (`wipe`). */
export function Boundary({ id, at }: { id: string; at: Box }) {
  const mid = at.w / 2;
  return (
    <div className="fs-boundary dk-wipe" data-build={id} style={{ left: at.x, top: at.y, width: at.w, height: at.h }}>
      <svg width={at.w} height={at.h} viewBox={`0 0 ${at.w} ${at.h}`} aria-hidden="true">
        <path d={`M${mid} 0V${at.h}`} />
      </svg>
    </div>
  );
}
