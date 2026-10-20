/**
 * The stand world's drawings for what the kit has no part for: slide 2's
 * speech bubble, its draft with a person beside it, and its agent wearing a
 * belt of tools; slide 3's runner and fence post; slide 4's lantern; slide
 * 4a's fence, a slot of the application, a nameplate and a step of the
 * stair with its gate. Script-free: every word is passed in. SVG for the
 * plane's marks, moved with the house moves only (stand.css paints them).
 */
"use client";

import { AGENT_R, Agent, Person, type Box, type Point } from "@/components/deck/kit";

/* Slide 2 */

/** The ids of the parts inside slide 2's figures that move on their own: the person beside the draft, who draws on, and the belted figure's head ring, which fills. */
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
    <g className="sd-bubble" data-build={id}>
      <path d={d} />
      {[0, 1, 2].map((i) => (
        <circle key={i} className="sd-bubble__dot" cx={x + 34 + i * 22} cy={y + h / 2} r={6} />
      ))}
    </g>
  );
}

/** A draft page, a few lines written on it, and the person who reads it standing beside it: the draft is written for a person to sign. */
export function DraftAndSigner({ id, at }: { id: string; at: Box }) {
  const page = { x: at.x + 18, y: at.y + 4, w: 58, h: 76 };
  return (
    <g className="sd-copilot" data-build={id}>
      <path className="sd-copilot__page" d={`M${page.x} ${page.y}H${page.x + page.w - 16}L${page.x + page.w} ${page.y + 16}V${page.y + page.h}H${page.x}Z`} />
      {[20, 32, 44, 56].map((dy, i) => (
        <path key={dy} className="sd-copilot__writing" d={`M${page.x + 10} ${page.y + dy}H${page.x + page.w - (i === 3 ? 26 : 12)}`} />
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
    <g className="sd-tool-agent" data-build={id}>
      <path className="sd-tool-agent__body" d={`M${cx - torso.half + 4} ${torso.waist}L${cx - torso.half} ${torso.top + 10}Q${cx - torso.half} ${torso.top} ${cx - torso.half + 10} ${torso.top}H${cx + torso.half - 10}Q${cx + torso.half} ${torso.top} ${cx + torso.half} ${torso.top + 10}L${cx + torso.half - 4} ${torso.waist}Z`} />
      <path className="sd-tool-agent__legs" d={`M${cx - 9} ${hip}V${foot - 2}M${cx + 9} ${hip}V${foot - 2}`} />
      <rect className="sd-tool-agent__belt" x={cx - belt.half} y={belt.y} width={2 * belt.half} height={belt.h} rx={3} />
      {/* A wrench at the left hip: a handle and an open jaw. */}
      <path className="sd-tool-agent__tool" d={`M${cx - belt.half + 3} ${hip}V${hip + 8}M${cx - belt.half - 3} ${hip + 14}L${cx - belt.half + 3} ${hip + 8}L${cx - belt.half + 9} ${hip + 14}`} />
      {/* A hammer at the right hip: a handle and its head across it. */}
      <path className="sd-tool-agent__tool" d={`M${cx + belt.half - 3} ${hip}V${hip + 14}M${cx + belt.half - 11} ${hip + 3}H${cx + belt.half + 5}`} />
      <Agent id={headOf(id)} at={head} role="builder" r={13} hue="process" />
    </g>
  );
}

/* Slide 3 */

/** A runner seen side on, its foot at `at`, facing the way it runs: a head, a leaning body and legs mid-stride. In indigo or in green. */
export function Runner({ id, at, h, tone, facing = "right" }: { id: string; at: Point; h: number; tone: "catalog" | "process"; facing?: "left" | "right" }) {
  const k = h / 40;
  const f = facing === "left" ? -1 : 1;
  const p = (x: number, y: number) => `${Math.round((at.x + f * x * k) * 100) / 100} ${Math.round((at.y + y * k) * 100) / 100}`;
  return (
    <g className={`sd-runner sd-runner--${tone}`} data-build={id}>
      <circle className="sd-runner__head" cx={at.x + f * 3 * k} cy={at.y - 34 * k} r={5.5 * k} />
      <path className="sd-runner__limb" style={{ strokeWidth: 5 * k }} d={`M${p(1, -26)}L${p(-2, -13)}M${p(-2, -13)}L${p(6, -6)}L${p(4, 0)}M${p(-2, -13)}L${p(-9, -5)}L${p(-14, -6)}M${p(1, -24)}L${p(9, -18)}M${p(1, -24)}L${p(-7, -20)}`} />
    </g>
  );
}

/** A solid fence post with a pointed cap, its foot on the ground. */
export function FencePost({ id, x, w, top, foot }: { id: string; x: number; w: number; top: number; foot: number }) {
  return <path className="sd-post" data-build={id} d={`M${x} ${foot}V${top + w / 2}L${x + w / 2} ${top}L${x + w} ${top + w / 2}V${foot}Z`} />;
}

/* Slide 4 */

/**
 * A lantern lit inside a department's box: the box washes with the
 * process's green and a lantern stands in it, its handle, cap and glass in
 * green, its glass filled. All of it arrives with `--k` (0 dark, 1 lit),
 * so a lit box is one move.
 */
export function Lantern({ id, cell, at, scale }: { id: string; cell: Box; at: Point; scale: number }) {
  const w = 30 * scale;
  const h = 44 * scale;
  const x = at.x - w / 2;
  const y = at.y - h / 2;
  return (
    <g className="sd-lantern" data-build={id}>
      <rect className="sd-lantern__wash" x={cell.x} y={cell.y} width={cell.w} height={cell.h} rx={8} />
      <g className="sd-lantern__lamp" style={{ transformOrigin: `${at.x}px ${at.y}px` }}>
        <path className="sd-lantern__line" d={`M${x + w * 0.3} ${y + h * 0.14}A${w * 0.2} ${w * 0.2} 0 0 1 ${x + w * 0.7} ${y + h * 0.14}`} />
        <rect className="sd-lantern__cap" x={x + w * 0.12} y={y + h * 0.14} width={w * 0.76} height={h * 0.1} rx={2} />
        <rect className="sd-lantern__glass" x={x + w * 0.18} y={y + h * 0.26} width={w * 0.64} height={h * 0.56} rx={w * 0.14} />
        <rect className="sd-lantern__cap" x={x + w * 0.12} y={y + h * 0.84} width={w * 0.76} height={h * 0.1} rx={2} />
      </g>
    </g>
  );
}

/* Slide 4a */

/** The yard's fence: a top rail, a foot rail and posts along them, drawn on as one outline (`draw`), the posts with it. */
export function Fence({ id, at, posts }: { id: string; at: Box; posts: readonly number[] }) {
  return (
    <g className="sd-fence" data-build={id}>
      <rect className="sd-fence__yard" x={at.x} y={at.y} width={at.w} height={at.h} rx={6} />
      <rect className="sd-fence__rail dk-draw" x={at.x} y={at.y} width={at.w} height={at.h} rx={6} pathLength={1} />
      {posts.flatMap((x) => [
        <path key={`t${x}`} className="sd-fence__post" d={`M${x} ${at.y - 10}V${at.y + 10}`} />,
        <path key={`b${x}`} className="sd-fence__post" d={`M${x} ${at.y + at.h - 10}V${at.y + at.h + 10}`} />,
      ])}
    </g>
  );
}

/** A slot of the application's outline, filled with a block as an agent builds it (`--k`, from its middle). */
export function Slot({ id, at }: { id: string; at: Box }) {
  return (
    <g className="sd-slot" data-build={id}>
      <rect className="sd-slot__block" x={at.x + 3} y={at.y + 3} width={at.w - 6} height={at.h - 6} rx={4} />
    </g>
  );
}

/** A partner's nameplate: a white plate in a navy edge, its name set in it. */
export function Plate({ id, at, text }: { id: string; at: Box; text: string }) {
  return (
    <g className="sd-plate" data-build={id}>
      <rect className="sd-plate__face" x={at.x} y={at.y} width={at.w} height={at.h} rx={8} />
      <text className="dk-text sd-word sd-word--strong" x={at.x + at.w / 2} y={at.y + at.h / 2} textAnchor="middle" dominantBaseline="central">
        {text}
      </text>
    </g>
  );
}

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
  const d = `M${x0} ${gate.y}V${top}M${x1} ${gate.y}V${top}M${x0} ${top + 10}H${x1}M${x0} ${top + 24}H${x1}`;
  return (
    <g className="sd-step" data-build={id}>
      <rect className="sd-step__riser" x={at.x} y={at.y} width={at.w} height={at.h} />
      <rect className="sd-step__lit" x={at.x} y={at.y} width={at.w} height={at.h} />
      <path className="sd-step__tread" d={`M${at.x} ${at.y}H${at.x + at.w}`} />
      <text className="dk-label sd-word sd-word--strong" x={name.x} y={name.y} textAnchor="middle" dominantBaseline="central">
        {text}
      </text>
      <path className="sd-gate" d={d} />
      <path className="sd-gate sd-gate--lit" d={d} />
    </g>
  );
}

/** The agent ring radius every full-size agent in the world takes. */
export const AGENT = AGENT_R;
