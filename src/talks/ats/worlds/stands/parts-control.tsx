/**
 * Slide 11a's own pieces: the card a member of staff carries, with a hole
 * the shape of its socket; the shelf and its tool screens; a socket's fill;
 * the boundary round a screen; the record whose lines draw in; and the
 * magnifier the reviewer holds. Their measures are in layout-control.ts;
 * painted by stands-control.css.
 */
"use client";

import type { Box, Point } from "@/components/deck/kit";
import { BOUNDARY, LENS, TOOL } from "./layout-control";

/** A card: a solid navy page with a hole cut in it (`page`, drawn even-odd, so what is under the hole shows through), and a white line across its top. It shows (`show`) and travels by `--x` and `--y` (`travel`). */
export function Card({ id, page, line }: { id: string; page: string; line: string }) {
  return (
    <g className="dk-move sn-card" data-build={id}>
      <path className="sn-card__page" d={page} fillRule="evenodd" />
      <path className="sn-card__line" d={line} />
    </g>
  );
}

/** A tool screen standing on the shelf: its frame and the panel in it drawing on as one (`draw`), and, when given, its socket's outline with them. */
export function ToolScreen({ id, at, socket }: { id: string; at: Box; socket?: string }) {
  const i = TOOL.inset;
  return (
    <g className="sn-tool" data-build={id}>
      <rect className="sn-tool__frame dk-draw" x={at.x} y={at.y} width={at.w} height={at.h} rx={TOOL.rx} pathLength={1} />
      <rect className="sn-tool__panel dk-draw" x={at.x + i} y={at.y + i} width={at.w - 2 * i} height={at.h - 2 * i} rx={3} pathLength={1} />
      {socket && <path className="sn-tool__socket dk-draw" d={socket} pathLength={1} />}
    </g>
  );
}

/** A socket's fill: deep green as it lights, by `--k` (`fill`). */
export function LitSocket({ id, d }: { id: string; d: string }) {
  return <path className="sn-socket sn-socket--pass" data-build={id} d={d} />;
}

/** The added screen's socket: a grey outline that shows (`show`) with its slot, then fills orange by `--k` (`fill`). */
export function AddedSocket({ id, d }: { id: string; d: string }) {
  return (
    <g className="sn-socket" data-build={id}>
      <path className="sn-socket__rim" d={d} />
      <path className="sn-socket--human" d={d} />
    </g>
  );
}

/** The boundary round one screen: a deep green dashed outline open at the shelf. HTML holding its own SVG, as a dashed edge cannot draw on: it wipes on (`wipe`). */
export function Boundary({ id, at }: { id: string; at: Box }) {
  const pad = 3;
  const r = BOUNDARY.rx;
  const [x0, x1, y0, foot] = [pad, pad + at.w, pad, pad + at.h];
  return (
    <div className="sn-boundary dk-wipe" data-build={id} style={{ left: at.x - pad, top: at.y - pad, width: at.w + 2 * pad, height: at.h + pad }}>
      <svg width={at.w + 2 * pad} height={at.h + pad} viewBox={`0 0 ${at.w + 2 * pad} ${at.h + pad}`} aria-hidden="true">
        <path d={`M${x0} ${foot}V${y0 + r}Q${x0} ${y0} ${x0 + r} ${y0}H${x1 - r}Q${x1} ${y0} ${x1} ${y0 + r}V${foot}`} />
      </svg>
    </div>
  );
}

/** The record: a page drawing on (`draw`), white inside as it draws. Its lines are drawn by `LedgerLine`, each as its own part. */
export function Ledger({ id, at }: { id: string; at: Box }) {
  return <rect className="sn-ledger dk-draw" data-build={id} x={at.x} y={at.y} width={at.w} height={at.h} rx={6} pathLength={1} />;
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

/** A route, or the shelf: a navy line drawing on from its first point (`draw`). */
export function Route({ id, d, shelf = false }: { id: string; d: string; shelf?: boolean }) {
  return <path className={`${shelf ? "sn-shelf" : "sn-route"} dk-draw`} data-build={id} d={d} pathLength={1} />;
}
