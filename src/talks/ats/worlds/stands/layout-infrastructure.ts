/**
 * Slide 13's places. Over the left two thirds, the fenced yard, named over
 * its top left with its caption beside the name, and three tiles in a row
 * inside it, each with its name and its caption under it (broken on two
 * rows where it runs past the tile). Under the fence, a calendar strip of
 * weeks, a row of 52 for each year and a short third row, named under it;
 * beside the strip, two nameplates side by side and a third, dashed, a
 * little apart, its caption under it. The right third over the strip is
 * left empty: the yard reaches nothing there. Words are read from the
 * script, by position.
 *
 * The drawing has y 548 to 914, under a two-line title with two story lines.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { breakAfter, shown } from "../../script/find";
import { LABEL_LINE, TEXT_LINE, contentTop, layerOf, wordsWidth } from "./layout";

const [SANDBOX, CANNOT_REACH, MODELS, MODELS_CAPTION, PATHWAY, PATHWAY_CAPTION, ROUTE, ROUTE_CAPTION, EVERY_WEEK, MICROSOFT, QUISITIVE, AMAZON, JOINING] = shown("infrastructure", "play");

const TOP = contentTop("infrastructure");

/* The yard */

/** The yard's name and caption on one row over its top left, the name at the text size. */
const NAME_Y = TOP + 24;
/** The yard: the left two thirds, from x 96 to 1248, 160 px tall under its name. Posts every 72 px along its rails. */
const FENCE = box(96, TOP + 58, 1152, 160);
const POST_PITCH = 72;

/** Three tiles, 18 px inside the fence top and foot and 15 from its sides, 18 apart: 362 wide each, room for the longest name at the layout's safe measure. */
const TILE = { pad: 15, gap: 18, top: 18 } as const;
const TILE_W = (FENCE.w - 2 * TILE.pad - 2 * TILE.gap) / 3;
const TILE_H = FENCE.h - 2 * TILE.top;
/** A tile's words: its name 34 px under its top, its caption's first row 36 under that, its rows 30 apart, all 12 px in from its left. */
export const TILE_WORDS = { inset: 12, name: 34, caption: 70, pitch: 30 } as const;

/** A caption broken on two rows where it would run past its tile at the label size, after the word the layout names. */
const CAPTION_BREAKS: Record<string, string[]> = { [MODELS_CAPTION]: ["and"], [ROUTE_CAPTION]: ["designed,"] };
const rowsOf = (text: string) => breakAfter(text, ...(CAPTION_BREAKS[text] ?? []));

const tiles = [
  { text: MODELS, caption: MODELS_CAPTION },
  { text: PATHWAY, caption: PATHWAY_CAPTION },
  { text: ROUTE, caption: ROUTE_CAPTION },
].map((entry, i) => {
  const at = box(FENCE.x + TILE.pad + i * (TILE_W + TILE.gap), FENCE.y + TILE.top, TILE_W, TILE_H);
  return {
    key: `infrastructure.tile.${i}`,
    at,
    name: { text: entry.text, at: { x: at.x + TILE_WORDS.inset, y: at.y + TILE_WORDS.name } as Point },
    caption: { text: entry.caption, rows: rowsOf(entry.caption), at: { x: at.x + TILE_WORDS.inset, y: at.y + TILE_WORDS.caption } as Point },
  };
});

/* The calendar, under the fence */

/** 52 weeks to a row, two rows of years and 12 weeks of a third: over two years. Each week 14 px square, 18 apart; the rows 20 apart. */
export const WEEK = { cols: 52, weeks: 116, w: 14, pitch: 18, rowPitch: 20 } as const;
/** The strip 36 px under the fence's foot (its posts stand 10 below it). */
const CAL = { x: 96, y: FENCE.y + FENCE.h + 36 } as const;
const weeks: Box[] = Array.from({ length: WEEK.weeks }, (_, n) => box(CAL.x + (n % WEEK.cols) * WEEK.pitch, CAL.y + Math.floor(n / WEEK.cols) * WEEK.rowPitch, WEEK.w, WEEK.w));
const CAL_W = (WEEK.cols - 1) * WEEK.pitch + WEEK.w;
const CAL_ROWS = Math.ceil(WEEK.weeks / WEEK.cols);
const CAL_H = (CAL_ROWS - 1) * WEEK.rowPitch + WEEK.w;
/** The strip's name 28 px under its last row. */
const EVERY_AT: Point = { x: CAL.x, y: CAL.y + CAL_H + 28 };

/* The nameplates, beside the strip */

/** Plates 52 px tall, as wide as the name at the text size and 24 to spare; the two 16 apart and 48 right of the strip, the dashed one 64 further on. */
const PLATE = { h: 52, w: 196, gap: 16 } as const;
const PLATE_Y = CAL.y - 2;
const MICROSOFT_AT = box(CAL.x + CAL_W + 48, PLATE_Y, PLATE.w, PLATE.h);
const QUISITIVE_AT = box(MICROSOFT_AT.x + PLATE.w + PLATE.gap, PLATE_Y, PLATE.w, PLATE.h);
const AMAZON_AT = box(QUISITIVE_AT.x + PLATE.w + 64, PLATE_Y, 160, PLATE.h);
/** The dashed plate's caption centred under it, on the strip's name's row. */
const JOINING_AT: Point = { x: AMAZON_AT.x + AMAZON_AT.w / 2, y: EVERY_AT.y };

export const INFRASTRUCTURE = {
  ...layerOf("infrastructure"),
  name: { key: "infrastructure.name", text: SANDBOX, at: { x: FENCE.x + 16, y: NAME_Y } as Point },
  caption: { key: "infrastructure.caption", text: CANNOT_REACH, at: { x: FENCE.x + 16 + wordsWidth(SANDBOX, 32) + 24, y: NAME_Y } as Point },
  fence: {
    key: "infrastructure.fence",
    at: FENCE,
    posts: Array.from({ length: Math.floor(FENCE.w / POST_PITCH) + 1 }, (_, i) => Math.min(FENCE.x + i * POST_PITCH, FENCE.x + FENCE.w)),
  },
  tiles,
  calendar: { key: "infrastructure.calendar", at: box(CAL.x, CAL.y, CAL_W, CAL_H), weeks: { key: "infrastructure.weeks", at: weeks } },
  every: { key: "infrastructure.every", text: EVERY_WEEK, at: EVERY_AT },
  plates: [
    { key: "infrastructure.plate.0", text: MICROSOFT, at: MICROSOFT_AT },
    { key: "infrastructure.plate.1", text: QUISITIVE, at: QUISITIVE_AT },
  ],
  joining: { key: "infrastructure.amazon", text: AMAZON, at: AMAZON_AT, caption: { key: "infrastructure.amazon.caption", text: JOINING, at: JOINING_AT } },
};

/** The rows a tile's words take, for the layout test: its name's, then each caption row's. */
export const tileRows = (tile: (typeof tiles)[number]) => [
  { y: tile.name.at.y, line: TEXT_LINE },
  ...tile.caption.rows.map((_, i) => ({ y: tile.caption.at.y + i * TILE_WORDS.pitch, line: LABEL_LINE })),
];
