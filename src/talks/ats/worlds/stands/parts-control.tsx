/**
 * Slide 11a's own pieces: the card a member of staff carries, slide 11's
 * screen, the record whose lines draw in, and the magnifier the reviewer
 * holds. Their measures are in layout-control.ts; painted by
 * stands-control.css.
 */
"use client";

import type { Box, Point } from "@/components/deck/kit";
import { CARD, LEDGER, LENS, SCREEN } from "./layout-control";

/** A card: a small white page in a navy outline, three lines on it, the last shorter. It shows (`show`) and travels by `--x` and `--y` (`travel`). */
export function Card({ id, at }: { id: string; at: Box }) {
  const x0 = at.x + 9;
  return (
    <g className="dk-move sn-card" data-build={id}>
      <rect className="sn-card__page" x={at.x} y={at.y} width={CARD.w} height={CARD.h} rx={4} />
      <path className="sn-card__line" d={`M${x0} ${at.y + 14}H${at.x + CARD.w - 9}M${x0} ${at.y + 25}H${at.x + CARD.w - 9}M${x0} ${at.y + 36}H${at.x + CARD.w - 15}`} />
    </g>
  );
}

/** Slide 11's screen: the monitor, its neck and base drawing on as one (`draw`), white inside as it draws so a card passing behind it is hidden; the panel in it and the panel's three lines. */
export function Screen({ id, at }: { id: string; at: Box }) {
  const foot = at.y + at.h;
  const p = SCREEN.panel;
  return (
    <g className="sn-screen" data-build={id}>
      <rect className="sn-screen__frame dk-draw" x={at.x} y={at.y} width={at.w} height={at.h} rx={8} pathLength={1} />
      <path className="sn-screen__stand dk-draw" d={`M${at.x + 63} ${foot}V${foot + SCREEN.neck}M${at.x + SCREEN.base.dx} ${foot + SCREEN.neck}H${at.x + SCREEN.base.dx + SCREEN.base.w}`} pathLength={1} />
      <rect className="sn-screen__panel dk-draw" x={at.x + p.x} y={at.y + p.y} width={p.w} height={p.h} rx={4} pathLength={1} />
      <path className="sn-screen__line dk-draw" d={SCREEN.lines.map(([x, y, w]) => `M${at.x + x} ${at.y + y}h${w}`).join("")} pathLength={1} />
    </g>
  );
}

/** The record: a page drawing on (`draw`), white inside as it draws. Its lines are drawn by `LedgerLine`, each as its own part. */
export function Ledger({ id, at }: { id: string; at: Box }) {
  return <rect className="sn-ledger dk-draw" data-build={id} x={at.x} y={at.y} width={LEDGER.w} height={LEDGER.h} rx={6} pathLength={1} />;
}

/** One line in the record, drawing in from its left (`draw`). */
export function LedgerLine({ id, d }: { id: string; d: string }) {
  return <path className="sn-ledger__line dk-draw" data-build={id} d={d} pathLength={1} />;
}

/** The magnifier: a lens in a navy rim and a handle down to its lower right. It shows (`show`) and travels by `--x` and `--y` (`travel`). */
export function Magnifier({ id, at }: { id: string; at: Point }) {
  const k = LENS.r / Math.SQRT2;
  return (
    <g className="dk-move sn-lens" data-build={id}>
      <circle className="sn-lens__glass" cx={at.x} cy={at.y} r={LENS.r} />
      <path className="sn-lens__handle" d={`M${at.x + k} ${at.y + k}l${LENS.handle * 0.7} ${LENS.handle * 0.7}`} />
    </g>
  );
}

/** A route: a navy line drawing on from its first point (`draw`). */
export function Route({ id, d }: { id: string; d: string }) {
  return <path className="sn-route dk-draw" data-build={id} d={d} pathLength={1} />;
}
