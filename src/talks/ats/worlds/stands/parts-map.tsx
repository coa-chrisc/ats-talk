/**
 * The department map's pieces the stands world draws (department-map.ts
 * gives their numbers): the lit window in a department's box (slides 12
 * and 15); slide 11's dashed plate of what is still to establish, its name
 * and caption set inside it; slide 15's agent, the two-dot hexagon of
 * slide 14; and the gate, slide 10's hurdle with green posts and its bars
 * across, closed (11a and 15) or opening (11a); and slide 17's round table,
 * empty, in grey dashes (12). Script-free: every word is passed in. Painted
 * by stands.css.
 */
"use client";

import { Dashed, type Box, type Point } from "@/components/deck/kit";
import { AGENT, PLATE, TABLE, WINDOW, gatePaths, tableSeats } from "../department-map";

/** A window in a department's box: the box's soft green wash and the window's green square, both coming up as it lights (`fill`; `fill` to `WINDOW.faint` lights it faintly). */
export function LitWindow({ id, cell, at, rx }: { id: string; cell: Box; at: Box; rx: number }) {
  return (
    <g className="sn-window" data-build={id}>
      <rect className="sn-window__wash" x={cell.x} y={cell.y} width={cell.w} height={cell.h} rx={rx} />
      <rect className="sn-window__light" x={at.x} y={at.y} width={at.w} height={at.h} rx={at.w * WINDOW.rx} />
    </g>
  );
}

/** An empty dashed plate in the grey of what is not yet in place, its name over its caption inside the dashes. It wipes on from the left (`wipe`). */
export function DashedPlate({ id, at, name, caption }: { id: string; at: Box; name: string; caption?: string }) {
  return (
    <Dashed id={id} at={at} rx={PLATE.rx} tone="soft">
      <span className="sn-plate-words" style={{ width: at.w - 2 * PLATE.inset }}>
        <span className="sn-plate-words__name">{name}</span>
        {caption && <span className="sn-plate-words__caption">{caption}</span>}
      </span>
    </Dashed>
  );
}

/** An agent: a white hexagon in a navy edge, two green eyes and a mouth, its top point at `at`. It lands as one part (`land`). */
export function Agent({ id, at, scale }: { id: string; at: Point; scale: number }) {
  const k = scale;
  const mid = at.y + (AGENT.h * k) / 2;
  return (
    <g className="sn-agent" data-build={id}>
      <path className="sn-agent__body" d={`M${at.x} ${at.y}l${35 * k} ${20 * k}v${49 * k}l${-35 * k} ${20 * k}l${-35 * k} ${-20 * k}v${-49 * k}z`} />
      <circle className="sn-agent__eye" cx={at.x - 12 * k} cy={mid - 3.5 * k} r={4 * k} />
      <circle className="sn-agent__eye" cx={at.x + 12 * k} cy={mid - 3.5 * k} r={4 * k} />
      <path className="sn-agent__mouth" d={`M${at.x - 15 * k} ${mid + 16.5 * k}h${30 * k}`} />
    </g>
  );
}

/** A gate standing on a line at `foot`: its two posts in green, its bars across them in navy. It lands as one part (`land`); an opening gate is a boom barrier: both bars swing up together about the left post until they stand upright over it as one boom, the right post left standing alone (`open`). */
export function ClosedGate({ id, foot, scale, opens = false }: { id: string; foot: Point; scale: number; opens?: boolean }) {
  const gate = gatePaths(foot, scale);
  return (
    <g className="sn-closed-gate" data-build={id}>
      {opens ? (
        gate.arms.map((arm) => <path key={arm} className="sn-closed-gate__bar sn-closed-gate__arm" d={arm} />)
      ) : (
        <path className="sn-closed-gate__bar" d={gate.bars} />
      )}
      <path className="sn-closed-gate__post" d={gate.posts} />
    </g>
  );
}

/** An empty round table seen from above, slide 17's, every measure times `scale`: its top and its chairs in grey dashes, each chair facing it. HTML holding its own SVG, as a dashed edge cannot draw on: it wipes on (`wipe`). */
export function EmptyTable({ id, c, scale, reach }: { id: string; c: Point; scale: number; reach: number }) {
  const side = 2 * (reach + 4);
  const origin = { x: side / 2, y: side / 2 };
  const seat = { w: TABLE.seat.w * scale, h: TABLE.seat.h * scale, rx: TABLE.seat.rx * scale };
  return (
    <div className="sn-table dk-wipe" data-build={id} style={{ left: c.x - side / 2, top: c.y - side / 2, width: side, height: side }}>
      <svg width={side} height={side} viewBox={`0 0 ${side} ${side}`} aria-hidden="true">
        <circle cx={origin.x} cy={origin.y} r={TABLE.r * scale} />
        {tableSeats(origin, scale).map(({ at, deg }) => (
          <rect key={deg} x={at.x - seat.w / 2} y={at.y - seat.h / 2} width={seat.w} height={seat.h} rx={seat.rx} transform={`rotate(${deg} ${at.x} ${at.y})`} />
        ))}
      </svg>
    </div>
  );
}
