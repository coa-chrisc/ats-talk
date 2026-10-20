/**
 * The running track's drawing, shared by slides 11, 15 and 27: the oval
 * with its two lanes, the start stripe, a runner seen side on, and a pack of
 * small runners. Script-free: every id and every number is passed in, the
 * numbers from track-geometry.ts. The ready world copies this file with
 * track-geometry.ts for slide 27; it paints the same classes under its own
 * prefix (the `sn-track`, `sn-start` and `sn-runner` rules in stands.css).
 *
 * How each part moves: the track draws on (`draw`: its edges stroke round
 * the lap and its lanes fill with them); the stripe draws on; a runner
 * rises or lands as one part; a dashed runner (slide 27) wipes on.
 */
"use client";

import type { Point } from "@/components/deck/kit";
import { PACK, PACK_FACING, RUNNER, START, TRACK_D } from "./track-geometry";

/** The oval from above: its lanes in the raised grey, the line between them in white, its two edges in navy, drawn round the lap from the start's end of the near straight. */
export function Track({ id }: { id: string }) {
  return (
    <g data-build={id}>
      <path className="sn-track__lanes" d={`${TRACK_D.outer}${TRACK_D.inner}`} />
      <path className="sn-track__lane" d={TRACK_D.middle} />
      <path className="sn-track__edge dk-draw" d={TRACK_D.outer} pathLength={1} />
      <path className="sn-track__edge dk-draw" d={TRACK_D.inner} pathLength={1} />
    </g>
  );
}

/** The start line across both lanes of the near straight: a white stripe inside a navy edge, so it reads on the grey lanes. */
export function StartLine({ id }: { id: string }) {
  return (
    <g data-build={id}>
      <path className="sn-start dk-draw" d={`M${START.x} ${START.y0}V${START.y1}`} pathLength={1} />
      <path className="sn-start sn-start--stripe dk-draw" d={`M${START.x} ${START.y0 + 3}V${START.y1 - 3}`} pathLength={1} />
    </g>
  );
}

type RunnerProps = {
  /** Left out when a group round the runner carries its id (a runner that travels by `--x` and `--y`). */
  id?: string;
  at: Point;
  h: number;
  tone: "catalog" | "process";
  facing?: "left" | "right";
  /** A runner not there yet: its outline only, dashed, no fill (slide 27). */
  dashed?: boolean;
};

/** A runner seen side on, its foot at `at`, facing the way it runs: a head, a leaning body and legs mid-stride. In indigo (the pack) or green (the City). */
export function Runner({ id, at, h, tone, facing = "right", dashed = false }: RunnerProps) {
  const k = h / 40;
  const f = facing === "left" ? -1 : 1;
  const p = (x: number, y: number) => `${Math.round((at.x + f * x * k) * 100) / 100} ${Math.round((at.y + y * k) * 100) / 100}`;
  return (
    <g className={`sn-runner sn-runner--${tone}${dashed ? " sn-runner--dashed dk-wipe" : ""}`} data-build={id}>
      <circle className="sn-runner__head" cx={at.x + f * 3 * k} cy={at.y - 34 * k} r={5.5 * k} />
      <path className="sn-runner__limb" style={{ strokeWidth: 5 * k }} d={`M${p(1, -26)}L${p(-2, -13)}M${p(-2, -13)}L${p(6, -6)}L${p(4, 0)}M${p(-2, -13)}L${p(-9, -5)}L${p(-14, -6)}M${p(1, -24)}L${p(9, -18)}M${p(1, -24)}L${p(-7, -20)}`} />
    </g>
  );
}

/** The enterprise pack on the far straight, facing left, one id each so they come up one after another. */
export function Pack({ ids }: { ids: readonly string[] }) {
  return (
    <>
      {PACK.map((at, i) => (
        <Runner key={ids[i]} id={ids[i]} at={at} h={RUNNER.small} tone="catalog" facing={PACK_FACING} />
      ))}
    </>
  );
}

/** A marker the runner has passed, on the lane's middle line: a green disc in a white ring. */
export function Marker({ id, at, r }: { id: string; at: Point; r: number }) {
  return (
    <g data-build={id} className="dk-move" style={{ transformOrigin: `${at.x}px ${at.y}px` }}>
      <circle className="sn-marker" cx={at.x} cy={at.y} r={r} />
    </g>
  );
}
