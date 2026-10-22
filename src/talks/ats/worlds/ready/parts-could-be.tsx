/**
 * Slide 27's own drawings: a dashed plate of what is still to establish,
 * its name inside it; and a request's card, a white face in a light edge
 * holding a miniature of the slide that brought its idea in (slide 19's
 * round table, slide 21's table with a speech bubble, slide 24's four
 * bands, slide 13's fence, slide 14's record and key, and a ledger page),
 * its name beside it and its caption under both. The miniatures are drawn
 * from the same shapes as their slides, small. Script-free: every word is
 * passed in. SVG for the plane's marks but the plate, which is HTML so it
 * wipes on (ready.css paints them).
 */
"use client";

import type { ReactNode } from "react";
import { Dashed, box, type Box, type Point } from "@/components/deck/kit";
import { FENCE, PLATE, fencePickets } from "../department-map";
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
function RowWords({ words, weight, tone }: { words: Rows; weight: "strong" | "light"; tone: "navy" | "soft" }) {
  return (
    <text className={`dk-label rd-word rd-word--${tone} rd-word--${weight}`} dominantBaseline="central">
      {words.rows.map((row, i) => (
        <tspan key={i} x={words.at.x} y={words.at.y + i * CARD.pitch}>
          {i < words.rows.length - 1 ? `${row} ` : row}
        </tspan>
      ))}
    </text>
  );
}

/** A request's card: its face, its miniature at its top left, its name beside the miniature in navy semibold, and its caption under both in the light weight and the secondary grey. It lands as one part. */
export function RequestCard({ id, at, kind, mini, name, caption }: { id: string; at: Box; kind: Miniature; mini: Box; name: Rows; caption: Rows }) {
  return (
    <g className="rd-request" data-build={id}>
      <rect className="rd-request__face" x={at.x} y={at.y} width={at.w} height={at.h} rx={10} />
      <MiniatureOf kind={kind} at={mini} />
      <RowWords words={name} weight="strong" tone="navy" />
      <RowWords words={caption} weight="light" tone="soft" />
    </g>
  );
}

/** The empty rings before the requests' names, grey and dashed, a row of the name across: a mark not yet made, which only the room can fill. Nine dashes round each, whatever its size (`pathLength`). They come up together. */
export function EmptyRings({ id, at }: { id: string; at: readonly Point[] }) {
  return (
    <g className="rd-pending" data-build={id}>
      {at.map((c) => (
        <circle key={`${c.x} ${c.y}`} className="rd-pending__ring" cx={c.x} cy={c.y} r={CARD.ring} pathLength={45} />
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

/** Slide 19's round table, seen from above, six chairs round it, across the miniature's width. */
function RoundTable(at: Box) {
  const c = { x: at.x + at.w / 2, y: at.y + at.h / 2 };
  return (
    <>
      <circle className="rd-mini__table" cx={c.x} cy={c.y} r={20} />
      {chairsRound(c, 30, 6, -90).map((seat) => (
        <Chair key={`${seat.x} ${seat.y}`} c={seat} toward={c} w={13} />
      ))}
    </>
  );
}

/** Slide 21's table with three chairs at it, and over it a speech bubble, its tail toward the table, two lines of speech in it. */
function Listening(at: Box) {
  const b = box(at.x + 1, at.y + 6, at.w - 2, 38);
  const c = { x: at.x + at.w / 2, y: at.y + 90 };
  return (
    <>
      <path className="rd-mini__bubble" d={`M${b.x + 8} ${b.y}H${b.x + b.w - 8}Q${b.x + b.w} ${b.y} ${b.x + b.w} ${b.y + 8}V${b.y + b.h - 8}Q${b.x + b.w} ${b.y + b.h} ${b.x + b.w - 8} ${b.y + b.h}H${b.x + 30}L${b.x + 18} ${b.y + b.h + 12}L${b.x + 18} ${b.y + b.h}H${b.x + 8}Q${b.x} ${b.y + b.h} ${b.x} ${b.y + b.h - 8}V${b.y + 8}Q${b.x} ${b.y} ${b.x + 8} ${b.y}Z`} />
      <path className="rd-mini__speech" d={`M${b.x + 11} ${b.y + 13}H${b.x + b.w - 11}M${b.x + 11} ${b.y + 25}H${b.x + b.w - 26}`} />
      <circle className="rd-mini__table" cx={c.x} cy={c.y} r={15} />
      {chairsRound(c, 24, 3, 90).map((seat) => (
        <Chair key={`${seat.x} ${seat.y}`} c={seat} toward={c} />
      ))}
    </>
  );
}

/** Slide 24's four bands, stacked in their levels' hues down the miniature's height, each with its solid cap at its left end. */
function Bands(at: Box) {
  const h = 22;
  const pitch = (at.h - h) / 3;
  return (
    <>
      {LEVELS.bands.map((band, i) => (
        <g key={band.key} className="rd-mini-band" data-hue={band.hue}>
          <rect className="rd-mini-band__body" x={at.x} y={at.y + i * pitch} width={at.w} height={h} rx={3} />
          <rect className="rd-mini-band__cap" x={at.x} y={at.y + i * pitch} width={6} height={h} rx={2} />
        </g>
      ))}
    </>
  );
}

/** The deck's fenced yard, small: the green yard inside its rail, about square in the miniature's middle and 72 across, its pickets at half size over the top rail, from department-map.ts's numbers. */
function Yard(at: Box) {
  const y = box(at.x + 2, at.y + 26, at.w - 4, at.h - 52);
  return (
    <>
      <rect className="rd-mini__yard" x={y.x} y={y.y} width={y.w} height={y.h} rx={FENCE.rx} />
      <rect className="rd-mini__rail" x={y.x} y={y.y} width={y.w} height={y.h} rx={FENCE.rx} />
      {fencePickets(y, 0.5).pickets.map((picket) => (
        <path key={picket.x} className="rd-mini__picket" d={picket.d} />
      ))}
    </>
  );
}

/** Slide 14's record and key: a page with three lines, the key under it. */
function RecordKey(at: Box) {
  const p = box(at.x + 14, at.y + 4, 48, 64);
  const k = { x: at.x + 16, y: at.y + 98 };
  return (
    <>
      <path className="rd-mini__line" d={`M${p.x} ${p.y}h${p.w}v${p.h}h${-p.w}z${[18, 31, 44].map((dy) => `M${p.x + 10} ${p.y + dy}h${p.w - 20}`).join("")}`} />
      <circle className="rd-mini__line" cx={k.x} cy={k.y} r={11} />
      <path className="rd-mini__line" d={`M${k.x + 11} ${k.y}H${at.x + at.w - 4}v12M${at.x + at.w - 18} ${k.y}v9`} />
    </>
  );
}

/** A ledger page: a heading rule, three rows entered, each an item and its amount, and under them an empty row in grey dashes, the line not yet entered. */
function Ledger(at: Box) {
  const p = box(at.x + 2, at.y + 2, at.w - 4, at.h - 4);
  const head = p.y + 22;
  const rows = [0, 1, 2].map((i) => head + 16 + i * 20);
  const amounts = p.x + p.w - 24;
  return (
    <>
      <rect className="rd-mini__page" x={p.x} y={p.y} width={p.w} height={p.h} rx={4} />
      <path className="rd-mini__head" d={`M${p.x} ${head}H${p.x + p.w}`} />
      <path className="rd-mini__entry" d={rows.map((y) => `M${p.x + 9} ${y}H${amounts - 8}M${amounts} ${y}H${p.x + p.w - 9}`).join("")} />
      <rect className="rd-mini__empty" x={p.x + 6} y={rows[2] + 13} width={p.w - 12} height={22} rx={3} />
    </>
  );
}
