/**
 * Slide 3's places, all standing on one floor so the two halves read as one
 * row: at the left two columns rising from a floor line side by side, their
 * heights in the script's proportion, each carrying over its top the one
 * name both share and its own figure, each year under its foot and the pair
 * captioned under the years; at the right, under a heading, a wide bar on
 * the floor split into three parts sized by their shares, each named over
 * it and captioned under the floor. Words are read from the script, by
 * position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { SAFE, TEXT_LINE, contentTop, layerOf } from "./layout";

const [FROM, UNTIL, INVEST, FIVE, SEVENTEEN, OF_IT, HEADING, BUY, BOOST, BUILD, BUY_IS, BOOST_IS, BUILD_IS] = shown("spending", "play");

export const TOP = contentTop("spending");

/**
 * The floor every part stands on, 330 px under the drawing's top: room for
 * the taller column (240 px) with its figure and the shared name over it.
 * Under the floor, one line 30 px down carries the years at the text size
 * and the bar's captions at the label size; the pair's caption sits a text
 * line under the years, its foot about 17 px over the drawing's foot.
 */
const FLOOR_Y = TOP + 330;
const UNDER_Y = FLOOR_Y + 30;
const OF_IT_Y = UNDER_Y + TEXT_LINE;

/**
 * The columns: 220 wide, 40 apart, from the drawing's left edge, wide
 * enough that each one's figure (about 160 to 195 px, 216 measured wide)
 * sits over it. The
 * taller stands 240 px; each is sized by the share it shows (five and 17 of
 * a hundred), so the second is 3.4 times the first. Each figure sits 28 px
 * over its column's top at the text size, semibold, in indigo, and the
 * shared name 40 px over that at the label size, so a label line and a gap
 * part them.
 */
export const COLUMN = { w: 220, gap: 40, tallest: 240, figureGap: 28, nameGap: 40 } as const;
const SHARES = [5, 17] as const;
const columnAt = (i: number): Box => {
  const h = Math.round((COLUMN.tallest * SHARES[i]) / SHARES[1]);
  return box(SAFE.left + 16 + i * (COLUMN.w + COLUMN.gap), FLOOR_Y - h, COLUMN.w, h);
};
const COLUMNS_W = 2 * COLUMN.w + COLUMN.gap;

/**
 * The bar: from x 656, 64 px past the columns' floor, to 16 px short of
 * the drawing's right edge; 150 px tall on the floor. Its parts take their
 * shares of its width (about 35, 55 and 10 of a hundred); each part's name
 * sits 30 px over the bar, centred on the part, and each part's caption on
 * the line under the floor, centred on the part but the last, whose words
 * (about 210 px over a part of 115) end at the bar's end instead. The
 * heading sits over the bar's left end, 24 px under the drawing's top at
 * the text size.
 */
export const BAR = { x: 656, end: SAFE.right - 16, h: 150, nameGap: 30 } as const;
const BAR_W = BAR.end - BAR.x;
const PART_SHARES = [35, 55, 10] as const;
const BAR_BOX = box(BAR.x, FLOOR_Y - BAR.h, BAR_W, BAR.h);
const partAt = (i: number): Box => {
  const x0 = BAR.x + (BAR_W * PART_SHARES.slice(0, i).reduce((a, b) => a + b, 0)) / 100;
  return box(Math.round(x0), BAR_BOX.y, Math.round((BAR_W * PART_SHARES[i]) / 100), BAR.h);
};
const HEADING_Y = TOP + 24;

const parts = [
  [BUY, BUY_IS],
  [BOOST, BOOST_IS],
  [BUILD, BUILD_IS],
].map(([text, caption], i) => ({ text, caption, at: partAt(i) }));

export const SPENDING = {
  ...layerOf("spending"),
  /** The columns' floor line, 16 px past them either side. */
  floor: { key: "spending.floor", x0: SAFE.left, x1: SAFE.left + 32 + COLUMNS_W, y: FLOOR_Y },
  columns: [
    [FROM, FIVE],
    [UNTIL, SEVENTEEN],
  ].map(([year, figure], i) => {
    const at = columnAt(i);
    const x = at.x + at.w / 2;
    return {
      key: `spending.column.${i}`,
      at,
      /** The name both columns carry, over this one's figure. */
      name: { key: `spending.column.${i}.name`, text: INVEST, at: { x, y: at.y - COLUMN.figureGap - COLUMN.nameGap } as Point },
      figure: { key: `spending.column.${i}.figure`, text: figure, at: { x, y: at.y - COLUMN.figureGap } as Point },
      year: { key: `spending.column.${i}.year`, text: year, at: { x, y: UNDER_Y } as Point },
    };
  }),
  ofIt: { key: "spending.of-it", text: OF_IT, at: { x: SAFE.left + 16 + COLUMNS_W / 2, y: OF_IT_Y } as Point },
  heading: { key: "spending.heading", text: HEADING, at: { x: BAR.x, y: HEADING_Y } as Point },
  bar: {
    key: "spending.bar",
    at: BAR_BOX,
    parts: parts.map((part, i) => ({
      key: `spending.part.${i}`,
      at: part.at,
      /** The middle part fills green; the other two in indigo. */
      own: i === 1,
      name: { key: `spending.part.${i}.name`, text: part.text, at: { x: part.at.x + part.at.w / 2, y: BAR_BOX.y - BAR.nameGap } as Point },
      caption: {
        key: `spending.part.${i}.caption`,
        text: part.caption,
        at: { x: i === 2 ? BAR.end : part.at.x + part.at.w / 2, y: UNDER_Y } as Point,
        anchor: i === 2 ? ("end" as const) : ("middle" as const),
      },
    })),
    /** Where the bar splits, between its parts. */
    splits: [1, 2].map((i) => ({ key: `spending.split.${i - 1}`, x: partAt(i).x })),
  },
};
