/**
 * Slide 23's own drawn pieces: the dashed tag that holds words, the line
 * the trip runs along, the request card, the bracket under the trip, the
 * pin at its end and the magnifier. SVG for the plane's marks, moved with
 * the house moves only; painted by first-outcomes.css. Every word is passed
 * in, as the tag's children.
 */
"use client";

import type { ReactNode } from "react";
import type { Box, Point } from "@/components/deck/kit";

/** A tag in a dashed outline, its words inside it: it says "an example" or "not yet set". It lands whole (`rise`); a dashed edge never draws on. */
export function DashedTag({ id, at, children }: { id: string; at: Box; children: ReactNode }) {
  return (
    <g className="fs-dashed-tag" data-build={id}>
      <rect className="fs-dashed-tag__edge" x={at.x} y={at.y} width={at.w} height={at.h} rx={10} />
      {children}
    </g>
  );
}

/** A straight line in navy that draws on (`draw`): the trip's route, the bracket under it. `className` names which. */
export function Line({ id, d, className }: { id: string; d: string; className: string }) {
  return <path className={`${className} dk-draw`} data-build={id} d={d} pathLength={1} />;
}

/** The request card: a small white page in a navy edge, two lines of writing on it. It travels on `x`. */
export function RequestCard({ id, at }: { id: string; at: Box }) {
  const lines = [0.36, 0.58].map((f) => `M${at.x + 9} ${at.y + at.h * f}H${at.x + at.w - 9}`).join("");
  return (
    <g className="fs-request" data-build={id}>
      <rect className="fs-request__page" x={at.x} y={at.y} width={at.w} height={at.h} rx={4} />
      <path className="fs-request__lines" d={lines} />
    </g>
  );
}

/** A pin: a stem down from `top` and a round head at `head`, in navy. It lands whole (`rise`). */
export function Pin({ id, top, head, r }: { id: string; top: Point; head: Point; r: number }) {
  return (
    <g className="fs-pin" data-build={id}>
      <path className="fs-pin__stem" d={`M${top.x} ${top.y}V${head.y - r}`} />
      <circle className="fs-pin__head" cx={head.x} cy={head.y} r={r} />
    </g>
  );
}

/** A magnifier: a lens round `at` and its handle out to the lower right, in navy. It travels on `x`. */
export function Lens({ id, at, r, handle }: { id: string; at: Point; r: number; handle: number }) {
  const k = Math.SQRT1_2;
  return (
    <g className="fs-lens" data-build={id}>
      <circle className="fs-lens__glass" cx={at.x} cy={at.y} r={r} />
      <path className="fs-lens__handle" d={`M${at.x + r * k} ${at.y + r * k}l${handle * k} ${handle * k}`} />
    </g>
  );
}
