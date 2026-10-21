/**
 * Slide 27's own drawings: a dashed plate of what is still to establish,
 * its name inside it; and a request's card, a white face in a light edge
 * holding a miniature of the slide that brought its idea in (slide 19's
 * round table, slide 21's table with a speech bubble, slide 24's four
 * bands, slide 13's fence, slide 14's record and key, and a ledger's row),
 * its name and caption under it. The miniatures are drawn from the same
 * proportions as their slides, small. Script-free: every word is passed
 * in. SVG for the plane's marks but the plate, which is HTML so it wipes on
 * (ready.css paints them).
 */
"use client";

import type { ReactNode } from "react";
import { Dashed, box, type Box, type Point } from "@/components/deck/kit";
import { FENCE, PLATE, fencePosts } from "../department-map";
import { CARD, type Miniature } from "./layout-could-be";
import { LEVELS } from "./layout-levels";

/** An empty dashed plate in the grey of what is not yet in place, its name inside the dashes. It wipes on from the left (`wipe`). */
export function GapPlate({ id, at, name }: { id: string; at: Box; name: string }) {
  return (
    <Dashed id={id} at={at} rx={PLATE.rx} tone="soft">
      <span className="rd-gap__name" style={{ width: at.w - 2 * PLATE.inset }}>
        {name}
      </span>
    </Dashed>
  );
}

type Rows = { rows: readonly string[]; at: Point };

/** Words on several rows, one `<text>`, each row a run on its own baseline, a space kept at each break so the runs read as the one phrase. */
function RowWords({ words, strong, tone }: { words: Rows; strong?: boolean; tone: "navy" | "soft" }) {
  return (
    <text className={`dk-label rd-word rd-word--${tone}${strong ? " rd-word--strong" : ""}`} dominantBaseline="central">
      {words.rows.map((row, i) => (
        <tspan key={i} x={words.at.x} y={words.at.y + i * CARD.pitch}>
          {i < words.rows.length - 1 ? `${row} ` : row}
        </tspan>
      ))}
    </text>
  );
}

/** A request's card: its face, its miniature in the band at its top left, its name and caption under it. It lands as one part. */
export function RequestCard({ id, at, kind, mini, name, caption }: { id: string; at: Box; kind: Miniature; mini: Box; name: Rows; caption: Rows }) {
  return (
    <g className="rd-request" data-build={id}>
      <rect className="rd-request__face" x={at.x} y={at.y} width={at.w} height={at.h} rx={10} />
      <MiniatureOf kind={kind} at={mini} />
      <RowWords words={name} strong tone="navy" />
      <RowWords words={caption} tone="soft" />
    </g>
  );
}

/** The empty rings beside the cards, grey and dashed, the orange mark's size: what only the room can fill. They come up together. */
export function EmptyRings({ id, at }: { id: string; at: readonly Point[] }) {
  return (
    <g className="rd-pending" data-build={id}>
      {at.map((c) => (
        <circle key={`${c.x} ${c.y}`} className="rd-pending__ring" cx={c.x} cy={c.y} r={CARD.ring} />
      ))}
    </g>
  );
}

function MiniatureOf({ kind, at }: { kind: Miniature; at: Box }) {
  const draw: Record<Miniature, (at: Box) => ReactNode> = { table: RoundTable, listening: Listening, levels: Bands, fence: Yard, record: RecordKey, ledger: Ledger };
  return <g className="rd-mini">{draw[kind](at)}</g>;
}

/** A chair seen from above at `c`, turned to face the table at `toward`: a rounded seat and a heavier back on its far side. */
function Chair({ c, toward, w = 12, h = 10 }: { c: Point; toward: Point; w?: number; h?: number }) {
  const deg = (Math.atan2(toward.y - c.y, toward.x - c.x) * 180) / Math.PI - 90;
  return (
    <g transform={`translate(${c.x} ${c.y}) rotate(${deg})`}>
      <rect className="rd-mini__chair" x={-w / 2} y={-h / 2} width={w} height={h} rx={3} />
      <path className="rd-mini__back" d={`M${-w / 2 + 2} ${-h / 2}H${w / 2 - 2}`} />
    </g>
  );
}

/** Chairs evenly round a table, the first at `start` degrees (0 to the right, clockwise). */
const chairsRound = (c: Point, reach: number, count: number, start: number) =>
  Array.from({ length: count }, (_, i) => {
    const a = ((start + (i * 360) / count) * Math.PI) / 180;
    return { x: Math.round(c.x + reach * Math.cos(a)), y: Math.round(c.y + reach * Math.sin(a)) };
  });

/** Slide 19's round table, seen from above, six chairs round it. */
function RoundTable(at: Box) {
  const c = { x: at.x + 44, y: at.y + at.h / 2 };
  return (
    <>
      <circle className="rd-mini__table" cx={c.x} cy={c.y} r={17} />
      {chairsRound(c, 27, 6, -90).map((seat) => (
        <Chair key={`${seat.x} ${seat.y}`} c={seat} toward={c} />
      ))}
    </>
  );
}

/** Slide 21's table with three chairs at it and a speech bubble over it, two lines of speech in it. */
function Listening(at: Box) {
  const c = { x: at.x + 32, y: at.y + 34 };
  const b = box(at.x + 66, at.y, 76, 34);
  return (
    <>
      <circle className="rd-mini__table" cx={c.x} cy={c.y} r={14} />
      {chairsRound(c, 23, 3, 90).map((seat) => (
        <Chair key={`${seat.x} ${seat.y}`} c={seat} toward={c} />
      ))}
      <path className="rd-mini__bubble" d={`M${b.x + 8} ${b.y}H${b.x + b.w - 8}Q${b.x + b.w} ${b.y} ${b.x + b.w} ${b.y + 8}V${b.y + b.h - 8}Q${b.x + b.w} ${b.y + b.h} ${b.x + b.w - 8} ${b.y + b.h}H${b.x + 24}L${b.x + 6} ${b.y + b.h + 12}L${b.x + 12} ${b.y + b.h}H${b.x + 8}Q${b.x} ${b.y + b.h} ${b.x} ${b.y + b.h - 8}V${b.y + 8}Q${b.x} ${b.y} ${b.x + 8} ${b.y}Z`} />
      <path className="rd-mini__speech" d={`M${b.x + 12} ${b.y + 12}H${b.x + b.w - 12}M${b.x + 12} ${b.y + 22}H${b.x + b.w - 30}`} />
    </>
  );
}

/** Slide 24's four bands, stacked in their levels' hues, each with its solid cap at its left end. */
function Bands(at: Box) {
  return (
    <>
      {LEVELS.bands.map((band, i) => (
        <g key={band.key} className="rd-mini-band" data-hue={band.hue}>
          <rect className="rd-mini-band__body" x={at.x} y={at.y + 2 + i * 14} width={140} height={10} rx={3} />
          <rect className="rd-mini-band__cap" x={at.x} y={at.y + 2 + i * 14} width={5} height={10} rx={2} />
        </g>
      ))}
    </>
  );
}

/** Slide 13's fenced yard, small: the green yard inside its rail, posts along it at half the fence's pitch. */
function Yard(at: Box) {
  const y = box(at.x + 4, at.y + 10, 136, 38);
  const over = FENCE.overhang * 0.6;
  return (
    <>
      <rect className="rd-mini__yard" x={y.x} y={y.y} width={y.w} height={y.h} rx={FENCE.rx} />
      <rect className="rd-mini__rail" x={y.x} y={y.y} width={y.w} height={y.h} rx={FENCE.rx} />
      {fencePosts(y.x, y.w, FENCE.postPitch / 2).map((x) => (
        <path key={x} className="rd-mini__post" d={`M${x} ${y.y - over}V${y.y + over}M${x} ${y.y + y.h - over}V${y.y + y.h + over}`} />
      ))}
    </>
  );
}

/** Slide 14's record and key, larger: a page with three lines, and the key beside it. */
function RecordKey(at: Box) {
  const p = box(at.x + 8, at.y + 3, 38, 50);
  const k = { x: at.x + 82, y: at.y + 28 };
  return (
    <>
      <path className="rd-mini__line" d={`M${p.x} ${p.y}h${p.w}v${p.h}h${-p.w}z${[14, 24, 34].map((dy) => `M${p.x + 9} ${p.y + dy}h${p.w - 18}`).join("")}`} />
      <circle className="rd-mini__line" cx={k.x} cy={k.y} r={11} />
      <path className="rd-mini__line" d={`M${k.x + 11} ${k.y}h32v11M${k.x + 31} ${k.y}v8`} />
    </>
  );
}

/** A ledger's row in grey, not yet entered: a header rule over a raised row in three columns, a faint rule under it. */
function Ledger(at: Box) {
  const r = box(at.x, at.y + 16, 150, 26);
  return (
    <>
      <path className="rd-mini__head" d={`M${r.x} ${r.y - 8}H${r.x + r.w}`} />
      <rect className="rd-mini__row" x={r.x} y={r.y} width={r.w} height={r.h} rx={3} />
      <path className="rd-mini__divider" d={`M${r.x + 50} ${r.y}v${r.h}M${r.x + 100} ${r.y}v${r.h}M${r.x} ${r.y + r.h + 10}H${r.x + r.w}`} />
    </>
  );
}
