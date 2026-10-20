/**
 * The ideas world's drawings: a floor; a block that grows up from it; a
 * small walking figure; an arrow that draws on; a hammer outline that
 * fills; a balance's post, beam and pans; a box with a blank tag; a dial
 * and its needle; a step with a gate on its tread; a small project box. SVG
 * for the plane's marks, moved with the house moves only (ideas.css paints
 * them). Script-free: the one word set here, a step's name, is passed in.
 */
"use client";

import type { ReactNode } from "react";
import type { Box, Point } from "@/components/deck/kit";

/** A floor line, drawing on from its left (`--d`). */
export function Floor({ id, y, x0, x1 }: { id: string; y: number; x0: number; x1: number }) {
  return <path className="id-floor dk-draw" data-build={id} d={`M${x0} ${y}H${x1}`} pathLength={1} />;
}

/** A block standing on the floor, growing up from its foot (`--k`): grey-blue face, navy edge. */
export function Block({ id, at }: { id: string; at: Box }) {
  return <rect className="id-block" data-build={id} x={at.x} y={at.y} width={at.w} height={at.h} />;
}

/**
 * A small figure in the process green: a head over a body, standing in its
 * box with its feet on the box's foot. It travels by `--x` and `--y` (the
 * kit's `dk-move`), so a walk and a step up are plain numbers.
 */
export function Walker({ id, at }: { id: string; at: Box }) {
  const cx = at.x + at.w / 2;
  const r = at.w * 0.28;
  const head = at.y + r;
  const top = head + r + 4;
  const foot = at.y + at.h;
  const half = at.w / 2;
  return (
    <g className="id-walker dk-move" data-build={id}>
      <circle cx={cx} cy={head} r={r} />
      <path d={`M${cx - half} ${foot}V${top + half * 0.8}A${half} ${half * 0.8} 0 0 1 ${cx + half} ${top + half * 0.8}V${foot}Z`} />
    </g>
  );
}

/** A line with an arrowhead at its end, drawing on from its tail (`--d`), in grey or the process green. */
export function Arrow({ id, from, to, tone }: { id: string; from: Point; to: Point; tone: "soft" | "process" }) {
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const back = (side: 1 | -1) => ({ x: to.x - 18 * Math.cos(angle) + side * 11 * Math.sin(angle), y: to.y - 18 * Math.sin(angle) - side * 11 * Math.cos(angle) });
  const [a, b] = [back(1), back(-1)];
  return <path className={`id-arrow id-arrow--${tone} dk-draw`} data-build={id} d={`M${from.x} ${from.y}L${to.x} ${to.y}M${a.x} ${a.y}L${to.x} ${to.y}L${b.x} ${b.y}`} pathLength={1} />;
}

/** A hammer in its square box: the outline draws on (`--d`), then fills solid (`--k`). */
export function Hammer({ id, at }: { id: string; at: Box }) {
  const k = at.w / 56;
  const p = (x: number, y: number) => `${at.x + x * k} ${at.y + y * k}`;
  /** A head across the top, 48 by 18, and a handle down from its middle, 10 wide. */
  const d = `M${p(4, 6)}L${p(52, 6)}L${p(52, 24)}L${p(32, 24)}L${p(32, 52)}L${p(22, 52)}L${p(22, 24)}L${p(4, 24)}Z`;
  return (
    <g className="id-hammer" data-build={id}>
      <path className="id-hammer__face" d={d} />
      <path className="id-hammer__edge dk-draw" d={d} pathLength={1} />
    </g>
  );
}

/** The balance's post from its pivot to its foot, the foot, and the pivot's cap (`--d`). */
export function Post({ id, top, foot }: { id: string; top: Point; foot: Box }) {
  return (
    <g className="id-stand" data-build={id}>
      <path className="dk-draw" d={`M${top.x} ${foot.y}V${top.y}`} pathLength={1} />
      <rect className="id-stand__foot" x={foot.x} y={foot.y} width={foot.w} height={foot.h} rx={4} />
      <path className="id-stand__cap" d={`M${top.x} ${top.y - 6}L${top.x + 14} ${top.y + 18}H${top.x - 14}Z`} />
    </g>
  );
}

/** The beam: a bar from end to end through its pivot, drawing on (`--d`) and turning about the pivot (`--r`, degrees clockwise). */
export function Beam({ id, pivot, x0, x1 }: { id: string; pivot: Point; x0: number; x1: number }) {
  return (
    <g className="id-beam" data-build={id} style={{ transformOrigin: `${pivot.x}px ${pivot.y}px` }}>
      <path className="dk-draw" d={`M${pivot.x} ${pivot.y}H${x0}M${pivot.x} ${pivot.y}H${x1}`} pathLength={1} />
      <circle className="id-beam__pin" cx={pivot.x} cy={pivot.y} r={7} />
    </g>
  );
}

/**
 * A pan: a stem up from its end of the beam and a level plate on it,
 * shown by `--d` on the plate's part; what the pan holds is passed in and
 * rides with it. The whole moves by `--x` and `--y` (`dk-move`) as the beam
 * tips, staying level.
 */
export function Pan({ id, plate, end, holds }: { id: string; plate: { id: string; at: Box }; end: Point; holds: ReactNode }) {
  const { at } = plate;
  return (
    <g className="dk-move" data-build={id}>
      <g className="id-pan" data-build={plate.id}>
        <path className="dk-draw" d={`M${end.x} ${end.y}V${at.y + at.h}`} pathLength={1} />
        <rect className="id-pan__plate" x={at.x} y={at.y} width={at.w} height={at.h} rx={3} />
      </g>
      {holds}
    </g>
  );
}

/** A box in the catalog's indigo with a blank tag hanging from its right side, tied at the lid. */
export function TaggedBox({ id, at }: { id: string; at: Box }) {
  const tag = { x: at.x + at.w + 8, y: at.y + 34, w: 40, h: 26 };
  return (
    <g className="id-box" data-build={id}>
      <rect className="id-box__face" x={at.x} y={at.y} width={at.w} height={at.h} rx={4} />
      <path className="id-box__lid" d={`M${at.x} ${at.y + 22}H${at.x + at.w}`} />
      <path className="id-box__string" d={`M${at.x + at.w - 8} ${at.y + 22}L${tag.x + 12} ${tag.y + tag.h / 2}`} />
      <path className="id-box__tag" d={`M${tag.x} ${tag.y + tag.h / 2}L${tag.x + 10} ${tag.y}H${tag.x + tag.w}V${tag.y + tag.h}H${tag.x + 10}Z`} />
      <circle className="id-box__hole" cx={tag.x + 12} cy={tag.y + tag.h / 2} r={3} />
    </g>
  );
}

/** A small person in the process green, standing in its box. */
export function Figure({ at }: { at: Box }) {
  const cx = at.x + at.w / 2;
  const r = at.w * 0.3;
  const head = at.y + r;
  const half = at.w / 2;
  const top = head + r + 4;
  const foot = at.y + at.h;
  return (
    <g className="id-figure">
      <circle cx={cx} cy={head} r={r} />
      <path d={`M${cx - half} ${foot}V${top + half * 0.8}A${half} ${half * 0.8} 0 0 1 ${cx + half} ${top + half * 0.8}V${foot}Z`} />
    </g>
  );
}

/** The dial: a half circle over its baseline, drawing on (`--d`), with its hub. */
export function Dial({ id, hub, r }: { id: string; hub: Point; r: number }) {
  return (
    <g className="id-dial" data-build={id}>
      <path className="dk-draw" d={`M${hub.x - r} ${hub.y}A${r} ${r} 0 0 1 ${hub.x + r} ${hub.y}`} pathLength={1} />
      <path className="id-dial__base dk-draw" d={`M${hub.x - r - 16} ${hub.y}H${hub.x + r + 16}`} pathLength={1} />
    </g>
  );
}

/** A tick on the dial's arc, drawing on outward (`--d`). */
export function DialTick({ id, from, to }: { id: string; from: Point; to: Point }) {
  return <path className="id-dial__tick dk-draw" data-build={id} d={`M${from.x} ${from.y}L${to.x} ${to.y}`} pathLength={1} />;
}

/** The needle: from the hub to its length, pointing right at no turn, turned counterclockwise by `--r` degrees; its hub cap over it. */
export function Needle({ id, hub, length }: { id: string; hub: Point; length: number }) {
  return (
    <g className="id-needle" data-build={id} style={{ transformOrigin: `${hub.x}px ${hub.y}px` }}>
      <path d={`M${hub.x} ${hub.y - 7}L${hub.x + length} ${hub.y}L${hub.x} ${hub.y + 7}Z`} />
      <circle cx={hub.x} cy={hub.y} r={12} />
    </g>
  );
}

/**
 * A step of the gate stair: its riser box down to the floor, its name
 * inside it, its tread's edge, and a small gate standing on the tread: two
 * posts and two bars between them. It comes up whole.
 */
export function GateStep({ id, at, gate, name, text, size }: { id: string; at: Box; gate: Point; name: Point; text: string; size: { h: number; span: number } }) {
  const x0 = gate.x - size.span / 2;
  const x1 = gate.x + size.span / 2;
  const top = gate.y - size.h;
  return (
    <g className="id-step" data-build={id}>
      <rect className="id-step__riser" x={at.x} y={at.y} width={at.w} height={at.h} />
      <path className="id-step__tread" d={`M${at.x} ${at.y}H${at.x + at.w}`} />
      <text className="dk-label id-word id-word--strong" x={name.x} y={name.y} textAnchor="middle" dominantBaseline="central">
        {text}
      </text>
      <path className="id-gate" d={`M${x0} ${gate.y}V${top}M${x1} ${gate.y}V${top}M${x0} ${top + 12}H${x1}M${x0} ${top + 28}H${x1}`} />
    </g>
  );
}

/** A small project box in the process green, a lid line across its top; it travels by `--x` and `--y` (the kit's `dk-move`). */
export function ProjectBox({ id, at }: { id: string; at: Box }) {
  return (
    <g className="id-project dk-move" data-build={id}>
      <rect className="id-project__face" x={at.x} y={at.y} width={at.w} height={at.h} rx={5} />
      <path className="id-project__lid" d={`M${at.x} ${at.y + 16}H${at.x + at.w}`} />
    </g>
  );
}

/** A checklist row's box and the faint rule under its words; the words are passed in. */
export function ListRow({ id, check, rule, children }: { id: string; check: Box; rule: { y: number; x0: number; x1: number }; children: ReactNode }) {
  return (
    <g data-build={id}>
      <path className="id-list__rule" d={`M${rule.x0} ${rule.y}H${rule.x1}`} />
      <rect className="id-list__box" x={check.x} y={check.y} width={check.w} height={check.h} rx={8} />
      {children}
    </g>
  );
}
