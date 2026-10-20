/**
 * The enterprise world's drawings of slide 4's three figures, for which the
 * kit has no part: a speech bubble, a draft with a person beside it, and an
 * agent wearing a belt of tools. Script-free: they hold no words. SVG for
 * the plane's marks, moved with the house moves only (enterprise.css paints
 * them).
 */
"use client";

import { Agent, Person, type Box, type Point } from "@/components/deck/kit";

/** The ids of the parts inside the figures that move on their own: the person beside the draft, who draws on, and the belted figure's head ring, which fills. */
export const personOf = (id: string) => `${id}.person`;
export const headOf = (id: string) => `${id}.head`;

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
 * An agent with a belt of tools: the kit's agent ring for a head, a torso
 * under it, a green belt at its waist, two legs, and a wrench and a hammer
 * hanging from the belt at its hips. The only one of the three with tools.
 */
export function BeltedAgent({ id, at }: { id: string; at: Box }) {
  const cx = at.x + at.w / 2;
  const foot = at.y + at.h;
  const head: Point = { x: cx, y: at.y + 13 };
  const torso = { top: at.y + 32, waist: at.y + 56, half: 22 };
  const belt = { y: torso.waist, h: 9, half: 28 };
  const hip = belt.y + belt.h;
  return (
    <g className="en-tool-agent" data-build={id}>
      <path className="en-tool-agent__body" d={`M${cx - torso.half + 4} ${torso.waist}L${cx - torso.half} ${torso.top + 10}Q${cx - torso.half} ${torso.top} ${cx - torso.half + 10} ${torso.top}H${cx + torso.half - 10}Q${cx + torso.half} ${torso.top} ${cx + torso.half} ${torso.top + 10}L${cx + torso.half - 4} ${torso.waist}Z`} />
      <path className="en-tool-agent__legs" d={`M${cx - 9} ${hip}V${foot - 2}M${cx + 9} ${hip}V${foot - 2}`} />
      <rect className="en-tool-agent__belt" x={cx - belt.half} y={belt.y} width={2 * belt.half} height={belt.h} rx={3} />
      {/* A wrench at the left hip: a handle and an open jaw. */}
      <path className="en-tool-agent__tool" d={`M${cx - belt.half + 3} ${hip}V${hip + 8}M${cx - belt.half - 3} ${hip + 14}L${cx - belt.half + 3} ${hip + 8}L${cx - belt.half + 9} ${hip + 14}`} />
      {/* A hammer at the right hip: a handle and its head across it. */}
      <path className="en-tool-agent__tool" d={`M${cx + belt.half - 3} ${hip}V${hip + 14}M${cx + belt.half - 11} ${hip + 3}H${cx + belt.half + 5}`} />
      <Agent id={headOf(id)} at={head} role="builder" r={13} hue="process" />
    </g>
  );
}
