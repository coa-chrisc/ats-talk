/**
 * Slide 4's places: one timeline across the whole drawing width, its first
 * year at its left end and its last at its right end; three figures
 * standing on it, a speech bubble near the start, a draft and the person
 * who signs it partway, the deck's hexagon agent on the line's right half,
 * each named under the line with its caption under its name; and centred
 * under the agent a loop, a ring with five stops on it, each named outside
 * the ring, and the deck's closed gate across the ring at its left side,
 * where the loop starts and stops, named to its left. Words are read from
 * the script, by position.
 */
import { box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { AGENT, GATE } from "../department-map";
import { LABEL_LINE, SAFE, TEXT_LINE, contentTop, layerOf, round } from "./layout";

const [FROM, UNTIL, CHATBOT, ANSWERS, COPILOT, DECIDES, AGENT_NAME, DOES, ...LOOP] = shown("agents", "play");
const STOP_NAMES = LOOP.slice(0, 5);
const [BOUNDARY] = LOOP.slice(5);

const TOP = contentTop("agents");

/** How tall each figure stands: the tallest drawing, 80 px. */
const FIGURE_H = 80;
/** The figures stand on the line: each drawing's foot is this far over it. */
const STAND = 10;
/** The line: the full drawing width, low enough that the figures stand on it with their tops on the drawing's top. */
const LINE_Y = TOP + FIGURE_H + STAND;
const LINE = { x0: SAFE.left + 16, x1: SAFE.right, y: LINE_Y } as const;
/** A short upright tick at each end, so the line reads as a span of time with a start and an end. */
const TICK = 14;
/** The years sit under the line at its two ends, at the 32 px text size. */
const YEAR_Y = LINE_Y + 30;

/** Where each figure stands along the line, as a fraction of its length: the bubble near 2023, the copilot partway, the agent on the line's right half, room left past it for the loop's names. */
const ALONG = [0.13, 0.5, 0.8] as const;
const xAt = (k: number) => Math.round(LINE.x0 + k * (LINE.x1 - LINE.x0));
/** A figure's name under the line at the text size, and its caption under the name at the label size. */
const NAME_Y = LINE_Y + 30;
export const CAPTION_Y = Math.round(NAME_Y + TEXT_LINE / 2 + LABEL_LINE / 2 + 2);
/** The agent drawn 80 px tall: the map's hexagon at this scale. */
export const AGENT_SCALE = Math.floor((FIGURE_H / AGENT.h) * 100) / 100;

const names = [
  { text: CHATBOT, caption: ANSWERS, kind: "bubble" },
  { text: COPILOT, caption: DECIDES, kind: "draft" },
  { text: AGENT_NAME, caption: DOES, kind: "agent" },
] as const;

/**
 * The loop under the agent: a ring of 120 px radius (half as wide again as
 * the loop it replaces) centred on the agent's x, its top 25 px under the
 * agent's caption and its foot 2 px over the drawing's foot. It goes round
 * clockwise from its left side, where the gate stands, so the gate is
 * where the loop starts and where it stops. The five stops stand a sixth
 * of the ring apart after the gate, each a ring of 16 px; each name sits
 * outside its stop, 12 px clear of it, to the right on the ring's right
 * half and to the left on its left half.
 */
export const LOOP_RING = { r: 120, stop: 16, gap: 12 } as const;
const RING_C: Point = { x: xAt(ALONG[2]), y: TOP + 322 };
/** The gate's angle, the ring's left side (the stage's y grows downward, so angles grow clockwise), and each stop's after it. */
const GATE_DEG = 180;
const angleOf = (i: number) => (GATE_DEG + (i + 1) * 60) % 360;
const onRing = (deg: number, r: number = LOOP_RING.r): Point => ({ x: round(RING_C.x + r * Math.cos((deg * Math.PI) / 180)), y: round(RING_C.y + r * Math.sin((deg * Math.PI) / 180)) });
/** The gate stands across the ring at its left side, at the map's size, centred on the ring's line, its bars across it; its name 24 px left of its left post. */
const GATE_AT = onRing(GATE_DEG);
const GATE_SCALE = 1;
const GATE_HALF = (GATE.span / 2) * GATE_SCALE;
const GATE_H = GATE.h * GATE_SCALE;

export const AGENTS = {
  ...layerOf("agents"),
  line: { key: "agents.line", ...LINE },
  ticks: [
    { key: "agents.tick.0", at: { x: LINE.x0, y: LINE.y } as Point, h: TICK },
    { key: "agents.tick.1", at: { x: LINE.x1, y: LINE.y } as Point, h: TICK },
  ],
  years: [
    { key: "agents.year.0", text: FROM, at: { x: LINE.x0, y: YEAR_Y } as Point, anchor: "start" as const },
    { key: "agents.year.1", text: UNTIL, at: { x: LINE.x1, y: YEAR_Y } as Point, anchor: "end" as const },
  ],
  figures: names.map((entry, i) => {
    const x = xAt(ALONG[i]);
    return {
      key: `agents.figure.${i}`,
      kind: entry.kind,
      along: ALONG[i],
      /** Where the drawing stands: its foot's middle, just over the line. */
      foot: { x, y: LINE_Y - STAND } as Point,
      /** The box each drawing fills over its foot (parts-figures.tsx draws to it). */
      at: box(x - 70, LINE_Y - STAND - FIGURE_H, 140, FIGURE_H),
      name: { key: `agents.name.${i}`, text: entry.text, at: { x, y: NAME_Y } as Point },
      caption: { key: `agents.caption.${i}`, text: entry.caption, at: { x, y: CAPTION_Y } as Point },
    };
  }),
  loop: {
    key: "agents.loop",
    centre: RING_C,
    r: LOOP_RING.r,
    stops: STOP_NAMES.map((text, i) => {
      const deg = angleOf(i);
      const at = onRing(deg);
      const right = Math.cos((deg * Math.PI) / 180) > 0;
      const reach = LOOP_RING.stop + LOOP_RING.gap;
      return {
        key: `agents.stop.${i}`,
        /** How far round the ring the stop is, from the gate, clockwise. */
        along: (i + 1) / 6,
        deg,
        at,
        name: {
          key: `agents.stop.${i}.name`,
          text,
          at: { x: round(at.x + (right ? reach : -reach)), y: at.y } as Point,
          anchor: right ? ("start" as const) : ("end" as const),
        },
      };
    }),
    gate: {
      key: "agents.gate",
      /** Where the ring passes through it, and its foot, half its height under that. */
      at: GATE_AT,
      foot: { x: GATE_AT.x, y: round(GATE_AT.y + GATE_H / 2) } as Point,
      scale: GATE_SCALE,
      name: { key: "agents.gate.name", text: BOUNDARY, at: { x: round(GATE_AT.x - GATE_HALF - 24), y: GATE_AT.y } as Point },
    },
  },
};
