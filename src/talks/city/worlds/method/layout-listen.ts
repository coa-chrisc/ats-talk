/**
 * Slide 14's places: the five questions down the stage's left in speech
 * bubbles, the last one's tail toward the table; a round table seen from
 * above with eight chairs round it, a plain seated figure filling each,
 * named once over it; and a notebook page at the right, its heading over
 * lines of writing. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { LABEL_LINE, SAFE, TEXT_LINE, contentTop, layerOf, round, wordsWidth } from "./layout";

const [LEADERSHIP, SLOW, MORE, BROKEN, GOALS, RESIDENTS, OWN_WORDS] = shown("listen", "play");
/** The questions, in the order they are asked. */
const QUESTIONS = [SLOW, MORE, BROKEN, GOALS, RESIDENTS];

/** Where the slide's drawing starts, under its story band. */
const TOP = contentTop("listen");

/**
 * A chair and the figure who sits in it, upright about its seat point, as a
 * meeting is drawn round a table seen from above: the chair's back and seat
 * behind; the figure a head over a pair of shoulders, in navy. Its box, the
 * chair's back, the head and the shoulders, in its own pixels.
 */
export const FIGURE = {
  w: 56,
  h: 60,
  back: { x: -26, y: -30, w: 52, h: 50, rx: 12 },
  seat: { x: -28, y: 18, w: 56, h: 10, rx: 5 },
  head: { y: -9, r: 11 },
  shoulders: { w: 40, top: 6, foot: 28 },
} as const;

/**
 * A speech bubble's padding round its words, its height, how far its tail
 * reaches under it, and the gap between one and the next. The questions
 * stand in one column from the stage's left edge, in the order they are
 * asked: at 32 px, two rows of them are wider than the room left of the
 * page and taller than the room over the top seat.
 */
const BUBBLE = { pad: 24, h: 60, tail: 16, gap: 20 } as const;
const BUBBLES: Box[] = QUESTIONS.map((text, i) => box(SAFE.left, TOP + i * (BUBBLE.h + BUBBLE.gap), wordsWidth(text, 32) + 2 * BUBBLE.pad, BUBBLE.h));

/** The page: at the stage's right, as tall as the drawing's room under its rings; its binding rings along its top, its heading and a rule, then its lines. */
const PAGE = box(1310, TOP + 20, 500, SAFE.bottom - TOP - 20);
const RINGS = 9;
const LINES = { first: PAGE.y + 118, pitch: 40, widths: [420, 372, 436, 300, 404, 352, 228], h: 10, inset: 32 } as const;

/** Eight seats, the first at the top, each this far from the table's middle. */
const SEATS = { count: 8, r: 128 } as const;
/** The table: midway between the widest question's right end and the page, its middle low enough that the bottom seat clears the safe line. */
const TABLE = {
  c: { x: Math.round((Math.max(...BUBBLES.map((at) => at.x + at.w)) + PAGE.x) / 2), y: SAFE.bottom - SEATS.r - FIGURE.h / 2 - 2 } as Point,
  r: 80,
};

export const LISTEN = {
  ...layerOf("listen"),
  table: { key: "listen.table", c: TABLE.c, r: TABLE.r },
  seats: Array.from({ length: SEATS.count }, (_, i) => {
    const rad = ((-90 + (360 / SEATS.count) * i) * Math.PI) / 180;
    return {
      key: `listen.seat.${i}`,
      sitter: `listen.seat.${i}.sitter`,
      at: { x: round(TABLE.c.x + SEATS.r * Math.cos(rad)), y: round(TABLE.c.y + SEATS.r * Math.sin(rad)) },
    };
  }),
  /** The figures' name, once, centred over the table, 24 px over the top seat. */
  name: { key: "listen.name", text: LEADERSHIP, at: { x: TABLE.c.x, y: TABLE.c.y - SEATS.r - FIGURE.h / 2 - 24 - LABEL_LINE / 2 } },
  bubbles: QUESTIONS.map((text, i) => {
    const at = BUBBLES[i];
    /** Only the last, the one nearest the table, has a tail: it leaves the bubble's foot near its right end and points down toward the table. */
    const base = at.x + at.w - 64;
    const tail = i === QUESTIONS.length - 1 ? { base, tip: { x: base + 22, y: at.y + at.h + BUBBLE.tail } } : undefined;
    return { key: `listen.bubble.${i}`, text, at, tail };
  }),
  page: {
    key: "listen.page",
    at: PAGE,
    rings: Array.from({ length: RINGS }, (_, i) => ({ x: PAGE.x + 34 + i * ((PAGE.w - 68) / (RINGS - 1)), y: PAGE.y })),
    heading: { key: "listen.page.heading", text: OWN_WORDS, at: { x: PAGE.x + LINES.inset, y: PAGE.y + 26 + TEXT_LINE / 2 + 6 } },
    rule: { y: PAGE.y + 90, x0: PAGE.x + LINES.inset, x1: PAGE.x + PAGE.w - LINES.inset },
    lines: LINES.widths.map((w, i) => {
      const y = LINES.first + i * LINES.pitch;
      return { key: `listen.line.${i}`, at: box(PAGE.x + LINES.inset, y, w, LINES.h), ruled: y + LINES.h + 12 };
    }),
  },
};
