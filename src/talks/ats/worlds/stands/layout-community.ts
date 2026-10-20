/**
 * Slide 12b's places. Click one: a column of nine department names down the
 * left of the stage, 44 px apart, that rolls up into place like film credits
 * through a window the drawing's height (nothing of it shows under the
 * drawing's foot); four quotes in a column to its right, each with its
 * attribution under it, each set as close to level with its department as
 * the four blocks allow, and joined to it by a short leader. Click two:
 * three theme rows across the full band, each its words over a green rule
 * on a white band that covers what lies under it, 64 px apart. Words are
 * read from the script, by position.
 *
 * The drawing has y 548 to 992. The names settle from y 572 to 924.
 */
import { box, type Point } from "@/components/deck/kit";
import { breakAfter, shown } from "../../script/find";
import { DRAW_FOOT, SAFE, contentTop, layerOf, wordsWidth } from "./layout";

const NAMES = shown("community", "roll").slice(0, 9);
const QUOTES = [0, 1, 2, 3].map((i) => ({ text: shown("community", "roll")[9 + 2 * i], by: shown("community", "roll")[10 + 2 * i] }));
const THEMES = shown("community", "themes");

const TOP = contentTop("community");

/* The column */

/** The names at the text size, semibold, from x 96, 44 px apart, the first 24 px under the drawing's first line. */
export const COLUMN = { x: 96, top: TOP + 24, pitch: 44, size: 32 } as const;
const nameY = (i: number) => COLUMN.top + i * COLUMN.pitch;
/** The window the column rolls up through: the drawing's band, from its first line to its foot. */
export const WINDOW = box(SAFE.left, TOP, SAFE.right - SAFE.left, DRAW_FOOT - TOP);
/** The roll: the column starts 450 px low, its first name 30 px under the window's foot, and rises to its place at a reading pace (75 px a second). */
export const ROLL = { from: DRAW_FOOT + 30 - COLUMN.top, seconds: 6 } as const;

/* The quotes */

/** Which name each quote belongs to, in the column's order, by the department's place in it. */
const OWNERS = [1, 5, 6, 7] as const;
/**
 * The quotes' column: from x 600, 920 wide, so three quotes take one row at
 * 36 px (the longest of them, 51 letters, at 0.5 of the size a letter is
 * 918 px) and their leaders are short. A quote's rows are 42 apart; its
 * attribution 35 under its last row, at 26 px.
 */
export const QUOTE = { x: 600, w: 920, size: 36, row: 42, by: 35, half: 21, byHalf: 16, letter: 0.5 } as const;
/** Where a quote breaks onto a second row, by the word its first row ends on. */
const QUOTE_BREAKS: Record<number, string[]> = { 2: ["time."] };
const rowsOf = (i: number) => breakAfter(QUOTES[i].text, ...(QUOTE_BREAKS[i] ?? []));
/** A block's height: its rows, its attribution, and half a line over and under. */
const heightOf = (rows: number) => QUOTE.half + (rows - 1) * QUOTE.row + QUOTE.by + QUOTE.byHalf;
/**
 * Each block's middle. The first sits level with its name; the other
 * three belong to names 44 px apart but need 70, 112 and 70 px, so they
 * stack 8 px apart from the lowest the drawing's foot allows, up: each
 * within 60 px of its name's height.
 */
const GAP = 8;
const heights = QUOTES.map((_, i) => heightOf(rowsOf(i).length));
const MIDDLES: number[] = [nameY(OWNERS[0])];
MIDDLES[3] = 938;
MIDDLES[2] = MIDDLES[3] - heights[3] / 2 - GAP - heights[2] / 2;
MIDDLES[1] = MIDDLES[2] - heights[2] / 2 - GAP - heights[1] / 2;

const quotes = QUOTES.map((quote, i) => {
  const rows = rowsOf(i);
  const top = MIDDLES[i] - heights[i] / 2;
  const first = top + QUOTE.half;
  const owner = OWNERS[i];
  const ownerAt: Point = { x: COLUMN.x, y: nameY(owner) };
  return {
    key: `community.quote.${i}`,
    owner,
    text: quote.text,
    rows,
    at: { x: QUOTE.x, y: first } as Point,
    by: { text: quote.by, at: { x: QUOTE.x, y: first + (rows.length - 1) * QUOTE.row + QUOTE.by } as Point },
    box: box(QUOTE.x, top, QUOTE.w, heights[i]),
    middle: MIDDLES[i],
    /** From just past its name's end to just short of the quote, at the name's height and the block's middle. */
    leader: { key: `community.leader.${i}`, from: { x: ownerAt.x + wordsWidth(NAMES[owner], COLUMN.size) + 16, y: ownerAt.y } as Point, to: { x: QUOTE.x - 16, y: MIDDLES[i] } as Point },
  };
});

/* The themes, click two */

/** Three rows 64 apart, centred on the drawing's band: each its words, a rule 26 px under them, and a white band from 30 over the words to 6 under the rule. */
export const THEME = { pitch: 64, rule: 26, over: 30, under: 6 } as const;
const THEME_TOP = Math.round((TOP + DRAW_FOOT) / 2 - THEME.pitch);
const themes = THEMES.map((text, i) => {
  const y = THEME_TOP + i * THEME.pitch;
  return {
    key: `community.theme.${i}`,
    text,
    at: { x: SAFE.left + 16, y } as Point,
    rule: { key: `community.theme.${i}.rule`, x0: SAFE.left + 16, x1: SAFE.right, y: y + THEME.rule },
    band: { key: `community.theme.${i}.band`, at: box(SAFE.left, y - THEME.over, SAFE.right - SAFE.left, THEME.over + THEME.rule + THEME.under) },
  };
});

export const COMMUNITY = {
  ...layerOf("community"),
  window: { id: "sn-community-window", at: WINDOW },
  column: { key: "community.column", names: NAMES.map((text, i) => ({ text, at: { x: COLUMN.x, y: nameY(i) } as Point })) },
  quotes,
  themes,
};
