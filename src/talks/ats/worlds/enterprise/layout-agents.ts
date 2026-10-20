/**
 * Slide 4's places: one timeline across the whole drawing width, its first
 * year at its left end and its last at its right end; three figures
 * standing on it, a speech bubble near the start, a draft and the person
 * who signs it partway, an agent wearing a belt of tools near the end, each
 * named under the line with its caption under its name; and under the
 * agent a loop, a ring with five stops on it, each named outside the ring,
 * and a short bar across the ring where it closes, named to its left.
 * Words are read from the script, by position.
 */
import { box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { LABEL_LINE, SAFE, TEXT_LINE, contentTop, layerOf, round } from "./layout";

const [FROM, UNTIL, CHATBOT, ANSWERS, COPILOT, DECIDES, AGENT, DOES, ...LOOP] = shown("agents", "play");
const STOP_NAMES = LOOP.slice(0, 5);
const [BOUNDARY] = LOOP.slice(5);

const TOP = contentTop("agents");

/** The line: the full drawing width, low enough that the tallest figure (80 px) stands on it under the story band with room. */
const LINE_Y = TOP + 116;
const LINE = { x0: SAFE.left + 16, x1: SAFE.right, y: LINE_Y } as const;
/** A short upright tick at each end, so the line reads as a span of time with a start and an end. */
const TICK = 14;
/** The years sit under the line at its two ends, at the 32 px text size. */
const YEAR_Y = LINE_Y + 30;

/** Where each figure stands along the line, as a fraction of its length: the bubble near 2023, the copilot partway, the agent near 2026. */
const ALONG = [0.13, 0.5, 0.86] as const;
const xAt = (k: number) => Math.round(LINE.x0 + k * (LINE.x1 - LINE.x0));
/** A figure's name under the line at the text size, and its caption under the name at the label size. */
const NAME_Y = LINE_Y + 30;
export const CAPTION_Y = Math.round(NAME_Y + TEXT_LINE / 2 + LABEL_LINE / 2 + 2);
/** The figures stand on the line: each drawing's foot is this far over it. */
const STAND = 10;

const names = [
  { text: CHATBOT, caption: ANSWERS, kind: "bubble" },
  { text: COPILOT, caption: DECIDES, kind: "draft" },
  { text: AGENT, caption: DOES, kind: "belted" },
] as const;

/**
 * The loop under the agent: a ring of 80 px radius centred on the agent's
 * x, its top 59 px under the agent's caption so a stop's name fits between,
 * its lowest stops' feet 24 px over the drawing's foot. Its five stops
 * stand a fifth of the ring apart, the first at the top and the rest
 * clockwise, each a ring of 13 px; each name sits outside its stop, 12 px
 * clear of it, to the right on the ring's right half and to the left on
 * its left half (the top stop's name above the ring's shoulder, right of
 * it). The bar crosses the ring halfway between the last stop and the
 * first, where the loop would close, 36 px long, its name to its left.
 */
export const LOOP_RING = { r: 80, stop: 13, gap: 12, bar: 36 } as const;
const RING_C: Point = { x: xAt(ALONG[2]), y: TOP + 342 };
const angleOf = (i: number) => -90 + i * 72;
const onRing = (deg: number, r: number = LOOP_RING.r): Point => ({ x: round(RING_C.x + r * Math.cos((deg * Math.PI) / 180)), y: round(RING_C.y + r * Math.sin((deg * Math.PI) / 180)) });
/** The bar's angle: between the last stop (198 degrees) and the first (270). */
const BAR_DEG = 234;
/** The top stop's name sits up and to the right, clear of the ring's arc as it falls away. */
const TOP_NAME_RISE = 16;

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
      at: box(x - 70, LINE_Y - STAND - 80, 140, 80),
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
      const right = i === 0 || Math.cos((deg * Math.PI) / 180) > 0;
      const reach = LOOP_RING.stop + LOOP_RING.gap;
      return {
        key: `agents.stop.${i}`,
        /** How far round the ring the stop is, from the top, clockwise. */
        along: i / 5,
        at,
        name: {
          key: `agents.stop.${i}.name`,
          text,
          at: { x: round(at.x + (right ? reach : -reach)), y: round(i === 0 ? at.y - TOP_NAME_RISE : at.y) } as Point,
          anchor: right ? ("start" as const) : ("end" as const),
        },
      };
    }),
    bar: {
      key: "agents.boundary",
      along: (BAR_DEG + 90) / 360,
      from: onRing(BAR_DEG, LOOP_RING.r - LOOP_RING.bar / 2),
      to: onRing(BAR_DEG, LOOP_RING.r + LOOP_RING.bar / 2),
      name: { key: "agents.boundary.name", text: BOUNDARY, at: { x: round(onRing(BAR_DEG).x - LOOP_RING.bar / 2 - 24), y: round(onRing(BAR_DEG).y - 6) } as Point },
    },
  },
};
