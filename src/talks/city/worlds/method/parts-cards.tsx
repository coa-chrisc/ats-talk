/**
 * The idea card and what goes with it, slides 13, 15 and 16: the card
 * itself, at any size; the grey tag that says why an idea stalls; the hand
 * that lifts a card; a layer under a card, the gap mark a missing one takes,
 * and a card's dot on the chart. Each is SVG for the plane's marks, moved
 * with the house moves only (method.css paints them).
 */
"use client";

import type { ReactNode } from "react";
import type { Box, Point } from "@/components/deck/kit";
import { CARD, TAG, centreOf } from "./layout";

/** A light bulb, the sign of an idea, in a 24 unit box scaled to `size`, its top left at `at`. */
function Bulb({ at, size }: { at: Point; size: number }) {
  return (
    <g className="method-bulb" transform={`translate(${at.x} ${at.y}) scale(${size / 24})`}>
      <path d="M8.6 16.4C6.4 14.9 5 12.6 5 10a7 7 0 0 1 14 0c0 2.6-1.4 4.9-3.6 6.4V19H8.6Z" />
      <path d="M9.2 22H14.8" />
    </g>
  );
}

/**
 * An idea card: white, a navy edge, a pin at the middle of its top, a bulb
 * at its top left and two faint lines of writing, and no words. Its parts
 * are given at slide 13's size and scale with its height. It moves about
 * `origin` (its middle when left out) by `--x`, `--y` and `--s`; `tilt` is
 * how far off true it hangs. Children (a tag) hang and move with it.
 */
export function IdeaCard({ id, at, tilt = 0, origin, children }: { id: string; at: Box; tilt?: number; origin?: Point; children?: ReactNode }) {
  const k = at.h / CARD.h;
  const c = centreOf(at);
  const o = origin ?? c;
  return (
    <g data-build={id} className="dk-move" style={{ transformOrigin: `${o.x}px ${o.y}px` }}>
      <g transform={tilt ? `rotate(${tilt} ${c.x} ${c.y})` : undefined}>
        <rect className="method-card" x={at.x} y={at.y} width={at.w} height={at.h} rx={CARD.rx * k} />
        <Bulb at={{ x: at.x + 18 * k, y: at.y + 16 * k }} size={30 * k} />
        <rect className="method-card__writing" x={at.x + 60 * k} y={at.y + 24 * k} width={150 * k} height={8 * k} rx={4 * k} />
        <rect className="method-card__writing" x={at.x + 60 * k} y={at.y + 40 * k} width={104 * k} height={8 * k} rx={4 * k} />
        <circle className="method-card__pin" cx={c.x} cy={at.y + 3 * k} r={6 * k} />
        {children}
      </g>
    </g>
  );
}

/** The tag's outline: a label with a pointed left end. */
const tagPath = ({ x, y, w, h }: Box) => {
  const p = Math.min(TAG.point, h * 0.4);
  const r = Math.min(6, h / 4);
  return `M${x} ${y + h / 2}L${x + p} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + p}Z`;
};

/**
 * A grey tag: a label with a pointed end and a hole, edged in slate on the
 * raised grey, its words in navy. With an id it pops on about its hole
 * (`--s`); without one it hangs as part of its card.
 */
export function GreyTag({ id, at, text }: { id?: string; at: Box; text?: string }) {
  const p = Math.min(TAG.point, at.h * 0.4);
  const hole = { x: at.x + p * 0.85, y: at.y + at.h / 2 };
  const body = (
    <>
      <path className="method-tag" d={tagPath(at)} />
      <circle className="method-tag__hole" cx={hole.x} cy={hole.y} r={Math.max(2.5, at.h * 0.11)} />
      {text && (
        <text className="dk-label method-word method-tag__words" x={at.x + TAG.point + TAG.gap} y={at.y + at.h / 2} dominantBaseline="central">
          {text}
        </text>
      )}
    </>
  );
  if (!id) return body;
  return (
    <g data-build={id} className="dk-move" style={{ transformOrigin: `${hole.x}px ${hole.y}px` }}>
      {body}
    </g>
  );
}

/**
 * A hand, seen from the front, holding a card by its right edge: its palm
 * and wrist to the right of the edge, its thumb across the card's face, and
 * a sleeve. `grip` is the middle of the edge it holds; it moves by `--x` and
 * `--y`.
 */
export function Hand({ id, grip }: { id: string; grip: Point }) {
  return (
    <g data-build={id} className="dk-move">
      <g className="method-hand" transform={`translate(${grip.x} ${grip.y})`}>
        <path className="method-hand__sleeve" d="M100 -34L156 -46V62L100 50Z" />
        <path d="M-2 -30C18 -46 62 -48 86 -32C100 -22 106 -6 106 12V48C86 58 52 60 26 54C10 50 0 40 -2 30Z" />
        <path className="method-hand__crease" d="M18 -28C28 -18 30 -4 24 8M44 -36C52 -26 54 -12 50 0" />
        <path d="M4 22C-18 24 -42 12 -50 -2C-55 -12 -46 -21 -34 -17C-20 -12 -6 -8 8 -6Z" />
        <path className="method-hand__crease" d="M-44 -6C-40 -12 -33 -13 -29 -8" />
        <path className="method-hand__cuff" d="M98 -32L108 -35V52L98 50Z" />
      </g>
    </g>
  );
}

/** A layer under a card: a wide raised bar, its name inside its left end. A layer with a gap (`gap`) has a dashed grey outline that shows over the solid one. */
export function Stratum({ id, at, text, name, gap }: { id: string; at: Box; text: string; name: Point; gap?: string }) {
  return (
    <g data-build={id}>
      <rect className="method-stratum" x={at.x} y={at.y} width={at.w} height={at.h} rx={10} />
      {gap && <rect className="method-stratum method-stratum--gap" data-build={gap} x={at.x} y={at.y} width={at.w} height={at.h} rx={10} />}
      <text className="dk-label method-word method-word--strong" x={name.x} y={name.y} dominantBaseline="central">
        {text}
      </text>
    </g>
  );
}

/** The gap mark: a dashed grey ring round a grey cross, where a missing layer's tick would be. It pops on about its middle. */
export function GapMark({ id, at, r }: { id: string; at: Point; r: number }) {
  const k = r * 0.42;
  return (
    <g data-build={id} className="dk-move method-gap" style={{ transformOrigin: `${at.x}px ${at.y}px` }}>
      <circle cx={at.x} cy={at.y} r={r} />
      <path d={`M${at.x - k} ${at.y - k}L${at.x + k} ${at.y + k}M${at.x + k} ${at.y - k}L${at.x - k} ${at.y + k}`} />
    </g>
  );
}

/** A card's dot on the chart, navy, every one alike. It travels by `x` and `y`. */
export function Dot({ id, at, r }: { id: string; at: Point; r: number }) {
  return <circle className="method-dot" data-build={id} cx={at.x} cy={at.y} r={r} />;
}
