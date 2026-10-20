/**
 * Slide 3's places, all standing on one floor so the three read as one
 * row: at the left two columns rising from a floor line side by side, their
 * heights in the script's proportion, each named over its top and the pair
 * captioned under the floor; beside them a large figure on the floor, its
 * caption under it; at the right a wide bar on the floor split into three
 * parts sized by their shares, each named over it, and a bracket under the
 * middle part with its caption under that. Words are read from the script,
 * by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { SAFE, TEXT_LINE, capOf, contentTop, figureRuns, figureWidth, layerOf } from "./layout";

const [FIVE, SEVENTEEN, OF_IT, REVENUE, OUTSIDE, BUY, BOOST, BUILD, OWN_DATA] = shown("spending", "play");

export const TOP = contentTop("spending");

/**
 * The floor every part stands on, 316 px under the drawing's top: room for
 * the taller column (260 px) with its name over it. The captions all sit on
 * one line under it, 56 px down at the text size, and end about 50 px over
 * the drawing's foot.
 */
const FLOOR_Y = TOP + 316;
const CAPTION_Y = FLOOR_Y + 56;

/**
 * The columns: 190 wide, 40 apart, from the drawing's left edge, wide
 * enough that each one's name (about 160 to 195 px) sits over it. The taller
 * stands 260 px; each is sized by the share it shows (five and 17 of a
 * hundred), so the second is 3.4 times the first. Each name sits 28 px over
 * its column's top at the text size, semibold.
 */
export const COLUMN = { w: 190, gap: 40, tallest: 260, nameGap: 28 } as const;
const SHARES = [5, 17] as const;
const columnAt = (i: number): Box => {
  const h = Math.round((COLUMN.tallest * SHARES[i]) / SHARES[1]);
  return box(SAFE.left + 16 + i * (COLUMN.w + COLUMN.gap), FLOOR_Y - h, COLUMN.w, h);
};
const COLUMNS_W = 2 * COLUMN.w + COLUMN.gap;

/**
 * The figure: the digits at 112 px, the words at 40 px, on the floor, 72 px
 * right of the columns (about 330 px wide), its caption under it on the
 * captions' line.
 */
export const FIGURE = { size: 112, small: 40 } as const;
const FIGURE_X = SAFE.left + 16 + COLUMNS_W + 72;

/**
 * The bar: from x 1048 to 24 px short of the drawing's right edge, so the
 * last part's name (about 80 px, centred over a part of 75) stays inside
 * it; 120 px tall on the floor, 44 px or more right of the figure even
 * measured wide. Its parts take their shares of its width (about 35, 55
 * and 10 of a hundred); each part's name sits 30 px over the bar, centred
 * on the part.
 */
export const BAR = { x: 1048, end: SAFE.right - 24, h: 120, nameGap: 30 } as const;
const BAR_W = BAR.end - BAR.x;
const PART_SHARES = [35, 55, 10] as const;
const BAR_BOX = box(BAR.x, FLOOR_Y - BAR.h, BAR_W, BAR.h);
const partAt = (i: number): Box => {
  const x0 = BAR.x + (BAR_W * PART_SHARES.slice(0, i).reduce((a, b) => a + b, 0)) / 100;
  return box(Math.round(x0), BAR_BOX.y, Math.round((BAR_W * PART_SHARES[i]) / 100), BAR.h);
};
/** The bracket under the middle part: 20 px under the floor, its ends rising 10 px, its caption on the captions' line. */
const BRACKET = { gap: 20, drop: 10 } as const;

const parts = [BUY, BOOST, BUILD].map((text, i) => ({ text, at: partAt(i) }));

export const SPENDING = {
  ...layerOf("spending"),
  /** The columns' floor line, 16 px past them either side: only under them, as the figure's words reach under its baseline. */
  floor: { key: "spending.floor", x0: SAFE.left, x1: SAFE.left + 32 + COLUMNS_W, y: FLOOR_Y },
  columns: [FIVE, SEVENTEEN].map((text, i) => {
    const at = columnAt(i);
    return { key: `spending.column.${i}`, at, name: { key: `spending.column.${i}.name`, text, at: { x: at.x + at.w / 2, y: at.y - COLUMN.nameGap } as Point } };
  }),
  ofIt: { key: "spending.of-it", text: OF_IT, at: { x: SAFE.left + 16 + COLUMNS_W / 2, y: CAPTION_Y } as Point },
  figure: {
    key: "spending.figure",
    text: REVENUE,
    runs: figureRuns(REVENUE),
    at: { x: FIGURE_X, y: FLOOR_Y } as Point,
    caption: { key: "spending.figure.caption", text: OUTSIDE, at: { x: FIGURE_X, y: CAPTION_Y } as Point },
  },
  bar: {
    key: "spending.bar",
    at: BAR_BOX,
    parts: parts.map((part, i) => ({
      key: `spending.part.${i}`,
      at: part.at,
      /** The middle part fills green; the other two in indigo. */
      own: i === 1,
      name: { key: `spending.part.${i}.name`, text: part.text, at: { x: part.at.x + part.at.w / 2, y: BAR_BOX.y - BAR.nameGap } as Point },
    })),
    /** Where the bar splits, between its parts. */
    splits: [1, 2].map((i) => ({ key: `spending.split.${i - 1}`, x: partAt(i).x })),
    bracket: { key: "spending.bracket", x0: partAt(1).x + 8, x1: partAt(1).x + partAt(1).w - 8, y: FLOOR_Y + BRACKET.gap, drop: BRACKET.drop },
    caption: { key: "spending.own", text: OWN_DATA, at: { x: partAt(1).x + partAt(1).w / 2, y: CAPTION_Y } as Point },
  },
};

/** The figure's box, for the layout tests: its numerals' cap height over the floor, a descender's room under it. */
export const figureBox = (): Box => box(FIGURE_X, FLOOR_Y - capOf(FIGURE.size), figureWidth(SPENDING.figure.runs, FIGURE.size, FIGURE.small), capOf(FIGURE.size) + 8);
export const CAPTION_LINE = TEXT_LINE;
