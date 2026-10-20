/**
 * Slide 18's own drawings: the floor line, a desk seen from the front, a low
 * picket fence standing on the floor, and the card that crosses it. SVG for
 * the plane's marks, moved with the house moves only: `draw` (`--d`),
 * `fill` (`--k`), `rise`, and `x`/`y` for travel. Colours are in ready.css.
 */
"use client";

import type { Box, Point } from "@/components/deck/kit";
import { Words } from "./parts";

/** The floor: a line in the rule colour that draws on (`draw`). */
export function Floor({ id, d }: { id: string; d: string }) {
  return <path className="rd-floor dk-draw" data-build={id} d={d} pathLength={1} />;
}

/** A desk seen from the front: its raised front panel, its edge drawing on (`draw`) and its ground coming in with it so it hides whoever sits behind it, and its solid navy top. */
export function Desk({ id, slab, body }: { id: string; slab: Box; body: Box }) {
  return (
    <g data-build={id}>
      <rect className="rd-desk__body" x={body.x} y={body.y} width={body.w} height={body.h} />
      <rect className="rd-desk__edge dk-draw" x={body.x} y={body.y} width={body.w} height={body.h} pathLength={1} />
      <rect className="rd-desk__top" x={slab.x} y={slab.y} width={slab.w} height={slab.h} rx={4} />
    </g>
  );
}

/** A low picket fence on the floor: its pickets, pointed at the top, grow up from the floor together (`fill`), and its rail draws on across them (`draw`). */
export function PicketFence({ id, rail, pickets, origin }: { id: string; rail: { key: string; d: string }; pickets: readonly Box[]; origin: Point }) {
  return (
    <>
      <g className="rd-pickets" data-build={id} style={{ transformOrigin: `${origin.x}px ${origin.y}px` }}>
        {pickets.map((p) => (
          <path key={p.x} d={`M${p.x} ${p.y + p.h}V${p.y + 8}L${p.x + p.w / 2} ${p.y}L${p.x + p.w} ${p.y + 8}V${p.y + p.h}Z`} />
        ))}
      </g>
      <path className="rd-rail dk-draw" data-build={rail.key} d={rail.d} pathLength={1} />
    </>
  );
}

/** The card that crosses the fence: white, a green edge, its words in the middle. It travels as one part (`x`, `y`). */
export function ServiceCard({ id, at, text }: { id: string; at: Box; text: string }) {
  return (
    <g data-build={id}>
      <rect className="rd-card" x={at.x} y={at.y} width={at.w} height={at.h} rx={10} />
      <Words at={{ x: at.x + at.w / 2, y: at.y + at.h / 2 }} text={text} strong />
    </g>
  );
}
