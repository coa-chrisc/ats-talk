/**
 * The plan slides' own drawings (21 to 23), for what the kit does not have. Each is SVG
 * for the plane's marks unless it says otherwise, takes an `id` a move can
 * name, and is moved with the house moves only: `draw` (`--d`), `fill`
 * (`--k`), `show`, `rise`, and `x`/`y` for travel. Every word is passed in
 * from a layout, which reads it from the script. Colours are in first-plan.css.
 */
"use client";

import type { ReactNode } from "react";
import type { Box, Point } from "@/components/deck/kit";
import { TAG } from "./layout-plan";

/** The tone a word is set in: navy, white on a filled shape, or the course's indigo for a figure from it. */
export type Tone = "navy" | "white" | "indigo";

type LabelProps = {
  id?: string;
  at: Point;
  text: string;
  anchor?: "start" | "middle" | "end";
  tone?: Tone;
  strong?: boolean;
  /** The 26 px label type, the 32 px text size, or a figure at 44 px. */
  size?: "label" | "text" | "figure";
};

/** A few words, centred on `at` up and down. */
export function Label({ id, at, text, anchor = "middle", tone = "navy", strong = false, size = "label" }: LabelProps) {
  const classes = ["dk-label", "fs-label", `fs-label--${tone}`, strong && "fs-label--strong", size === "figure" && "fs-label--figure", size === "text" && "fs-label--text"].filter(Boolean).join(" ");
  return (
    <text className={classes} data-build={id} x={at.x} y={at.y} dy="0.35em" textAnchor={anchor}>
      {text}
    </text>
  );
}

/** A long strip whose edge draws on (`draw`) and whose ground comes in with it: a lane, a slab's well. Children go with it. */
export function Strip({ id, at, rx = 12, className, children }: { id: string; at: Box; rx?: number; className?: string; children?: ReactNode }) {
  return (
    <g className={className ? `fs-strip ${className}` : "fs-strip"} data-build={id}>
      <rect className="fs-strip__ground" x={at.x} y={at.y} width={at.w} height={at.h} rx={rx} />
      <rect className="fs-strip__edge dk-draw" x={at.x} y={at.y} width={at.w} height={at.h} rx={rx} pathLength={1} />
      {children}
    </g>
  );
}

/** A part that grows from its left edge as `--k` goes to 1 (`fill`). */
export function Grow({ id, at, className, rx = 8 }: { id: string; at: Box; className: string; rx?: number }) {
  return (
    <g className="fs-grow" data-build={id} style={{ transformOrigin: `${at.x}px ${at.y}px` }}>
      <rect className={className} x={at.x} y={at.y} width={at.w} height={at.h} rx={rx} />
    </g>
  );
}

/**
 * A tag: a box with a pointed left end and a hole by the point, its words
 * set after the hole. `kind` gives its colours (first-plan.css): grey for a
 * problem, green for the City's own work. It shows
 * whole (`show`, `rise`).
 */
export function TagShape({ id, at, text, kind }: { id: string; at: Box; text: string; kind: "grey" | "green" }) {
  const mid = at.y + at.h / 2;
  const d = `M${at.x} ${mid}L${at.x + TAG.point} ${at.y}H${at.x + at.w - 6}Q${at.x + at.w} ${at.y} ${at.x + at.w} ${at.y + 6}V${at.y + at.h - 6}Q${at.x + at.w} ${at.y + at.h} ${at.x + at.w - 6} ${at.y + at.h}H${at.x + TAG.point}Z`;
  return (
    <g className={`fs-tagged fs-tagged--${kind}`} data-build={id}>
      <path className="fs-tagged__shape" d={d} />
      <circle className="fs-tagged__hole" cx={at.x + TAG.point + 2} cy={mid} r={4} />
      <Label at={{ x: at.x + TAG.point + (at.w - TAG.point) / 2 + 4, y: mid }} text={text} strong />
    </g>
  );
}

/** A small box shipped along a lane: solid green, its lid's line across it. It travels on `x`. */
export function Parcel({ id, at }: { id: string; at: Box }) {
  return (
    <g className="fs-parcel" data-build={id}>
      <rect x={at.x} y={at.y} width={at.w} height={at.h} rx={6} />
      <path d={`M${at.x + at.w / 2} ${at.y + 4}V${at.y + at.h - 4}`} />
    </g>
  );
}

/** A straight arrow down from one point to another that draws on (`draw`), its head arriving with the line's front. */
export function DownArrow({ id, from, to }: { id: string; from: Point; to: Point }) {
  return (
    <g className="fs-arrow" data-build={id}>
      <path className="fs-arrow__line dk-draw" d={`M${from.x} ${from.y}L${to.x} ${to.y}`} pathLength={1} />
      <path className="fs-arrow__head" d={`M${to.x - 9} ${to.y - 13}L${to.x} ${to.y}L${to.x + 9} ${to.y - 13}`} />
    </g>
  );
}

/** A closed outline of straight lines through `points` that draws on (`draw`), its ground coming in with it. */
export function Edged({ id, points, className }: { id: string; points: readonly Point[]; className: string }) {
  const d = `M${points.map((p) => `${p.x} ${p.y}`).join("L")}Z`;
  return (
    <g className={className} data-build={id}>
      <path className="fs-shape__ground" d={d} />
      <path className="fs-shape__edge dk-draw" d={d} pathLength={1} />
    </g>
  );
}

/** A filled shape through `points` that shows (`show`) over an outline: a tier lit. */
export function Shape({ id, points, className }: { id: string; points: readonly Point[]; className: string }) {
  return <path className={className} data-build={id} d={`M${points.map((p) => `${p.x} ${p.y}`).join("L")}Z`} />;
}

/** A desk seen from the front with a laptop open on it: the top, two legs and the laptop's screen and base. It draws on with the part it is drawn inside (`--d`). */
export function Desk({ top, foot, laptop }: { top: Box; foot: number; laptop: Box }) {
  const legs = [top.x + 12, top.x + top.w - 12];
  return (
    <g className="fs-desk">
      <rect className="fs-desk__laptop dk-draw" x={laptop.x} y={laptop.y} width={laptop.w} height={laptop.h} rx={3} pathLength={1} />
      <path className="fs-desk__top dk-draw" d={`M${top.x} ${top.y}H${top.x + top.w}V${top.y + top.h}H${top.x}Z`} pathLength={1} />
      <path className="fs-desk__legs dk-draw" d={legs.map((x) => `M${x} ${top.y + top.h}V${foot}`).join("")} pathLength={1} />
    </g>
  );
}

/** A nameplate: a white plate with a navy edge and its words. It shows whole. */
export function Plate({ id, at, text }: { id: string; at: Box; text: string }) {
  return (
    <g className="fs-plate" data-build={id}>
      <rect x={at.x} y={at.y} width={at.w} height={at.h} rx={6} />
      <Label at={{ x: at.x + at.w / 2, y: at.y + at.h / 2 }} text={text} strong />
    </g>
  );
}
