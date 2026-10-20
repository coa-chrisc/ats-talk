/**
 * Slide 19's places: three round tables side by side, seen from above, each
 * with six chairs and the head of a person seated in each, named under it; speech
 * bubbles over them, three stacked over the first and one over each of the
 * others, the one nearest each table pointing down at it; and a notebook
 * page at the stage's right, its heading over ruled lines that fill in.
 * Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { LABEL_LINE, SAFE, TEXT_LINE, contentTop, layerOf, polar, round, wordsWidth } from "./layout";

const [LEADERS, STAFF, COMMUNITY, SLOW, MORE, GOALS, WORRIES, WANTS, OWN_WORDS] = shown("listen", "play");

/** Where the slide's drawing starts, under its story band. */
const TOP = contentTop("listen");

/** A bubble's height, the room each side of its 26 px words, the gap between stacked bubbles, and how far its tail reaches under it. */
export const BUBBLE = { h: 44, pad: 14, gap: 12, tail: 14 } as const;
/** The three slots over a table, top to bottom: the first table's questions fill them in order; the others' one bubble takes the lowest. */
const SLOTS = [0, 1, 2].map((i) => TOP + i * (BUBBLE.h + BUBBLE.gap));
const LOWEST = SLOTS[2];

/**
 * A chair seen from above, a plain rounded rect, and the head of the person
 * seated in it, a navy dot in its middle. Six chairs to a table, on a ring
 * of 104 round a top of 82: with the chairs the table is about 234 across,
 * as large as the room between the bubbles and the safe line allows.
 */
export const SITTER = { chair: { w: 44, h: 26, rx: 8 }, head: 8 } as const;
const SEATS = { count: 6, ring: 104 } as const;
const TABLE_R = 82;
/** How far a table's chairs reach from its middle: the ring plus half a chair's depth, up and down. */
const REACH = SEATS.ring + SITTER.chair.h / 2;

/**
 * The tables' middles. They stand low enough that the top chair, counted at
 * its widest, clears the lowest bubble's tail by 4 px. The first sits under its widest bubble,
 * whose left edge is the band's; the third leaves its bubble 50 px short of
 * the page; the second is midway.
 */
const TABLE_Y = LOWEST + BUBBLE.h + BUBBLE.tail + 4 + SEATS.ring + SITTER.chair.w / 2;
const TABLE_X = [300, 740, 1176] as const;
/** The first table's bubbles share one left edge, the band's. */
const FIRST_LEFT = SAFE.left;

/** The names under the tables: 6 px under the bottom chair. */
const NAME_Y = TABLE_Y + REACH + 6 + LABEL_LINE / 2;

/** The page: from x 1470 to the band's right edge, as tall as the tables with their bubbles, from 14 px under the drawing's top (its rings reach 14 over it) to the names' foot. */
const PAGE = box(1470, TOP + 14, SAFE.right - 1470, NAME_Y + LABEL_LINE / 2 - (TOP + 14));
const RINGS = 6;
/** The page's lines: the first under the heading's rule, one every 50 px, inset 20 from its sides, each a different length as handwriting runs. */
const LINES = { first: PAGE.y + 120, pitch: 50, widths: [300, 262, 296, 236, 280, 180], inset: 20 } as const;

const bubbleAt = (text: string, cx: number, y: number, left?: number): Box => {
  const w = wordsWidth(text, 26) + 2 * BUBBLE.pad;
  return box(left ?? round(cx - w / 2), y, w, BUBBLE.h);
};

/** The tables, each with the questions asked over it, top slot first. */
const ASKED: readonly (readonly string[])[] = [[SLOW, MORE, GOALS], [WORRIES], [WANTS]];

export const LISTEN = {
  ...layerOf("listen"),
  tables: [LEADERS, STAFF, COMMUNITY].map((name, t) => {
    const c: Point = { x: TABLE_X[t], y: TABLE_Y };
    const asked = ASKED[t];
    const slots = asked.length === 1 ? [LOWEST] : SLOTS;
    return {
      key: `listen.table.${t}`,
      c,
      r: TABLE_R,
      /** The chairs, the first at the top, going round clockwise, each turned to face the table. */
      seats: Array.from({ length: SEATS.count }, (_, i) => {
        const deg = -90 + (360 / SEATS.count) * i;
        return { key: `listen.table.${t}.seat.${i}`, sitter: `listen.table.${t}.sitter.${i}`, at: polar(c, SEATS.ring, deg), deg };
      }),
      name: { key: `listen.table.${t}.name`, text: name, at: { x: c.x, y: NAME_Y } },
      /** The bubbles, top slot first; only the lowest has a tail, pointing down at the table. */
      bubbles: asked.map((text, i) => {
        const at = bubbleAt(text, c.x, slots[i], t === 0 ? FIRST_LEFT : undefined);
        const lowest = slots[i] === LOWEST;
        return { key: `listen.table.${t}.bubble.${i}`, text, at, tail: lowest ? { base: c.x - 10, tip: { x: c.x, y: at.y + at.h + BUBBLE.tail } } : undefined };
      }),
    };
  }),
  page: {
    key: "listen.page",
    at: PAGE,
    rings: Array.from({ length: RINGS }, (_, i) => ({ x: round(PAGE.x + 34 + i * ((PAGE.w - 68) / (RINGS - 1))), y: PAGE.y })),
    heading: { key: "listen.page.heading", text: OWN_WORDS, at: { x: PAGE.x + LINES.inset, y: PAGE.y + 30 + TEXT_LINE / 2 } },
    rule: { y: PAGE.y + 86, x0: PAGE.x + LINES.inset, x1: PAGE.x + PAGE.w - LINES.inset },
    /** Each line is a rule that draws on from the left, on the page's faint ruling. */
    lines: LINES.widths.map((w, i) => {
      const y = LINES.first + i * LINES.pitch;
      return { key: `listen.line.${i}`, x0: PAGE.x + LINES.inset, x1: PAGE.x + LINES.inset + w, y };
    }),
  },
};
