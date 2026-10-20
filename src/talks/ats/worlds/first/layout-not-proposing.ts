/**
 * Slide 16's places, in two rows that never overlap: on top, three dashed
 * grey outlines spanning the band, each its name in the middle and a cross
 * of two lines over it; below, left of centre, a green round table seen
 * from above with its chairs and a green calendar page beside it, each
 * named under it, and at the right an indigo tag with its caption under it. Words
 * are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { LABEL_LINE, SAFE, TEXT_LINE, contentTop, layerOf, polar } from "./layout";

const [PLATFORM, ORGANIZATION, DEPLOY, CONVERSATIONS, TIME, INDIVIDUALLY, BELOW] = shown("not-proposing", "play");

/** Where the slide's drawing starts, under its story band. */
const TOP = contentTop("not-proposing");

/**
 * The top row: three outlines spanning the band. The dashed frame reaches
 * 4 px outside its box, so the row starts 4 px in from the band's left
 * edge; three of 504 and two gaps of 100 end it inside the right. They
 * stand 4 px under the drawing's top and are 150 tall, each name in its
 * middle.
 */
const ROW = { x: SAFE.left + 4, y: TOP + 4, w: 504, h: 150, gap: 100 } as const;
/** A cross keeps this far in from its outline's corners, so its ends never touch the dashes. */
const CROSS_IN = { x: 28, y: 18 } as const;

/** Every outline's box, left to right. */
const OUTLINES: Box[] = [0, 1, 2].map((i) => box(ROW.x + i * (ROW.w + ROW.gap), ROW.y, ROW.w, ROW.h));

/** The bottom row starts 56 px under the outlines' dashed edge: the rejected things above, the real steps below, nothing covering anything. */
const BELOW_TOP = ROW.y + ROW.h + 4 + 56;

/**
 * The table, seen from above: its top 44 across the radius, six chairs on a
 * ring of 68 round it. Its middle stands low enough that the calendar's
 * rings, 14 px over its top, clear the bottom row's top, and left of the
 * stage's middle, so the table and the calendar beside it sit left of
 * centre.
 */
/** A chair seen from above: wider along the table's edge than it is deep. */
export const CHAIR_9 = { w: 36, h: 26, rx: 8 } as const;
const TABLE = { c: { x: 560, y: BELOW_TOP + 14 + 68 + 26 / 2 } as Point, r: 44, ring: 68 } as const;
const CHAIRS = 6;

/** The calendar page: right of the table's chairs with 120 px of air, so the two 32 px names under them keep about 60 px between them; its top level with the top chair's outer edge, its foot with the bottom chair's. */
const CALENDAR = box(TABLE.c.x + TABLE.ring + CHAIR_9.h / 2 + 120, TABLE.c.y - TABLE.ring - CHAIR_9.h / 2, 170, 2 * TABLE.ring + CHAIR_9.h);
/** The page's header band, how many days a row and how many rows, and the gap round the days. */
const DAYS = { header: 40, cols: 5, rows: 4, pad: 14, gap: 8 } as const;

/** The two names under the scene stand on one line, 4 px under the lowest chair's widest reach. */
const NAMES_Y = TABLE.c.y + TABLE.ring + CHAIR_9.w / 2 + 4 + TEXT_LINE / 2;

/**
 * The tag at the right of the bottom row: a label with a pointed left end,
 * 520 wide for its 32 px semibold words (about 420) past the point and the
 * hole, its right end 40 in from the band's edge, level with the table's
 * middle; its caption centred under it.
 */
const TAG = box(SAFE.right - 40 - 520, TABLE.c.y - 36, 520, 72);
export const TAG_9 = { point: 22, hole: 6, pad: 48 } as const;

export const NOT_PROPOSING = {
  ...layerOf("not-proposing"),
  outlines: OUTLINES.map((at, i) => ({
    key: `not-proposing.outline.${i}`,
    text: [PLATFORM, ORGANIZATION, DEPLOY][i],
    at,
    name: { key: `not-proposing.outline.${i}.name`, at: { x: at.x + at.w / 2, y: at.y + at.h / 2 } },
    cross: {
      /** The first stroke, top left to bottom right, then the second, top right to bottom left. */
      strokes: [
        { key: `not-proposing.cross.${i}.a`, d: `M${at.x + CROSS_IN.x} ${at.y + CROSS_IN.y}L${at.x + at.w - CROSS_IN.x} ${at.y + at.h - CROSS_IN.y}` },
        { key: `not-proposing.cross.${i}.b`, d: `M${at.x + at.w - CROSS_IN.x} ${at.y + CROSS_IN.y}L${at.x + CROSS_IN.x} ${at.y + at.h - CROSS_IN.y}` },
      ],
    },
  })),
  table: {
    key: "not-proposing.table",
    c: TABLE.c,
    r: TABLE.r,
    /** The chairs, the first at the top, going round clockwise; each turned to face the table. */
    chairs: Array.from({ length: CHAIRS }, (_, i) => {
      const deg = -90 + (360 / CHAIRS) * i;
      return { key: `not-proposing.chair.${i}`, at: polar(TABLE.c, TABLE.ring, deg), deg };
    }),
    name: { key: "not-proposing.conversations", text: CONVERSATIONS, at: { x: TABLE.c.x, y: NAMES_Y } },
  },
  calendar: {
    key: "not-proposing.calendar",
    at: CALENDAR,
    header: DAYS.header,
    /** The two rings the page hangs from, a third of the way in from each side, over its top edge. */
    rings: [CALENDAR.x + CALENDAR.w / 3, CALENDAR.x + (2 * CALENDAR.w) / 3],
    days: Array.from({ length: DAYS.cols * DAYS.rows }, (_, n) => {
      const w = (CALENDAR.w - 2 * DAYS.pad - (DAYS.cols - 1) * DAYS.gap) / DAYS.cols;
      const h = (CALENDAR.h - DAYS.header - 2 * DAYS.pad - (DAYS.rows - 1) * DAYS.gap) / DAYS.rows;
      return box(CALENDAR.x + DAYS.pad + (n % DAYS.cols) * (w + DAYS.gap), CALENDAR.y + DAYS.header + DAYS.pad + Math.floor(n / DAYS.cols) * (h + DAYS.gap), w, h);
    }),
    name: { key: "not-proposing.time", text: TIME, at: { x: CALENDAR.x + CALENDAR.w / 2, y: NAMES_Y } },
  },
  tag: {
    key: "not-proposing.tag",
    at: TAG,
    text: INDIVIDUALLY,
    /** The words start past the point and the hole. */
    words: { x: TAG.x + TAG_9.pad, y: TAG.y + TAG.h / 2 },
    caption: { key: "not-proposing.caption", text: BELOW, at: { x: TAG.x + TAG.w / 2, y: TAG.y + TAG.h + 14 + LABEL_LINE / 2 } },
  },
};
