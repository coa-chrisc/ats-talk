/**
 * The plan world's own drawings, for what neither the kit nor the start
 * world's parts have. Each is SVG for the plane's marks unless it says
 * otherwise, takes an `id` a move can name, and is moved with the house
 * moves only: `draw` (`--d`), `fill` and `open` (`--k`), `show`, `rise`,
 * and `x`/`y` for travel. Every word is passed in from the layout, which
 * reads it from the script. Colours are in plan.css.
 */
"use client";

import type { ReactNode } from "react";
import { Story, type Box, type Point } from "@/components/deck/kit";
import { STORIES } from "./layout";

/** A slide's HTML, gathered as one part. */
export function Layer({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <div className="plan-layer" data-build={id}>
      {children}
    </div>
  );
}

/** A slide's story lines, in the band under its title. */
export function StoryOf({ picture }: { picture: string }) {
  const band = STORIES.find((entry) => entry.picture === picture)!;
  return <Story id={band.id} band={band.band} lines={band.lines} />;
}

type Tone = "navy" | "process" | "white";

/** A few words in the 26 px label type, centred on `at` up and down: navy, the process's green, or white on a navy shape. */
export function Words({ id, at, text, anchor = "middle", tone = "navy", strong = false }: { id?: string; at: Point; text: string; anchor?: "start" | "middle" | "end"; tone?: Tone; strong?: boolean }) {
  return (
    <text className={`dk-label plan-word plan-word--${tone}${strong ? " plan-word--strong" : ""}`} data-build={id} x={at.x} y={at.y} dy="0.35em" textAnchor={anchor}>
      {text}
    </text>
  );
}

/** The kit's person (head and shoulders), as this world draws it: stroked in navy, and with `solid` filled white, so it hides what it passes in front of. It draws on (`draw`) unless `drawn`, when it is whole and is shown. Without an `id` it goes with the part it is drawn inside. */
export function Figure({ id, at, drawn = false, solid = false, children }: { id?: string; at: Box; drawn?: boolean; solid?: boolean; children?: ReactNode }) {
  const cx = at.x + at.w / 2;
  const r = at.w * 0.25;
  const head = at.y + r + 2;
  const top = head + r + at.h * 0.1;
  const bottom = at.y + at.h - 2;
  const line = drawn ? "plan-figure__line" : "plan-figure__line dk-draw";
  const classes = ["plan-figure", drawn && "plan-figure--drawn", solid && "plan-figure--solid"].filter(Boolean).join(" ");
  return (
    <g className={classes} data-build={id}>
      <circle className={line} cx={cx} cy={head} r={r} pathLength={1} transform={`rotate(-90 ${cx} ${head})`} />
      <path className={line} d={`M${at.x + 2} ${bottom}V${top + at.w * 0.42}A${at.w / 2 - 2} ${at.w * 0.42} 0 0 1 ${at.x + at.w - 2} ${top + at.w * 0.42}V${bottom}`} pathLength={1} />
      {children}
    </g>
  );
}

/** The same person as a filled shape, for a figure that takes its department's colour (`data-hue`), shown under its outline. */
export function Silhouette({ id, at, hue }: { id: string; at: Box; hue?: string }) {
  const cx = at.x + at.w / 2;
  const r = at.w * 0.25;
  const head = at.y + r + 2;
  const shoulders = head + r + at.h * 0.1 + at.w * 0.42;
  const bottom = at.y + at.h - 2;
  return (
    <g className="plan-silhouette" data-build={id} data-hue={hue}>
      <circle cx={cx} cy={head} r={r} />
      <path d={`M${at.x + 2} ${bottom}V${shoulders}A${at.w / 2 - 2} ${at.w * 0.42} 0 0 1 ${at.x + at.w - 2} ${shoulders}V${bottom}Z`} />
    </g>
  );
}

/** A small lantern held up in a person's hand: a round pool of warm light, the arm that holds it up, and the lantern itself, a flame between a cap and a base. It goes with the person it is drawn inside. */
export function Lantern({ at, hand, w, h, pool }: { at: Point; hand: Point; w: number; h: number; pool: number }) {
  const top = at.y - h / 2;
  const foot = at.y + h / 2;
  const flame = `M${at.x} ${top + 4}C${at.x + w * 0.45} ${at.y - 1} ${at.x + w * 0.4} ${foot - 4} ${at.x} ${foot - 4}C${at.x - w * 0.4} ${foot - 4} ${at.x - w * 0.45} ${at.y - 1} ${at.x} ${top + 4}Z`;
  return (
    <g className="plan-lantern">
      <circle className="plan-lantern__pool" cx={at.x} cy={at.y} r={pool} />
      <circle className="plan-lantern__core" cx={at.x} cy={at.y} r={pool * 0.6} />
      <path className="plan-lantern__arm" d={`M${hand.x} ${hand.y}L${at.x} ${foot}`} />
      <path className="plan-lantern__flame" d={flame} />
      <rect className="plan-lantern__cap" x={at.x - w / 2} y={top - 2} width={w} height={4} rx={2} />
      <rect className="plan-lantern__cap" x={at.x - w / 2} y={foot - 2} width={w} height={4} rx={2} />
    </g>
  );
}

/** A rectangle whose outline draws on (`draw`) and whose ground comes in with it, in navy or, with `hue`, a role's colour; `className` picks its ground (plan.css: a tint, white, a grey edge). */
export function Frame({ id, at, hue, rx = 10, className, children }: { id: string; at: Box; hue?: string; rx?: number; className?: string; children?: ReactNode }) {
  return (
    <g className={className ? `plan-frame ${className}` : "plan-frame"} data-build={id} data-hue={hue}>
      <rect className="plan-frame__ground" x={at.x} y={at.y} width={at.w} height={at.h} rx={rx} />
      <rect className="plan-frame__edge dk-draw" x={at.x} y={at.y} width={at.w} height={at.h} rx={rx} pathLength={1} />
      {children}
    </g>
  );
}

/** Bars of writing, grey. `tied`, they come in with the outline they sit inside (`--d`). */
export function Writing({ bars, tied = false }: { bars: readonly Box[]; tied?: boolean }) {
  return (
    <g className={tied ? "plan-writing plan-writing--tied" : "plan-writing"}>
      {bars.map((bar) => (
        <rect key={`${bar.x} ${bar.y}`} x={bar.x} y={bar.y} width={bar.w} height={bar.h} rx={bar.h / 2} />
      ))}
    </g>
  );
}

/** A part that grows from one edge as `--k` goes to 1 (`fill` or `open`): along x from its left, or along y from its top or its foot. */
export function Grow({ id, from, axis, children, className }: { id: string; from: Point; axis: "x" | "y"; children: ReactNode; className?: string }) {
  return (
    <g className={`plan-grow plan-grow--${axis}${className ? ` ${className}` : ""}`} data-build={id} style={{ transformOrigin: `${from.x}px ${from.y}px` }}>
      {children}
    </g>
  );
}

/** A doorway: the space behind a door, shown (`show`) under whatever passes through it. */
export function Doorway({ id, at }: { id: string; at: Box }) {
  const inner = doorInner(at);
  return <rect className="plan-door__way" data-build={id} x={inner.x} y={inner.y} width={inner.w} height={inner.h} />;
}

const doorInner = (at: Box): Box => ({ x: at.x + 10, y: at.y + 10, w: at.w - 20, h: at.h - 10 });

/** A plain door seen from the front, drawn over its doorway: its frame draws on (`draw`), and its leaf shows (`show`) and swings open about its left edge (`open`). */
export function Door({ id, leaf, at }: { id: string; leaf: string; at: Box }) {
  const inner = doorInner(at);
  return (
    <>
      <path className="plan-door__frame dk-draw" data-build={id} d={`M${at.x} ${at.y + at.h}V${at.y}H${at.x + at.w}V${at.y + at.h}`} pathLength={1} />
      <g className="plan-door__leaf" data-build={leaf} style={{ transformOrigin: `${inner.x}px ${inner.y}px` }}>
        <rect x={inner.x} y={inner.y} width={inner.w} height={inner.h} />
        <circle className="plan-door__knob" cx={inner.x + inner.w - 16} cy={inner.y + inner.h * 0.55} r={5} />
      </g>
    </>
  );
}

/** A dotted line, as an HTML part over the marks: a dotted stroke cannot draw on by its dash offset, so it opens by its clip (`wipe`) from the end it leaves. */
export function Dotted({ id, from, to }: { id: string; from: Point; to: Point }) {
  const pad = 6;
  const left = Math.min(from.x, to.x) - pad;
  const top = Math.min(from.y, to.y) - pad;
  const w = Math.abs(to.x - from.x) + 2 * pad;
  const h = Math.abs(to.y - from.y) + 2 * pad;
  return (
    <div className="plan-dotted dk-wipe" data-build={id} style={{ left, top, width: w, height: h }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
        <path d={`M${from.x - left} ${from.y - top}L${to.x - left} ${to.y - top}`} />
      </svg>
    </div>
  );
}
