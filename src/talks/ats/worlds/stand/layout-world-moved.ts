/**
 * Slide 2's places: one timeline across the whole drawing width, its first
 * year at its left end and its last at its right end; three figures
 * standing on it, a speech bubble near the start, a draft and the person
 * who signs it partway, an agent wearing a belt of tools near the end, each
 * named under the line with its caption under its name; and under all of
 * it four large figures in a row across the stage, the last one apart at
 * the right. Words are read from the script, by position.
 */
import { box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { LABEL_LINE, SAFE, TEXT_LINE, contentTop, figureRuns, layerOf } from "./layout";

const [FROM, UNTIL, CHATBOT, ANSWERS, COPILOT, APPROVES, AGENT, DOES, ...FIGURES] = shown("world-moved", "play");

const TOP = contentTop("world-moved");

/** The line: the full drawing width, low enough that the tallest figure (80 px) stands on it under the story band with room. */
const LINE_Y = TOP + 116;
const LINE = { x0: SAFE.left + 16, x1: SAFE.right, y: LINE_Y } as const;
/** A short upright tick at each end, so the line reads as a span of time with a start and an end. */
const TICK = 14;
/** The years sit under the line at its two ends, at the 32 px text size: smaller than the figures below, which are the point. */
const YEAR_Y = LINE_Y + 30;

/** Where each figure stands along the line, as a fraction of its length: the bubble near 2023, the copilot partway, the agent near 2026. */
const ALONG = [0.13, 0.5, 0.86] as const;
const xAt = (k: number) => Math.round(LINE.x0 + k * (LINE.x1 - LINE.x0));
/** A figure's name under the line at the text size, and its caption under the name at the label size. */
const NAME_Y = LINE_Y + 30;
const CAPTION_Y = Math.round(NAME_Y + TEXT_LINE / 2 + LABEL_LINE / 2 + 2);
/** The figures stand on the line: each drawing's foot is this far over it. */
const STAND = 10;

const names = [
  { text: CHATBOT, caption: ANSWERS, kind: "bubble" },
  { text: COPILOT, caption: APPROVES, kind: "draft" },
  { text: AGENT, caption: DOES, kind: "belted" },
] as const;

/**
 * The four figures: the digits at 112 px, the words round them at 40 px,
 * on one baseline; the caption under each at the 32 px text size. The
 * three indigo figures start 406 px apart (each about 340 px wide, erring
 * wide, with its caption under it); the grey one ends at the drawing's
 * right edge, its start 116 px past the third's end, so it reads apart.
 */
export const FIGURE = { size: 112, small: 40 } as const;
/** The figures' baseline: their numerals (about 81 px tall) clear the captions above by about 60 px. */
const BASE_Y = CAPTION_Y + 160;
const STAT_CAPTION_Y = BASE_Y + 44;
const COLUMNS = [SAFE.left + 16, 502, 908] as const;
/** The grey figure is set from its right end, at the drawing's right edge. */
const LAST_END = SAFE.right - 16;

export const WORLD_MOVED = {
  ...layerOf("world-moved"),
  line: { key: "world-moved.line", ...LINE },
  ticks: [
    { key: "world-moved.tick.0", at: { x: LINE.x0, y: LINE.y } as Point, h: TICK },
    { key: "world-moved.tick.1", at: { x: LINE.x1, y: LINE.y } as Point, h: TICK },
  ],
  years: [
    { key: "world-moved.year.0", text: FROM, at: { x: LINE.x0, y: YEAR_Y } as Point, anchor: "start" as const },
    { key: "world-moved.year.1", text: UNTIL, at: { x: LINE.x1, y: YEAR_Y } as Point, anchor: "end" as const },
  ],
  figures: names.map((entry, i) => {
    const x = xAt(ALONG[i]);
    return {
      key: `world-moved.figure.${i}`,
      kind: entry.kind,
      along: ALONG[i],
      /** Where the drawing stands: its foot's middle, just over the line. */
      foot: { x, y: LINE_Y - STAND } as Point,
      /** The box each drawing fills over its foot (parts-figures.tsx draws to it). */
      at: box(x - 70, LINE_Y - STAND - 80, 140, 80),
      name: { key: `world-moved.name.${i}`, text: entry.text, at: { x, y: NAME_Y } as Point },
      caption: { key: `world-moved.caption.${i}`, text: entry.caption, at: { x, y: CAPTION_Y } as Point },
    };
  }),
  stats: [0, 1, 2, 3].map((i) => {
    const label = FIGURES[2 * i];
    return {
      key: `world-moved.stat.${i}`,
      text: label,
      runs: figureRuns(label),
      /** The last figure is grey: a problem, not a measure of progress. */
      grey: i === 3,
      /** Where its baseline starts, or for the grey one ends (`anchor`). */
      at: { x: i === 3 ? LAST_END : COLUMNS[i], y: BASE_Y } as Point,
      anchor: i === 3 ? ("end" as const) : ("start" as const),
      caption: { key: `world-moved.stat.${i}.caption`, text: FIGURES[2 * i + 1], at: { x: i === 3 ? LAST_END : COLUMNS[i], y: STAT_CAPTION_Y } as Point },
    };
  }),
};
