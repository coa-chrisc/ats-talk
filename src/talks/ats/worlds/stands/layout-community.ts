/**
 * Slide 12b's places. Click one: across the top of the drawing, a strip of
 * nine department chips, rounded pills each sized to its name, in two rows
 * from the content edge, the four quoted departments lit; under the strip,
 * four quote cards in a two-by-two grid, each its department's name over
 * its quote over its speaker. Click two: all of that fades where it is, and
 * three theme rows draw into the band, each its words over a green rule
 * across the full band, 96 px apart. Words are read from the script, by
 * position. Every word that sits inside a shape is set by its width as
 * Geist sets it (see MEASURED), with a margin over it, not the wide
 * estimate, so the shapes fit their words closely and evenly.
 *
 * The drawing has y 548 to 992: the chips from 548 to 628, the cards from
 * 648 to 992.
 */
import { box, type Point } from "@/components/deck/kit";
import { breakAfter, shown } from "../../script/find";
import { DRAW_FOOT, SAFE, contentTop, layerOf, wordsWidth } from "./layout";

const ROLL = shown("community", "roll");
const NAMES = ROLL.slice(0, 9);
const QUOTES = [0, 1, 2, 3].map((i) => ({ text: ROLL[9 + 2 * i], by: ROLL[10 + 2 * i] }));
const THEMES = shown("community", "themes");

const TOP = contentTop("community");
/** The drawing's width, from the content edge (the title's x) to the safe area's right. */
export const FIELD = { x: SAFE.left + 16, w: SAFE.right - SAFE.left - 16 } as const;

/* The words' widths */

/** Which name each quote belongs to, by the department's place in the script's order: the lit chips. */
const OWNERS = [1, 5, 6, 7] as const;
/** Where a quote breaks onto its second row, by the word its first row ends on: at a phrase. */
const QUOTE_BREAKS: Record<number, string[]> = { 0: ["AI,"], 1: ["business-driven"], 2: ["time."] };
const ROWS = QUOTES.map((quote, i) => breakAfter(quote.text, ...(QUOTE_BREAKS[i] ?? [])));

/**
 * The words' widths as Geist sets them, in stage px (getComputedTextLength
 * in Chromium at 1920 x 1080, the deck's own classes): the names at 26 px
 * semibold with the label's 0.01em, the quotes' rows at 32 px medium, the
 * speakers at 26 px medium. In the script's order; re-measure when a word
 * changes (the tests fail on a word with no width).
 */
const NAME_WIDTHS = [256.5, 285.6, 176.3, 48.3, 78.1, 164.3, 88.1, 176.8, 262.2];
const ROW_WIDTHS = [[261.1, 345.4], [402.4, 371.5], [459, 361], [561]];
const BY_WIDTHS = [607.4, 513.7, 541.3, 413.8];
type Measured = readonly [string, { w: number; size: number }];
export const MEASURED: ReadonlyMap<string, { w: number; size: number }> = new Map([
  ...NAMES.map((text, i): Measured => [text, { w: NAME_WIDTHS[i], size: 26 }]),
  ...ROWS.flatMap((rows, i) => rows.map((text, k): Measured => [text, { w: ROW_WIDTHS[i][k], size: 32 }])),
  ...QUOTES.map((quote, i): Measured => [quote.by, { w: BY_WIDTHS[i], size: 26 }]),
]);
/** The margin over a measured width: 4%, so another browser's rounding never pushes a letter out. */
const MARGIN = 1.04;
/** The room a run of words takes: its measured width and the margin over it (the estimate at its size where none is measured). */
export const room = (text: string, size = 26) => Math.ceil((MEASURED.get(text)?.w ?? wordsWidth(text, size)) * MARGIN);

/* The chips */

/** A chip: 36 tall (a tag's height) about its words at the label size, 18 px either side of them, 12 apart along a row and 8 between rows; its words centred in it, so the room either side is always the same. */
export const CHIP = { h: 36, pad: 18, gap: 12, rowGap: 8, size: 26, margin: MARGIN } as const;
const chipWidth = (text: string) => room(text) + 2 * CHIP.pad;
/** A row of chips' width, from the first's left to the last's right. */
export const rowWidth = (names: readonly string[]) => names.reduce((sum, text) => sum + chipWidth(text), 0) + CHIP.gap * (names.length - 1);
/** One row if all nine fit the field; else two, split after the name that leaves the wider row narrowest (four, then five). */
const widest = (k: number) => Math.max(rowWidth(NAMES.slice(0, k)), rowWidth(NAMES.slice(k)));
const SPLIT = rowWidth(NAMES) <= FIELD.w ? NAMES.length : NAMES.slice(1).map((_, i) => i + 1).reduce((best, k) => (widest(k) < widest(best) ? k : best));
const chips = NAMES.map((text, i) => {
  const row = i < SPLIT ? 0 : 1;
  const first = row === 0 ? 0 : SPLIT;
  const x = FIELD.x + rowWidth(NAMES.slice(first, i + 1)) - chipWidth(text);
  const y = TOP + row * (CHIP.h + CHIP.rowGap);
  const w = chipWidth(text);
  return { key: `community.chip.${i}`, text, lit: (OWNERS as readonly number[]).includes(i), at: box(x, y, w, CHIP.h), words: { x: x + w / 2, y: y + CHIP.h / 2 } as Point };
});
const CHIPS_FOOT = Math.max(...chips.map((chip) => chip.at.y + chip.at.h));

/* The cards */

/**
 * The cards: two across the field 16 apart, two rows 12 apart, 20 under
 * the chips. In a card, 26 px in from its left; the header's middle 26
 * under its top and the speaker's 26 over its foot, so the room over and
 * under the words is the same; the quote's first row 38 under the header,
 * its rows 38 apart, and its last row 38 over the speaker. `padY` is the
 * least room any line's box keeps from the outline.
 */
export const CARD = { gap: 16, rowGap: 12, below: 20, padX: 26, edge: 26, lead: 38, row: 38, padY: 8, r: 12 } as const;
const CARD_W = (FIELD.w - CARD.gap) / 2;
const CARD_H = 2 * CARD.edge + 2 * CARD.lead + CARD.row * (Math.max(...ROWS.map((rows) => rows.length)) - 1);
const CARDS_TOP = CHIPS_FOOT + CARD.below;
const cards = QUOTES.map((quote, i) => {
  const x = FIELD.x + (i % 2) * (CARD_W + CARD.gap);
  const y = CARDS_TOP + Math.floor(i / 2) * (CARD_H + CARD.rowGap);
  const left = x + CARD.padX;
  return {
    key: `community.card.${i}`,
    at: box(x, y, CARD_W, CARD_H),
    dept: { text: NAMES[OWNERS[i]], at: { x: left, y: y + CARD.edge } as Point },
    quote: { text: quote.text, rows: ROWS[i], at: { x: left, y: y + CARD.edge + CARD.lead } as Point },
    by: { text: quote.by, at: { x: left, y: y + CARD_H - CARD.edge } as Point },
  };
});

/* The themes, click two */

/** Three rows 96 apart, each its words at 40 px with a rule 34 px under their middle; the middle row's middle (words and rule together, 26 px over the rule) on the band's middle. */
export const THEME = { pitch: 96, rule: 34, size: 40, line: 52 } as const;
const BAND_MIDDLE = (TOP + DRAW_FOOT) / 2;
const themes = THEMES.map((text, i) => {
  const y = Math.round(BAND_MIDDLE + (i - 1) * THEME.pitch - THEME.rule + 26);
  return {
    key: `community.theme.${i}`,
    text,
    at: { x: SAFE.left + 16, y } as Point,
    rule: { key: `community.theme.${i}.rule`, x0: SAFE.left + 16, x1: SAFE.right, y: y + THEME.rule },
  };
});

export const COMMUNITY = {
  ...layerOf("community"),
  /** What fades on click two: the chips and the cards together. */
  block: { key: "community.block" },
  chips,
  cards,
  themes,
};
