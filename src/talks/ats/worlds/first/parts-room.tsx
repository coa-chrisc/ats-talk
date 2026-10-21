/**
 * The first world's drawn pieces: a dashed outline with its name and the
 * cross over it; a round table seen from above and a chair at it; a
 * calendar page; a tag with a pointed end; a lit window; a seated person's
 * head seen from above; a speech bubble; and the notebook page. SVG for the plane's
 * marks (the outline is HTML, as a dashed edge cannot stroke-draw), moved
 * with the house moves only (first.css paints them). Every word is passed
 * in from a layout.
 */
"use client";

import type { ReactNode } from "react";
import type { Box, Point } from "@/components/deck/kit";
import { WINDOW } from "../department-map";

/** The dashed edge reaches this far outside its box, so the stroke is never clipped. */
const PAD = 4;

/**
 * A dashed grey outline, crossed out, with its name: HTML, so it arrives by
 * its clip (`wipe`). The cross's two strokes (each drawing on by `--d`) are
 * in the outline's own SVG, and the name on its white patch comes after
 * that SVG, so the name sits over the cross and the cross passes behind it.
 */
export function Outline({ id, at, text, nameDown, strokes }: { id: string; at: Box; text: string; nameDown: number; strokes: readonly { key: string; d: string }[] }) {
  const w = at.w + 2 * PAD;
  const h = at.h + 2 * PAD;
  return (
    <div className="fs-outline dk-wipe" data-build={id} style={{ left: at.x - PAD, top: at.y - PAD, width: w, height: h }}>
      <svg width={w} height={h} viewBox={`${at.x - PAD} ${at.y - PAD} ${w} ${h}`} aria-hidden="true">
        <rect className="fs-outline__edge" x={at.x} y={at.y} width={at.w} height={at.h} rx={10} />
        {strokes.map((stroke) => (
          <path key={stroke.key} className="fs-cross dk-draw" data-build={stroke.key} d={stroke.d} pathLength={1} />
        ))}
      </svg>
      <span className="fs-outline__name" style={{ top: PAD + nameDown }}>
        {text}
      </span>
    </div>
  );
}

/** A round table seen from above: its edge draws on from the top, its top filling as it does (`--d`). `tone` is the City's green or the plain navy. */
export function Table({ id, c, r, tone = "plain" }: { id: string; c: Point; r: number; tone?: "green" | "plain" }) {
  return <circle className={`fs-table fs-table--${tone}`} data-build={id} cx={c.x} cy={c.y} r={r} pathLength={1} transform={`rotate(-90 ${c.x} ${c.y})`} />;
}

/**
 * A chair seen from above, turned to face the table: a rounded seat, wider
 * along the table's edge than it is deep, and a back on its far side.
 * `deg` is where it stands round the table (turned by it, the table lies
 * toward the chair's own +y). Children (a sitter) turn with
 * it. The outer group can grow about the chair's middle (`--s`).
 */
export function Chair({ id, at, deg, size, tone = "plain", grows = false, children }: { id: string; at: Point; deg: number; size: { w: number; h: number; rx: number }; tone?: "green" | "plain"; grows?: boolean; children?: ReactNode }) {
  const { w, h, rx } = size;
  return (
    <g data-build={id} className={grows ? "dk-move" : undefined} style={grows ? { transformOrigin: `${at.x}px ${at.y}px` } : undefined}>
      <g transform={`translate(${at.x} ${at.y}) rotate(${deg + 90})`}>
        <rect className={`fs-chair fs-chair--${tone}`} x={-w / 2} y={-h / 2} width={w} height={h} rx={rx} />
        <path className={`fs-chair__back fs-chair__back--${tone}`} d={`M${-w / 2 + rx / 2} ${-h / 2 + 1}H${w / 2 - rx / 2}`} />
        {children}
      </g>
    </g>
  );
}

/** The head of a person seated in a chair, seen from above: a navy dot in the chair's middle. It sits down by showing. */
export function Sitter({ id, head }: { id: string; head: number }) {
  return <circle className="fs-sitter" data-build={id} cx={0} cy={0} r={head} />;
}

/** A calendar page in green: two rings it hangs from, a header band and a grid of days. It comes up whole. */
export function Calendar({ id, at, header, rings, days }: { id: string; at: Box; header: number; rings: readonly number[]; days: readonly Box[] }) {
  return (
    <g data-build={id} className="fs-calendar">
      <rect className="fs-calendar__page" x={at.x} y={at.y} width={at.w} height={at.h} rx={10} />
      <path className="fs-calendar__header" d={`M${at.x} ${at.y + header}V${at.y + 10}Q${at.x} ${at.y} ${at.x + 10} ${at.y}H${at.x + at.w - 10}Q${at.x + at.w} ${at.y} ${at.x + at.w} ${at.y + 10}V${at.y + header}Z`} />
      {days.map((day) => (
        <rect key={`${day.x} ${day.y}`} className="fs-calendar__day" x={day.x} y={day.y} width={day.w} height={day.h} rx={3} />
      ))}
      {rings.map((x) => (
        <rect key={x} className="fs-calendar__ring" x={x - 5} y={at.y - 14} width={10} height={26} rx={5} />
      ))}
    </g>
  );
}

/** A tag in indigo: a label with a pointed left end and a hole, its words in navy on a pale indigo face. */
export function IndigoTag({ id, at, point, hole, text, words }: { id: string; at: Box; point: number; hole: number; text: string; words: Point }) {
  const { x, y, w, h } = at;
  const r = 8;
  return (
    <g data-build={id}>
      <path className="fs-tag" d={`M${x} ${y + h / 2}L${x + point} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + point}Z`} />
      <circle className="fs-tag__hole" cx={x + point} cy={y + h / 2} r={hole} />
      <text className="dk-text fs-word fs-word--strong" x={words.x} y={words.y} dominantBaseline="central">
        {text}
      </text>
    </g>
  );
}

/**
 * A window in a department's box, the department map's (department-map.ts),
 * as on slides 12 and 15: unlit, a square ruled in grey; as it lights
 * (`--k`) the square fills green and the whole box takes a soft green wash.
 */
export function Window({ id, cell, at, rx }: { id: string; cell: Box; at: Box; rx: number }) {
  return (
    <g data-build={id} className="fs-window">
      <rect className="fs-window__wash" x={cell.x} y={cell.y} width={cell.w} height={cell.h} rx={rx} />
      <rect className="fs-window__frame" x={at.x} y={at.y} width={at.w} height={at.h} rx={at.w * WINDOW.rx} />
      <rect className="fs-window__light" x={at.x} y={at.y} width={at.w} height={at.h} rx={at.w * WINDOW.rx} />
    </g>
  );
}

/** A speech bubble round a question, its tail, when it has one, pointing down from `tail.base` to `tail.tip`. */
export function Bubble({ id, at, text, tail }: { id: string; at: Box; text: string; tail?: { base: number; tip: Point } }) {
  const r = 14;
  const { x, y, w, h } = at;
  const foot = y + h;
  const d = [
    `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${foot - r}Q${x + w} ${foot} ${x + w - r} ${foot}`,
    tail ? `H${tail.base + 20}L${tail.tip.x} ${tail.tip.y}L${tail.base} ${foot}` : "",
    `H${x + r}Q${x} ${foot} ${x} ${foot - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`,
  ].join("");
  return (
    <g data-build={id}>
      <path className="fs-bubble" d={d} />
      <text className="dk-label fs-word" x={x + w / 2} y={y + h / 2} textAnchor="middle" dominantBaseline="central">
        {text}
      </text>
    </g>
  );
}

/** The notebook page: white, a navy edge, its binding rings along its top, a rule under its heading's place and faint ruling for each line. */
export function Page({ id, at, rings, rule, ruled }: { id: string; at: Box; rings: readonly Point[]; rule: { y: number; x0: number; x1: number }; ruled: readonly number[] }) {
  return (
    <g data-build={id}>
      <rect className="fs-page" x={at.x} y={at.y} width={at.w} height={at.h} rx={8} />
      {ruled.map((y) => (
        <path key={y} className="fs-page__ruled" d={`M${rule.x0} ${y}H${rule.x1}`} />
      ))}
      <path className="fs-page__rule" d={`M${rule.x0} ${rule.y}H${rule.x1}`} />
      {rings.map((ring) => (
        <rect key={ring.x} className="fs-page__ring" x={ring.x - 5} y={ring.y - 14} width={10} height={26} rx={5} />
      ))}
    </g>
  );
}

/** A line of writing on the page: a thick rule drawing on from the left (`--d`). */
export function Writing({ id, x0, x1, y }: { id: string; x0: number; x1: number; y: number }) {
  return <path className="fs-writing dk-draw" data-build={id} d={`M${x0} ${y}H${x1}`} pathLength={1} />;
}
