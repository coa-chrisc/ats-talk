/**
 * Slide 8's drawings: the hexagon agent; the shared gate, its posts green
 * and its bars navy, the lower bar on its own part so it can swing up
 * about the near post; a navy card that travels; a word stamped on a card;
 * a run of words set on lines; the record folder; and the ledger with its
 * heading's rule and its lines. SVG for the plane's marks, moved with the
 * house moves only (ideas.css paints them). Script-free: every word is
 * passed in.
 */
"use client";

import type { Box, Point } from "@/components/deck/kit";
import { AGENT } from "../department-map";
import { LABEL_LINE } from "./layout";

/** The agent: a white hexagon in a navy edge, two green eyes and a mouth, its top point at `top`, every measure times `scale`. It arrives as one part (`rise`). */
export function Hexagon({ id, top, scale }: { id: string; top: Point; scale: number }) {
  const k = scale;
  const mid = top.y + (AGENT.h * k) / 2;
  return (
    <g className="id-agent" data-build={id}>
      <path className="id-agent__body" d={`M${top.x} ${top.y}l${35 * k} ${20 * k}v${49 * k}l${-35 * k} ${20 * k}l${-35 * k} ${-20 * k}v${-49 * k}z`} />
      <circle className="id-agent__eye" cx={top.x - 12 * k} cy={mid - 3.5 * k} r={4 * k} />
      <circle className="id-agent__eye" cx={top.x + 12 * k} cy={mid - 3.5 * k} r={4 * k} />
      <path className="id-agent__mouth" d={`M${top.x - 15 * k} ${mid + 16.5 * k}h${30 * k}`} />
    </g>
  );
}

/**
 * The gate: its bars and posts draw on together (`--d`); the lower bar
 * sits in its own part, which swings it up about the near post, a quarter
 * turn, when the gate opens for it (`--k`, the kit's `open`).
 */
export function CheckGate({ id, swing, posts, upper, lower }: { id: string; swing: string; posts: string; upper: string; lower: string }) {
  return (
    <g className="id-check" data-build={id}>
      <path className="id-check__bar dk-draw" d={upper} pathLength={1} />
      <g className="id-check__swing" data-build={swing}>
        <path className="id-check__bar dk-draw" d={lower} pathLength={1} />
      </g>
      <path className="id-check__post dk-draw" d={posts} pathLength={1} />
    </g>
  );
}

/** A card: a white page in a navy edge with a rule across its top. It travels by `--x` (the kit's `dk-move`). */
export function Card({ id, at }: { id: string; at: Box }) {
  return (
    <g className="id-card dk-move" data-build={id}>
      <rect className="id-card__page" x={at.x} y={at.y} width={at.w} height={at.h} rx={4} />
      <path className="id-card__rule" d={`M${at.x + 12} ${at.y + 13}H${at.x + at.w - 12}`} />
    </g>
  );
}

/** A word stamped on a card's face: navy, heavy, at the label size. */
export function Stamp({ id, at, text }: { id: string; at: Point; text: string }) {
  return (
    <text className="dk-label id-word id-stamp" data-build={id} x={at.x} y={at.y} textAnchor="middle" dominantBaseline="central">
      {text}
    </text>
  );
}

/** A run of words set on lines, one under the next a label line apart, as one part. */
export function WordLines({ id, at, lines, anchor }: { id: string; at: Point; lines: readonly string[]; anchor: "start" | "middle" | "end" }) {
  return (
    <g data-build={id}>
      {lines.map((line, i) => (
        <text key={line} className="dk-label id-word" x={at.x} y={at.y + i * LABEL_LINE} textAnchor={anchor} dominantBaseline="central">
          {line}
        </text>
      ))}
    </g>
  );
}

/** The record: a folder, its tab on its top left, in a navy edge on the raised grey, drawing on (`--d`) and filling as it does. */
export function Folder({ id, at }: { id: string; at: Box }) {
  const tab = { w: at.w * 0.4, h: 16 };
  const d = `M${at.x} ${at.y + at.h}V${at.y}H${at.x + tab.w}l12 ${tab.h}H${at.x + at.w}V${at.y + at.h}Z`;
  return (
    <g className="id-folder" data-build={id}>
      <path className="dk-draw" d={d} pathLength={1} />
      <path className="id-folder__line dk-draw" d={`M${at.x + 20} ${at.y + 48}H${at.x + at.w - 20}M${at.x + 20} ${at.y + 70}H${at.x + at.w - 52}`} pathLength={1} />
    </g>
  );
}

/** The ledger: its frame drawing on and filling white (`--d`), and the rule under its heading. */
export function Ledger({ id, at, rule }: { id: string; at: Box; rule: number }) {
  return (
    <g className="id-ledger" data-build={id}>
      <rect className="dk-draw" x={at.x} y={at.y} width={at.w} height={at.h} rx={6} pathLength={1} />
      <path className="id-ledger__rule dk-draw" d={`M${at.x} ${rule}H${at.x + at.w}`} pathLength={1} />
    </g>
  );
}

/** A line in the ledger, drawing on from its left (`--d`). */
export function LedgerLine({ id, from, to }: { id: string; from: Point; to: number }) {
  return <path className="id-ledger__line dk-draw" data-build={id} d={`M${from.x} ${from.y}H${to}`} pathLength={1} />;
}
