/**
 * Slide 18's own drawn pieces: the small fenced yard (slide 13's picket
 * fence, drawn small), a box whose edge draws on with its ground,
 * a nameplate, and a straight line with a head at its far end. SVG for the
 * plane's marks, moved with the house moves only (first.css paints them).
 * Every word is passed in from a layout.
 */
"use client";

import type { CSSProperties } from "react";
import type { Box, Point } from "@/components/deck/kit";
import { FENCE, fencePickets } from "../department-map";
import { Words } from "./parts";

/** The yard's fence, slide 13's picket fence at `scale` (department-map.ts): a rail all round, drawn on as one outline (`draw`), and pickets rising over its top rail, each standing up as the rail reaches it, the yard's green ground coming in with it. */
export function Fence({ id, at, scale }: { id: string; at: Box; scale: number }) {
  const rx = FENCE.rx * scale;
  return (
    <g className="fs-fence" data-build={id}>
      <rect className="fs-fence__yard" x={at.x} y={at.y} width={at.w} height={at.h} rx={rx} />
      <rect className="fs-fence__rail dk-draw" x={at.x} y={at.y} width={at.w} height={at.h} rx={rx} pathLength={1} />
      {fencePickets(at, scale).pickets.map((picket) => (
        <path key={picket.x} className="fs-fence__picket" d={picket.d} style={{ "--at": picket.at } as CSSProperties} />
      ))}
    </g>
  );
}

/** A box whose edge draws on (`draw`), its ground coming in with it. `tone` is the City's green or the plain navy. */
export function Frame({ id, at, tone }: { id: string; at: Box; tone: "green" | "plain" }) {
  return (
    <g className={`fs-frame fs-frame--${tone}`} data-build={id}>
      <rect className="fs-frame__ground" x={at.x} y={at.y} width={at.w} height={at.h} rx={12} />
      <rect className="fs-frame__edge dk-draw" x={at.x} y={at.y} width={at.w} height={at.h} rx={12} pathLength={1} />
    </g>
  );
}

/** A small nameplate: white, a navy edge, its word in the middle. It shows whole. */
export function Nameplate({ id, at, text }: { id: string; at: Box; text: string }) {
  return (
    <g data-build={id}>
      <rect className="fs-nameplate" x={at.x} y={at.y} width={at.w} height={at.h} rx={6} />
      <Words at={{ x: at.x + at.w / 2, y: at.y + at.h / 2 }} text={text} strong />
    </g>
  );
}

/** A tile: white, a green edge, its words in the middle. It shows whole. */
export function TeamTile({ id, at, text, words }: { id: string; at: Box; text: string; words: Point }) {
  return (
    <g data-build={id}>
      <rect className="fs-team-tile" x={at.x} y={at.y} width={at.w} height={at.h} rx={8} />
      <Words at={words} text={text} strong />
    </g>
  );
}

/** A straight line across that draws on (`draw`), its head arriving with the line's front. */
export function Reach({ id, from, to }: { id: string; from: Point; to: Point }) {
  return (
    <g className="fs-reach" data-build={id}>
      <path className="fs-reach__line dk-draw" d={`M${from.x} ${from.y}L${to.x} ${to.y}`} pathLength={1} />
      <path className="fs-reach__head" d={`M${to.x - 13} ${to.y - 9}L${to.x} ${to.y}L${to.x - 13} ${to.y + 9}`} />
    </g>
  );
}
