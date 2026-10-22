/**
 * The enterprise world's drawings of its figures, for which the kit has no
 * part: a speech bubble, a draft with a person beside it, the deck's
 * hexagon agent and its closed gate (the City map's own measures, read from
 * department-map.ts). Script-free: they hold no words. SVG for
 * the plane's marks, moved with the house moves only (enterprise.css paints
 * them).
 */
"use client";

import { Person, type Box, type Point } from "@/components/deck/kit";
import { AGENT, gatePaths } from "../department-map";

/** The id of the part inside a figure that moves on its own: the person beside the draft, who draws on. */
export const personOf = (id: string) => `${id}.person`;

/** A speech bubble with three dots of a reply in it, its tail at its lower left, drawn to fill `at`. */
export function ChatBubble({ id, at }: { id: string; at: Box }) {
  const w = 112;
  const h = 64;
  const x = at.x + (at.w - w) / 2;
  const y = at.y + 2;
  const r = 18;
  const d = `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + 44}L${x + 18} ${y + h + 14}L${x + 24} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`;
  return (
    <g className="en-bubble" data-build={id}>
      <path d={d} />
      {[0, 1, 2].map((i) => (
        <circle key={i} className="en-bubble__dot" cx={x + 34 + i * 22} cy={y + h / 2} r={6} />
      ))}
    </g>
  );
}

/** A draft page, a few lines written on it, and the person who reads it standing beside it: the draft is written for a person to sign. */
export function DraftAndSigner({ id, at }: { id: string; at: Box }) {
  const page = { x: at.x + 18, y: at.y + 4, w: 58, h: 76 };
  return (
    <g className="en-copilot" data-build={id}>
      <path className="en-copilot__page" d={`M${page.x} ${page.y}H${page.x + page.w - 16}L${page.x + page.w} ${page.y + 16}V${page.y + page.h}H${page.x}Z`} />
      {[20, 32, 44, 56].map((dy, i) => (
        <path key={dy} className="en-copilot__writing" d={`M${page.x + 10} ${page.y + dy}H${page.x + page.w - (i === 3 ? 26 : 12)}`} />
      ))}
      <Person id={personOf(id)} at={{ x: at.x + 90, y: at.y + 16, w: 40, h: 64 }} />
    </g>
  );
}

/**
 * The deck's agent, the same hexagon the City's map draws (its measures
 * from department-map.ts): a white body in navy, standing on its point at
 * `at`, its top, two green eyes and a level mouth, every measure times
 * `scale`. It lands as one part.
 */
export function HexAgent({ id, at, scale }: { id: string; at: Point; scale: number }) {
  const k = scale;
  const mid = at.y + (AGENT.h * k) / 2;
  return (
    <g className="en-agent" data-build={id}>
      <path className="en-agent__body" d={`M${at.x} ${at.y}l${35 * k} ${20 * k}v${49 * k}l${-35 * k} ${20 * k}l${-35 * k} ${-20 * k}v${-49 * k}z`} />
      <circle className="en-agent__eye" cx={at.x - 12 * k} cy={mid - 3.5 * k} r={4 * k} />
      <circle className="en-agent__eye" cx={at.x + 12 * k} cy={mid - 3.5 * k} r={4 * k} />
      <path className="en-agent__mouth" d={`M${at.x - 15 * k} ${mid + 16.5 * k}h${30 * k}`} />
    </g>
  );
}

/** The deck's closed gate, the map's own (department-map.ts): two posts in green standing on `foot`, its two bars across them in navy, times `scale`. It lands as one part. */
export function ClosedGate({ id, foot, scale }: { id: string; foot: Point; scale: number }) {
  const gate = gatePaths(foot, scale);
  return (
    <g className="en-closed-gate" data-build={id}>
      <path className="en-closed-gate__bar" d={gate.bars} />
      <path className="en-closed-gate__post" d={gate.posts} />
    </g>
  );
}
