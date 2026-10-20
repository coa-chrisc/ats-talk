/**
 * Slide 23's places: six tiles edge to edge across the top of the field,
 * named once above the first; the first tile's lit fill and its name, on
 * two lines inside it; a bracket under the other five, its one caption
 * under it; project dots that come up from below and attach
 * inside the tiles' feet, most to the first. Under the tiles, in the
 * middle of the stage, a grey tally of three fives, named at its left; and
 * across the same place the measure line, rising from its first point at
 * the lower left to the point it aims at, upper right, each named on its
 * outer side, the nameplate under the line's middle. Words are read from
 * the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { LABEL_LINE, SAFE, contentTop, groupOf, labelBox, labelsOf, wordsWidth } from "./layout-plan";

const [PLAN, PRIORITY, OTHERS, PILOTS, BASELINE, TARGET, OWNER] = labelsOf("outcomes");

/** 556: under the two-line title's two story rows. */
const TOP = contentTop("outcomes");

/** Six tiles across the field, 24 apart, 136 tall (room under them for the other five's bracket and caption), under the plan's name. */
const TILE = { y: TOP + LABEL_LINE + 10, h: 136, gap: 24, count: 6 } as const;
const TILE_W = (SAFE.right - SAFE.left - (TILE.count - 1) * TILE.gap) / TILE.count;
const tileX = (i: number) => SAFE.left + i * (TILE_W + TILE.gap);
const TILE_FOOT = TILE.y + TILE.h;
/** The first tile's name, on two lines broken at its last space, from 38 px under the tile's top. */
const nameLines = (() => {
  const at = PRIORITY.lastIndexOf(" ");
  return [PRIORITY.slice(0, at), PRIORITY.slice(at + 1)];
})();
/** How many project dots each tile takes: most of them the first. */
export const DOTS = [5, 2, 1, 2, 1, 1] as const;
/** Each dot sits inside its tile, `inset` px up from its foot; it comes up from `from` px below. */
const DOT = { r: 12, pitch: 36, from: 180, inset: 12 } as const;
const DOT_Y = TILE_FOOT - DOT.inset - DOT.r;

/**
 * The bracket under the other five tiles: a line 14 px under their feet
 * from the second tile's left edge to the last one's right, its ends
 * turned up 10 px toward the tiles; their one caption centred under it,
 * 12 px down.
 */
const BRACE = { y: TILE_FOOT + 14, up: 10, x0: tileX(1), x1: tileX(TILE.count - 1) + TILE_W } as const;
const OTHERS_AT: Point = { x: (BRACE.x0 + BRACE.x1) / 2, y: BRACE.y + 12 + LABEL_LINE / 2 };

/**
 * The measure line, in the room under the tiles: from (560, 952) up to
 * (1360, 816), a long gentle rise through the middle of the stage, where
 * the tally stood.
 */
const MEASURE = { from: { x: 560, y: 952 }, to: { x: 1360, y: 816 }, r: { from: 10, to: 16 } } as const;
const MID: Point = { x: (MEASURE.from.x + MEASURE.to.x) / 2, y: (MEASURE.from.y + MEASURE.to.y) / 2 };
/**
 * The nameplate, 36 px under the line's middle and 120 px right of it,
 * where the line has risen far enough to clear the plate's long name.
 */
const PLATE_W = wordsWidth(OWNER) + 40;
const PLATE = box(MID.x + 120 - PLATE_W / 2, MID.y + 36, PLATE_W, 44);

/**
 * The tally: three fives, each four strokes 18 apart and a fifth across
 * them, 40 between the fives, centred on the line's middle and 90 tall, so
 * the line draws through where it stood.
 */
const TALLY = { stroke: 18, gap: 40, h: 90, groups: 3 } as const;
const GROUP_W = 3 * TALLY.stroke;
const TALLY_W = TALLY.groups * GROUP_W + (TALLY.groups - 1) * TALLY.gap;
const TALLY_X = MID.x - TALLY_W / 2;
const TALLY_Y = MID.y - TALLY.h / 2;

const strokes = Array.from({ length: TALLY.groups }, (_, g) => {
  const x0 = TALLY_X + g * (GROUP_W + TALLY.gap);
  const upright = Array.from({ length: 4 }, (__, s) => `M${x0 + s * TALLY.stroke} ${TALLY_Y}V${TALLY_Y + TALLY.h}`);
  const across = `M${x0 - 12} ${TALLY_Y + TALLY.h - 14}L${x0 + GROUP_W + 12} ${TALLY_Y + 14}`;
  return [...upright, across];
}).flat();

export const OUTCOMES = {
  ...groupOf("outcomes"),
  plan: { key: "outcomes.plan", text: PLAN, at: { x: SAFE.left, y: TOP + LABEL_LINE / 2 } as Point },
  tiles: Array.from({ length: TILE.count }, (_, i) => ({ key: `outcomes.tile.${i}`, at: box(tileX(i), TILE.y, TILE_W, TILE.h) })),
  /** The first tile lights: a green fill and a heavier edge over its outline. */
  lit: { key: "outcomes.lit", at: box(tileX(0), TILE.y, TILE_W, TILE.h) },
  name: { key: "outcomes.name", text: PRIORITY, lines: nameLines.map((text, i) => ({ text, at: { x: tileX(0) + TILE_W / 2, y: TILE.y + 38 + i * 34 } as Point })) },
  others: {
    key: "outcomes.others",
    d: `M${BRACE.x0} ${BRACE.y - BRACE.up}V${BRACE.y}H${BRACE.x1}V${BRACE.y - BRACE.up}`,
    caption: { key: "outcomes.others.caption", text: OTHERS, at: OTHERS_AT },
  },
  dots: DOTS.flatMap((count, tile) =>
    Array.from({ length: count }, (_, i) => ({ key: `outcomes.dot.${tile}.${i}`, tile, at: { x: tileX(tile) + TILE_W / 2 + (i - (count - 1) / 2) * DOT.pitch, y: DOT_Y } as Point })),
  ),
  dot: DOT,
  tally: {
    key: "outcomes.tally",
    strokes: strokes.map((d, i) => ({ key: `outcomes.tally.${i}`, d })),
    at: box(TALLY_X - 12, TALLY_Y, TALLY_W + 24, TALLY.h),
    label: { key: "outcomes.tally.label", text: PILOTS, at: { x: TALLY_X - 40, y: MID.y } as Point },
  },
  measure: {
    key: "outcomes.measure",
    from: MEASURE.from as Point,
    to: MEASURE.to as Point,
    start: { key: "outcomes.baseline", at: MEASURE.from as Point, r: MEASURE.r.from },
    end: { key: "outcomes.target", at: MEASURE.to as Point, r: MEASURE.r.to },
    /** Each point's name on its outer side, level with it. */
    startLabel: { key: "outcomes.baseline.label", text: BASELINE, at: { x: MEASURE.from.x - MEASURE.r.from - 16, y: MEASURE.from.y } as Point },
    endLabel: { key: "outcomes.target.label", text: TARGET, at: { x: MEASURE.to.x + MEASURE.r.to + 16, y: MEASURE.to.y } as Point },
  },
  plate: { key: "outcomes.plate", at: PLATE, text: OWNER },
};

export const dotBox = (at: Point) => box(at.x - DOT.r, at.y - DOT.r, 2 * DOT.r, 2 * DOT.r);
const ringBox = (at: Point, r: number) => box(at.x - r, at.y - r, 2 * r, 2 * r);

/** Everything 23 draws under its story band, for the layout test, the dots where they attach and where they come up from. */
export const OUTCOMES_BOXES: Box[] = [
  labelBox(OUTCOMES.plan.at, PLAN, "start"),
  ...OUTCOMES.tiles.map((tile) => tile.at),
  box(BRACE.x0, BRACE.y - BRACE.up, BRACE.x1 - BRACE.x0, BRACE.up),
  labelBox(OTHERS_AT, OTHERS),
  ...OUTCOMES.dots.flatMap((dot) => [dotBox(dot.at), dotBox({ x: dot.at.x, y: dot.at.y + DOT.from })]),
  OUTCOMES.tally.at,
  labelBox(OUTCOMES.tally.label.at, PILOTS, "end"),
  ringBox(MEASURE.from, MEASURE.r.from),
  ringBox(MEASURE.to, MEASURE.r.to),
  labelBox(OUTCOMES.measure.startLabel.at, BASELINE, "end"),
  labelBox(OUTCOMES.measure.endLabel.at, TARGET, "start"),
  PLATE,
];
