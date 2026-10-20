/**
 * The method world's drawn pieces: a dashed outline with its name and the
 * cross over it; a round table seen from above and a chair at it; a
 * calendar page; a tag with a pointed end; a lantern; a seated person's
 * head seen from above; a speech bubble; and the notebook page. SVG for the plane's
 * marks (the outline is HTML, as a dashed edge cannot stroke-draw), moved
 * with the house moves only (method.css paints them). Every word is passed
 * in from a layout.
 */
"use client";

import type { ReactNode } from "react";
import type { Box, Point } from "@/components/deck/kit";

/** The dashed edge reaches this far outside its box, so the stroke is never clipped. */
const PAD = 4;

/** A dashed grey outline with its name in its upper part: HTML, so it arrives by its clip (`wipe`). */
export function Outline({ id, at, text, nameDown }: { id: string; at: Box; text: string; nameDown: number }) {
  return (
    <div className="md-outline dk-wipe" data-build={id} style={{ left: at.x - PAD, top: at.y - PAD, width: at.w + 2 * PAD, height: at.h + 2 * PAD }}>
      <svg width={at.w + 2 * PAD} height={at.h + 2 * PAD} viewBox={`0 0 ${at.w + 2 * PAD} ${at.h + 2 * PAD}`} aria-hidden="true">
        <rect x={PAD} y={PAD} width={at.w} height={at.h} rx={10} />
      </svg>
      <span className="md-outline__name" style={{ top: PAD + nameDown }}>
        {text}
      </span>
    </div>
  );
}

/** A cross: two grey strokes, each drawing on (`--d`) from its own start. The group can step back as one. */
export function Cross({ id, strokes }: { id: string; strokes: readonly { key: string; d: string }[] }) {
  return (
    <g data-build={id}>
      {strokes.map((stroke) => (
        <path key={stroke.key} className="md-cross dk-draw" data-build={stroke.key} d={stroke.d} pathLength={1} />
      ))}
    </g>
  );
}

/** A round table seen from above: its edge draws on from the top, its top filling as it does (`--d`). `tone` is the City's green or the plain navy. */
export function Table({ id, c, r, tone = "plain" }: { id: string; c: Point; r: number; tone?: "green" | "plain" }) {
  return <circle className={`md-table md-table--${tone}`} data-build={id} cx={c.x} cy={c.y} r={r} pathLength={1} transform={`rotate(-90 ${c.x} ${c.y})`} />;
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
        <rect className={`md-chair md-chair--${tone}`} x={-w / 2} y={-h / 2} width={w} height={h} rx={rx} />
        <path className={`md-chair__back md-chair__back--${tone}`} d={`M${-w / 2 + rx / 2} ${-h / 2 + 1}H${w / 2 - rx / 2}`} />
        {children}
      </g>
    </g>
  );
}

/** The head of a person seated in a chair, seen from above: a navy dot in the chair's middle. It sits down by showing. */
export function Sitter({ id, head }: { id: string; head: number }) {
  return <circle className="md-sitter" data-build={id} cx={0} cy={0} r={head} />;
}

/** A calendar page in green: two rings it hangs from, a header band and a grid of days. It comes up whole. */
export function Calendar({ id, at, header, rings, days }: { id: string; at: Box; header: number; rings: readonly number[]; days: readonly Box[] }) {
  return (
    <g data-build={id} className="md-calendar">
      <rect className="md-calendar__page" x={at.x} y={at.y} width={at.w} height={at.h} rx={10} />
      <path className="md-calendar__header" d={`M${at.x} ${at.y + header}V${at.y + 10}Q${at.x} ${at.y} ${at.x + 10} ${at.y}H${at.x + at.w - 10}Q${at.x + at.w} ${at.y} ${at.x + at.w} ${at.y + 10}V${at.y + header}Z`} />
      {days.map((day) => (
        <rect key={`${day.x} ${day.y}`} className="md-calendar__day" x={day.x} y={day.y} width={day.w} height={day.h} rx={3} />
      ))}
      {rings.map((x) => (
        <rect key={x} className="md-calendar__ring" x={x - 5} y={at.y - 14} width={10} height={26} rx={5} />
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
      <path className="md-tag" d={`M${x} ${y + h / 2}L${x + point} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + point}Z`} />
      <circle className="md-tag__hole" cx={x + point} cy={y + h / 2} r={hole} />
      <text className="dk-text md-word md-word--strong" x={words.x} y={words.y} dominantBaseline="central">
        {text}
      </text>
    </g>
  );
}

/**
 * A lantern hanging in a department's box: a ring, a cap and a rounded
 * body. Unlit it is a navy outline; it lights by filling green from the
 * bottom (`--k`), the light held inside its outline.
 */
export function Lantern({ id, at, size }: { id: string; at: Point; size: { w: number; h: number; rx: number; cap: number; ring: number } }) {
  const { w, h, rx, cap, ring } = size;
  const top = at.y - h / 2;
  return (
    <g data-build={id} className="md-lantern">
      <circle className="md-lantern__ring" cx={at.x} cy={top - cap - ring + 2} r={ring} />
      <rect className="md-lantern__cap" x={at.x - w / 2 + 5} y={top - cap} width={w - 10} height={cap} rx={2} />
      <rect className="md-lantern__light" x={at.x - w / 2} y={top} width={w} height={h} rx={rx} />
      <rect className="md-lantern__body" x={at.x - w / 2} y={top} width={w} height={h} rx={rx} />
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
      <path className="md-bubble" d={d} />
      <text className="dk-label md-word" x={x + w / 2} y={y + h / 2} textAnchor="middle" dominantBaseline="central">
        {text}
      </text>
    </g>
  );
}

/** The notebook page: white, a navy edge, its binding rings along its top, a rule under its heading's place and faint ruling for each line. */
export function Page({ id, at, rings, rule, ruled }: { id: string; at: Box; rings: readonly Point[]; rule: { y: number; x0: number; x1: number }; ruled: readonly number[] }) {
  return (
    <g data-build={id}>
      <rect className="md-page" x={at.x} y={at.y} width={at.w} height={at.h} rx={8} />
      {ruled.map((y) => (
        <path key={y} className="md-page__ruled" d={`M${rule.x0} ${y}H${rule.x1}`} />
      ))}
      <path className="md-page__rule" d={`M${rule.x0} ${rule.y}H${rule.x1}`} />
      {rings.map((ring) => (
        <rect key={ring.x} className="md-page__ring" x={ring.x - 5} y={ring.y - 14} width={10} height={26} rx={5} />
      ))}
    </g>
  );
}

/** A line of writing on the page: a thick rule drawing on from the left (`--d`). */
export function Writing({ id, x0, x1, y }: { id: string; x0: number; x1: number; y: number }) {
  return <path className="md-writing dk-draw" data-build={id} d={`M${x0} ${y}H${x1}`} pathLength={1} />;
}
