/**
 * The pieces of slides 14 and 17: a chair at the table and the figure who
 * sits in it; the round table, seen from above; a speech bubble; the notebook
 * page and its lines; a bar of time; and a finished tool and what it
 * shows. SVG for the plane's marks, moved with the house
 * moves only (method.css paints them).
 */
"use client";

import type { Box, Point } from "@/components/deck/kit";
import type { ToolKind } from "./layout-plain-tool";
import { FIGURE } from "./layout-listen";

/**
 * A chair at the table and the figure who sits in it, upright: the chair's
 * back and seat in grey, then the figure, a head over a pair of shoulders,
 * drawing on in navy and filling as they sit (`--d` on the sitter). The
 * chair shows empty first.
 */
export function Seat({ id, sitter, at }: { id: string; sitter: string; at: Point }) {
  const { back, seat, head, shoulders } = FIGURE;
  const half = shoulders.w / 2;
  const curve = shoulders.foot - shoulders.top - 8;
  return (
    <g data-build={id}>
      <g transform={`translate(${at.x} ${at.y})`}>
        <rect className="method-chair" x={back.x} y={back.y} width={back.w} height={back.h} rx={back.rx} />
        <rect className="method-chair method-chair__seat" x={seat.x} y={seat.y} width={seat.w} height={seat.h} rx={seat.rx} />
        <g className="method-sitter" data-build={sitter}>
          <path className="dk-draw" d={`M${-half} ${shoulders.foot}V${shoulders.top + curve}A${half} ${curve} 0 0 1 ${half} ${shoulders.top + curve}V${shoulders.foot}Z`} pathLength={1} />
          <circle className="dk-draw" cx={0} cy={head.y} r={head.r} pathLength={1} transform={`rotate(-90 0 ${head.y})`} />
        </g>
      </g>
    </g>
  );
}

/** The round table, seen from above: its edge draws on from the top, its top coming in as it does (`--d`). */
export function Table({ id, c, r }: { id: string; c: Point; r: number }) {
  return <circle className="method-table" data-build={id} cx={c.x} cy={c.y} r={r} pathLength={1} transform={`rotate(-90 ${c.x} ${c.y})`} />;
}

/** A speech bubble round a question, its tail, when it has one, pointing down from `tail.base` to `tail.tip`. */
export function Bubble({ id, at, text, tail }: { id: string; at: Box; text: string; tail?: { base: number; tip: Point } }) {
  const r = 18;
  const { x, y, w, h } = at;
  const foot = y + h;
  const half = 12;
  const left = tail ? Math.min(tail.base, tail.tip.x + half) - half : 0;
  const right = left + 2 * half;
  const d = [
    `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${foot - r}Q${x + w} ${foot} ${x + w - r} ${foot}`,
    tail ? `H${right}L${tail.tip.x} ${tail.tip.y}L${left} ${foot}` : "",
    `H${x + r}Q${x} ${foot} ${x} ${foot - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`,
  ].join("");
  return (
    <g data-build={id}>
      <path className="method-bubble" d={d} />
      <text className="dk-text method-word" x={x + w / 2} y={y + h / 2} textAnchor="middle" dominantBaseline="central">
        {text}
      </text>
    </g>
  );
}

/** The notebook page: white, a navy edge, its binding rings along its top and a rule under its heading's place, with faint ruled lines to write on. */
export function Page({ id, at, rings, rule, ruled }: { id: string; at: Box; rings: readonly Point[]; rule: { y: number; x0: number; x1: number }; ruled: readonly number[] }) {
  return (
    <g data-build={id}>
      <rect className="method-page" x={at.x} y={at.y} width={at.w} height={at.h} rx={8} />
      {ruled.map((y) => (
        <path key={y} className="method-page__ruled" d={`M${rule.x0} ${y}H${rule.x1}`} />
      ))}
      <path className="method-page__rule" d={`M${rule.x0} ${rule.y}H${rule.x1}`} />
      {rings.map((ring) => (
        <rect key={ring.x} className="method-page__ring" x={ring.x - 5} y={ring.y - 14} width={10} height={26} rx={5} />
      ))}
    </g>
  );
}

/** A line of writing on the page, filling in from the left (`--k`). */
export function Writing({ id, at }: { id: string; at: Box }) {
  return <rect className="method-writing" data-build={id} x={at.x} y={at.y} width={at.w} height={at.h} rx={at.h / 2} />;
}

/** A bar of time, drawing out from its left end (`--k`): how long the work took then, in grey, or takes now, in green. */
export function Bar({ id, at, tone }: { id: string; at: Box; tone: "then" | "now" }) {
  return <rect className={`method-bar method-bar--${tone}`} data-build={id} x={at.x} y={at.y} width={at.w} height={at.h} rx={8} />;
}

/** A finished tool's edge, drawing on round it (`--d`), and its face filling solid (`--k`). */
export function Built({ id, at }: { id: string; at: Box }) {
  return (
    <g className="method-built" data-build={id}>
      <rect className="method-built__face" x={at.x} y={at.y} width={at.w} height={at.h} rx={8} />
      <rect className="method-built__edge dk-draw" x={at.x} y={at.y} width={at.w} height={at.h} rx={8} pathLength={1} />
    </g>
  );
}

/** What a finished tool shows, in navy and no words: a dashboard's tiles and bars, a pipeline's stages joined in a line, an analysis's points and the line through them. */
export function Inside({ id, at, kind }: { id: string; at: Box; kind: ToolKind }) {
  const { x, y, w, h } = at;
  const pad = 28;
  /** A dashboard's tallest bar: its foot a pad above the tool's, its top 16 under the tiles. */
  const tall = h - 2 * pad - 58 - 16;
  return (
    <g className="method-inside" data-build={id}>
      {kind === "dashboard" && (
        <>
          <rect x={x + pad} y={y + pad} width={(w - 3 * pad) / 2} height={58} rx={6} />
          <rect x={x + pad + (w - 3 * pad) / 2 + pad} y={y + pad} width={(w - 3 * pad) / 2} height={58} rx={6} />
          <path className="method-inside__thick" d={`M${x + pad + 18} ${y + pad + 38}h60M${x + w / 2 + pad / 2 + 18} ${y + pad + 38}h40`} />
          {[0.45, 0.75, 0.35, 0.95, 0.6, 0.8].map((k, i) => (
            <rect key={i} className="method-inside__solid" x={x + pad + i * 46} y={y + h - pad - tall * k} width={28} height={tall * k} rx={3} />
          ))}
        </>
      )}
      {kind === "pipeline" && (
        <>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={x + pad + i * 104} y={y + h / 2 - 34} width={72} height={68} rx={8} />
          ))}
          <path className="method-inside__thick" d={`M${x + pad + 72} ${y + h / 2}h32M${x + pad + 176} ${y + h / 2}h32`} />
          <path d={`M${x + pad + 96} ${y + h / 2 - 8}l8 8l-8 8M${x + pad + 200} ${y + h / 2 - 8}l8 8l-8 8`} />
          {[0, 1, 2].map((i) => (
            <path key={`r${i}`} className="method-inside__thick" d={`M${x + pad + i * 104 + 16} ${y + h / 2 - 10}h40M${x + pad + i * 104 + 16} ${y + h / 2 + 10}h28`} />
          ))}
        </>
      )}
      {kind === "analysis" && (
        <>
          <path d={`M${x + pad} ${y + pad}V${y + h - pad}H${x + w - pad}`} />
          {[
            [0.1, 0.2],
            [0.22, 0.3],
            [0.3, 0.24],
            [0.42, 0.46],
            [0.52, 0.4],
            [0.62, 0.6],
            [0.7, 0.54],
            [0.82, 0.74],
            [0.9, 0.7],
          ].map(([fx, fy]) => (
            <circle key={fx} className="method-inside__solid" cx={x + pad + fx * (w - 2 * pad)} cy={y + h - pad - fy * (h - 2 * pad)} r={7} />
          ))}
          <path className="method-inside__thick" d={`M${x + pad + 12} ${y + h - pad - 0.14 * (h - 2 * pad)}L${x + w - pad - 8} ${y + h - pad - 0.82 * (h - 2 * pad)}`} />
        </>
      )}
    </g>
  );
}
