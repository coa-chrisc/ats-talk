/**
 * The stands world's drawings for what the kit has no part for: slide 11's
 * fence post; slide 11a's gauge, a step of its stair and its climber;
 * slide 12a's plaque and the cord it hangs by; slide 13's fence, a tile
 * inside it and a nameplate; slide 15's step of the stair with its gate.
 * Script-free: every word is passed in. SVG for the plane's marks, moved
 * with the house moves only (stands.css paints them).
 */
"use client";

import type { ReactNode } from "react";
import type { Box, Point } from "@/components/deck/kit";

/* Slide 11 */

/** A solid fence post with a pointed cap, its foot on the ground. */
export function FencePost({ id, x, w, top, foot }: { id: string; x: number; w: number; top: number; foot: number }) {
  return <path className="sn-post" data-build={id} d={`M${x} ${foot}V${top + w / 2}L${x + w / 2} ${top}L${x + w} ${top + w / 2}V${foot}Z`} />;
}

/* Slide 11a */

/**
 * A closed gate hung from the post: its frame, upright bars and a brace
 * from the hinge foot to the latch top, and the latch post that ends it.
 * It lands as one part.
 */
export function Gate({ id, at, bars, latch }: { id: string; at: Box; bars: number; latch: { x: number; w: number; top: number; foot: number } }) {
  const pitch = at.w / (bars + 1);
  return (
    <g className="sn-hung-gate" data-build={id}>
      <rect className="sn-hung-gate__frame" x={at.x} y={at.y} width={at.w} height={at.h} />
      {Array.from({ length: bars }, (_, i) => (
        <path key={i} className="sn-hung-gate__bar" d={`M${at.x + (i + 1) * pitch} ${at.y}V${at.y + at.h}`} />
      ))}
      <path className="sn-hung-gate__bar" d={`M${at.x} ${at.y + at.h}L${at.x + at.w} ${at.y}`} />
      <path className="sn-post" d={`M${latch.x} ${latch.foot}V${latch.top}H${latch.x + latch.w}V${latch.foot}Z`} />
    </g>
  );
}

/** A path worn into the ground, in grey, that wears in from where it starts (`draw`). */
export function WornPath({ id, d }: { id: string; d: string }) {
  return <path className="sn-worn dk-draw" data-build={id} d={d} pathLength={1} />;
}

/** A green eye, open: an almond outline, a green iris and a white pupil. It settles as one part. */
export function Eye({ id, at, w, h, iris, pupil }: { id: string; at: Point; w: number; h: number; iris: number; pupil: number }) {
  const [l, r] = [at.x - w / 2, at.x + w / 2];
  return (
    <g className="sn-eye" data-build={id}>
      <path className="sn-eye__lid" d={`M${l} ${at.y}Q${at.x} ${at.y - h} ${r} ${at.y}Q${at.x} ${at.y + h} ${l} ${at.y}Z`} />
      <circle className="sn-eye__iris" cx={at.x} cy={at.y} r={iris} />
      <circle className="sn-eye__pupil" cx={at.x} cy={at.y} r={pupil} />
    </g>
  );
}

/**
 * A grey gauge: a half circle's band, the part of it the needle has swept
 * drawing on in the darker grey (`draw`), a short tick at each end, and a
 * needle from the hub that turns clockwise from the low end (`--r`, in
 * degrees). The band, ticks and hub are drawn with the gauge's group.
 */
export function Gauge({ id, track, reached, needle, cx, cy, length, hub }: { id: string; track: string; reached: { id: string; d: string }; needle: { id: string }; cx: number; cy: number; length: number; hub: number }) {
  return (
    <>
      <g data-build={id}>
        <path className="sn-gauge__band" d={track} />
        <path className="sn-gauge__base" d={`M${cx - length - 30} ${cy}H${cx + length + 30}`} />
      </g>
      <path className="sn-gauge__reached dk-draw" data-build={reached.id} d={reached.d} pathLength={1} />
      <g className="sn-needle" data-build={needle.id} style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <path className="sn-needle__arm" d={`M${cx} ${cy}H${cx - length}`} />
        <circle className="sn-needle__hub" cx={cx} cy={cy} r={hub} />
      </g>
    </>
  );
}

/** A step of a plain stair: its riser box down to the floor, its tread drawn heavier on top. */
export function ClimbStep({ id, at }: { id: string; at: Box }) {
  return (
    <g className="sn-climb-step" data-build={id}>
      <rect className="sn-climb-step__riser" x={at.x} y={at.y} width={at.w} height={at.h} />
      <path className="sn-climb-step__tread" d={`M${at.x} ${at.y}H${at.x + at.w}`} />
    </g>
  );
}

/** A small green figure standing with its feet at `at`: a head over a rounded body. It travels by `--x` and `--y`. */
export function Climber({ id, at, w, h }: { id: string; at: Point; w: number; h: number }) {
  const r = w * 0.3;
  const top = at.y - h + 2 * r + 4;
  return (
    <g className="sn-climber dk-move" data-build={id}>
      <circle cx={at.x} cy={at.y - h + r} r={r} />
      <path d={`M${at.x - w / 2} ${at.y}V${top + w / 2}A${w / 2} ${w / 2} 0 0 1 ${at.x + w / 2} ${top + w / 2}V${at.y}Z`} />
    </g>
  );
}

/* Slide 12a */

/**
 * A plaque on the wall: a white face in an indigo edge (recognition from
 * outside), a thin rule inset round it, and what it says set inside it. It
 * settles onto its cord as one part (`y`, autoAlpha).
 */
export function Plaque({ id, at, inset, children }: { id: string; at: Box; inset: number; children?: ReactNode }) {
  return (
    <g className="sn-plaque" data-build={id}>
      <rect className="sn-plaque__face" x={at.x} y={at.y} width={at.w} height={at.h} rx={4} />
      <rect className="sn-plaque__inset" x={at.x + inset} y={at.y + inset} width={at.w - 2 * inset} height={at.h - 2 * inset} rx={2} />
      {children}
    </g>
  );
}

/** The cord a plaque hangs by, from its top up to a nail and down again, the nail with it; it draws on (`draw`). */
export function Cord({ id, d, nail }: { id: string; d: string; nail: Point }) {
  return (
    <g data-build={id}>
      <path className="sn-cord dk-draw" d={d} pathLength={1} />
      <circle className="sn-nail" cx={nail.x} cy={nail.y} r={4} />
    </g>
  );
}

/** A small nameplate in a plaque: a plate in a thin edge, its name in it. */
export function Host({ id, at, text }: { id: string; at: Box; text: string }) {
  return (
    <g className="sn-host" data-build={id}>
      <rect className="sn-host__face" x={at.x} y={at.y} width={at.w} height={at.h} rx={6} />
      <text className="dk-label sn-word sn-word--strong" x={at.x + at.w / 2} y={at.y + at.h / 2} textAnchor="middle" dominantBaseline="central">
        {text}
      </text>
    </g>
  );
}

/* Slide 13 */

/** The yard's fence: a top rail, a foot rail and posts along them, drawn on as one outline (`draw`), the posts with it. */
export function Fence({ id, at, posts }: { id: string; at: Box; posts: readonly number[] }) {
  return (
    <g className="sn-fence" data-build={id}>
      <rect className="sn-fence__yard" x={at.x} y={at.y} width={at.w} height={at.h} rx={6} />
      <rect className="sn-fence__rail dk-draw" x={at.x} y={at.y} width={at.w} height={at.h} rx={6} pathLength={1} />
      {posts.flatMap((x) => [
        <path key={`t${x}`} className="sn-fence__post" d={`M${x} ${at.y - 10}V${at.y + 10}`} />,
        <path key={`b${x}`} className="sn-fence__post" d={`M${x} ${at.y + at.h - 10}V${at.y + at.h + 10}`} />,
      ])}
    </g>
  );
}

/** A tile inside the yard: a white face in a navy edge with a green rule down its left side, what it holds set inside it. It lands as one part. */
export function YardTile({ id, at, children }: { id: string; at: Box; children?: ReactNode }) {
  return (
    <g className="sn-tile" data-build={id}>
      <rect className="sn-tile__face" x={at.x} y={at.y} width={at.w} height={at.h} rx={8} />
      <path className="sn-tile__edge" d={`M${at.x + 2} ${at.y + 14}V${at.y + at.h - 14}`} />
      {children}
    </g>
  );
}

/** The calendar's weeks: an empty outline for each. */
export function Weeks({ id, at }: { id: string; at: readonly Box[] }) {
  return (
    <g data-build={id}>
      {at.map((week, i) => (
        <rect key={i} className="sn-week" x={week.x} y={week.y} width={week.w} height={week.h} rx={2} />
      ))}
    </g>
  );
}

/** Each week filling with the process's green, one element each under one id, so they fill in order with a stagger. */
export function WeekFills({ id, at }: { id: string; at: readonly Box[] }) {
  return (
    <>
      {at.map((week, i) => (
        <rect key={i} className="sn-week-fill" data-build={id} x={week.x} y={week.y} width={week.w} height={week.h} rx={2} />
      ))}
    </>
  );
}

/** A partner's nameplate: a white plate in a navy edge, its name set in it. */
export function Plate({ id, at, text }: { id: string; at: Box; text: string }) {
  return (
    <g className="sn-plate" data-build={id}>
      <rect className="sn-plate__face" x={at.x} y={at.y} width={at.w} height={at.h} rx={8} />
      <text className="dk-text sn-word sn-word--strong" x={at.x + at.w / 2} y={at.y + at.h / 2} textAnchor="middle" dominantBaseline="central">
        {text}
      </text>
    </g>
  );
}

/* Slide 15 */

/**
 * A step of the stair: its riser box down to the floor, its name inside it,
 * and a gate standing on its tread. It is grey until it lights (`--k`):
 * then its riser fills with the process's green and its gate turns green.
 * The top step never lights.
 */
export function StairStep({ id, at, gate, name, text, size }: { id: string; at: Box; gate: Point; name: Point; text: string; size: { h: number; span: number } }) {
  const x0 = gate.x - size.span / 2;
  const x1 = gate.x + size.span / 2;
  const top = gate.y - size.h;
  const d = `M${x0} ${gate.y}V${top}M${x1} ${gate.y}V${top}M${x0} ${top + 7}H${x1}M${x0} ${top + 16}H${x1}`;
  return (
    <g className="sn-step" data-build={id}>
      <rect className="sn-step__riser" x={at.x} y={at.y} width={at.w} height={at.h} />
      <rect className="sn-step__lit" x={at.x} y={at.y} width={at.w} height={at.h} />
      <path className="sn-step__tread" d={`M${at.x} ${at.y}H${at.x + at.w}`} />
      <text className="dk-label sn-word sn-word--strong" x={name.x} y={name.y} textAnchor="middle" dominantBaseline="central">
        {text}
      </text>
      <path className="sn-gate" d={d} />
      <path className="sn-gate sn-gate--lit" d={d} />
    </g>
  );
}
