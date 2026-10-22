/**
 * Slide 22's own drawings: a staff figure in the City's green, the three
 * things the figures work with, in navy, and the practice ring with its
 * stops and arrowheads, which all draw on with the part they sit in (`--d`).
 * The card rides the ring by `--r`, in laps, turning about the ring's middle
 * and back about its own so it stays upright. Colours are in first-plan.css.
 */
"use client";

import type { CSSProperties } from "react";
import type { Box, Point } from "@/components/deck/kit";
import type { PropKind } from "./layout-level-up";
import { Card } from "./parts-plan";

/** A staff figure filling its box: a round head over rounded shoulders, its feet on the box's foot. */
export function StaffFigure({ at }: { at: Box }) {
  const { x, y, w, h } = at;
  const r = w / 4;
  const shoulder = y + h * 0.69;
  return (
    <g className="fs-staff">
      <circle className="dk-draw" cx={x + w / 2} cy={y + r + 2} r={r} pathLength={1} />
      <path className="dk-draw" d={`M${x + 4} ${y + h}V${shoulder}A${w / 2 - 4} ${h * 0.26} 0 0 1 ${x + w - 4} ${shoulder}V${y + h}`} pathLength={1} />
    </g>
  );
}

/** What a figure works with, filling its box, its foot on the box's foot: a screen showing a tool, a checklist held up, a board with a small system drawn on it. */
export function Prop({ kind, at }: { kind: PropKind; at: Box }) {
  const { x, y, w, h } = at;
  const foot = y + h;
  if (kind === "screen")
    return (
      <g className="fs-prop">
        <rect className="fs-prop__face dk-draw" x={x} y={y + 14} width={w} height={74} rx={6} pathLength={1} />
        <rect className="dk-draw" x={x + 10} y={y + 24} width={w - 20} height={54} rx={3} pathLength={1} />
        <path className="dk-draw" d={`M${x + w / 2} ${y + 88}V${foot}M${x + w / 2 - 26} ${foot}H${x + w / 2 + 26}`} pathLength={1} />
      </g>
    );
  if (kind === "checklist")
    return (
      <g className="fs-prop">
        <rect className="fs-prop__face dk-draw" x={x} y={y + 16} width={w} height={96} rx={6} pathLength={1} />
        <rect className="fs-prop__face dk-draw" x={x + w / 2 - 16} y={y + 8} width={32} height={14} rx={3} pathLength={1} />
        {[38, 62, 86].map((row) => (
          <g key={row}>
            <rect className="dk-draw" x={x + 12} y={y + row} width={14} height={14} rx={2} pathLength={1} />
            <path className="dk-draw" d={`M${x + 34} ${y + row + 7}H${x + w - 12}`} pathLength={1} />
          </g>
        ))}
      </g>
    );
  const nodes: Point[] = [
    { x: x + 30, y: y + 32 },
    { x: x + w - 30, y: y + 32 },
    { x: x + w / 2, y: y + 68 },
  ];
  return (
    <g className="fs-prop">
      <rect className="fs-prop__face dk-draw" x={x} y={y + 8} width={w} height={84} rx={4} pathLength={1} />
      <path className="dk-draw" d={`M${x + 18} ${y + 92}L${x + 8} ${foot}M${x + w - 18} ${y + 92}L${x + w - 8} ${foot}`} pathLength={1} />
      <path className="dk-draw" d={`M${nodes[0].x + 9} ${nodes[0].y}H${nodes[1].x - 9}M${nodes[0].x + 6} ${nodes[0].y + 7}L${nodes[2].x - 6} ${nodes[2].y - 7}M${nodes[1].x - 6} ${nodes[1].y + 7}L${nodes[2].x + 6} ${nodes[2].y - 7}`} pathLength={1} />
      {nodes.map((node) => (
        <circle key={`${node.x} ${node.y}`} className="fs-prop__face dk-draw" cx={node.x} cy={node.y} r={9} pathLength={1} />
      ))}
    </g>
  );
}

/** The line the figures stand on. It draws on (`draw`). */
export function Ground({ id, from, to }: { id: string; from: Point; to: Point }) {
  return <path className="fs-ground dk-draw" data-build={id} d={`M${from.x} ${from.y}L${to.x} ${to.y}`} pathLength={1} />;
}

/** A mark on the ring that comes in as the ring's drawing front passes it, `at` laps from the top. */
const passed = (at: number) => ({ "--at": at }) as CSSProperties;

/** The practice ring: its line draws on clockwise from the top (`draw`), each stop's dot and each arrowhead coming in as the line reaches it. */
export function Ring({ id, d, stops, arrows }: { id: string; d: string; stops: readonly { point: Point; arrives: number }[]; arrows: readonly { at: number; d: string }[] }) {
  return (
    <g className="fs-ring" data-build={id}>
      <path className="fs-ring__line dk-draw" d={d} pathLength={1} />
      {arrows.map((arrow) => (
        <path key={arrow.at} className="fs-ring__mark fs-ring__arrow" d={arrow.d} style={passed(arrow.at)} />
      ))}
      {stops.map((stop) => (
        <circle key={stop.arrives} className="fs-ring__mark fs-ring__stop" cx={stop.point.x} cy={stop.point.y} r={8} style={passed(stop.arrives)} />
      ))}
    </g>
  );
}

/** The card on the ring: it shows (`show`) at the top and rides round by `--r`, turning about `pivot` and back about its own middle, `own`, so it never tilts. */
export function RidingCard({ id, at, pivot, own }: { id: string; at: Box; pivot: Point; own: Point }) {
  return (
    <g className="fs-orbit" data-build={id} style={{ transformOrigin: `${pivot.x}px ${pivot.y}px` }}>
      <g className="fs-orbit__card" style={{ transformOrigin: `${own.x}px ${own.y}px` }}>
        <Card at={at} />
      </g>
    </g>
  );
}
