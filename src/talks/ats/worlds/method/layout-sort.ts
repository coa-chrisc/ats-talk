/**
 * Slide 12's places: at the left, where the ideas start as dots in a loose
 * column; the square chart they fly onto, value up its side and readiness
 * at its foot's far end, its four quarters named inside their tops, its top
 * right quarter washed green; and at the right a checklist of six rows,
 * each a box, its words and a rule under it, the box taking the passed
 * tick. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { SAFE, TEXT_LINE, contentTop, layerOf, round } from "./layout";

const [VALUE, READINESS, SCALE, PREPARE, EXPERIMENT, DEFER, ...TESTS] = shown("sort", "play");

/** Where the slide's drawing starts, under its story band. */
const TOP = contentTop("sort");

/**
 * The chart: a square as tall as the room between the drawing's top and
 * the safe line: 460 px. (The two-line title and two story rows leave no
 * more under the band; the foot's name stands at the foot's far end, just
 * over the line, so it takes no room under it.) Its left edge leaves the
 * dots' column and the side's name room at its left.
 */
const SIDE = SAFE.bottom - TOP;
const CHART = box(460, TOP, SIDE, SIDE);
const MID: Point = { x: CHART.x + CHART.w / 2, y: CHART.y + CHART.h / 2 };
/** A dot's radius. */
export const DOT_R = 13;

/** A quarter's name sits inside its top, centred, a line's height down from the quarter's edge. */
const NAME_DOWN = 16 + TEXT_LINE / 2;

/**
 * Each idea: where its dot starts in the column at the left (x, y on the
 * stage), and where it settles, as a fraction of the chart across and up
 * from its lower left corner. Most settle away from the top right; four
 * land there. None settles under a quarter's name (the top 0.14 of the
 * chart's height in each quarter) or within a dot of the middle lines.
 */
const IDEAS: readonly { start: Point; settle: readonly [number, number] }[] = [
  { start: { x: 150, y: 600 }, settle: [0.18, 0.12] },
  { start: { x: 260, y: 640 }, settle: [0.66, 0.62] },
  { start: { x: 180, y: 690 }, settle: [0.34, 0.24] },
  { start: { x: 300, y: 730 }, settle: [0.82, 0.72] },
  { start: { x: 140, y: 770 }, settle: [0.2, 0.68] },
  { start: { x: 240, y: 800 }, settle: [0.62, 0.3] },
  { start: { x: 320, y: 850 }, settle: [0.88, 0.58] },
  { start: { x: 170, y: 870 }, settle: [0.38, 0.62] },
  { start: { x: 270, y: 910 }, settle: [0.74, 0.12] },
  { start: { x: 130, y: 940 }, settle: [0.1, 0.28] },
  { start: { x: 340, y: 660 }, settle: [0.7, 0.76] },
  { start: { x: 210, y: 950 }, settle: [0.9, 0.26] },
];

/**
 * The checklist: from x 1160 to the band's right edge, six rows on a pitch
 * of 70 from 30 px under the chart's top, so the list stands as tall as the
 * chart and ends over the foot's name. A row is a 40 px box, its words at
 * 32 px 64 px right of the box's left, and a faint rule 32 px under the
 * words' middle.
 */
const LIST = { x: 1160, top: CHART.y + 30, pitch: 70, box: 40, words: 64, rule: 32 } as const;

export const SORT = {
  ...layerOf("sort"),
  chart: {
    key: "sort.axes",
    at: CHART,
    /** Up the side from the top, then along the foot. */
    d: `M${CHART.x} ${CHART.y}V${CHART.y + CHART.h}H${CHART.x + CHART.w}`,
    /** The lines between the quarters. */
    mid: { key: "sort.mid", d: `M${MID.x} ${CHART.y}V${CHART.y + CHART.h}M${CHART.x} ${MID.y}H${CHART.x + CHART.w}` },
    value: { key: "sort.value", text: VALUE, at: { x: CHART.x - 28, y: MID.y } },
    /** Past the foot's far end, sitting just over its line: the way the foot grows. */
    readiness: { key: "sort.readiness", text: READINESS, at: { x: CHART.x + CHART.w + 20, y: CHART.y + CHART.h - TEXT_LINE / 2 } },
  },
  /** The quarters, named in the order they label themselves: top right, top left, bottom right, bottom left. */
  quarters: [
    { text: SCALE, at: box(MID.x, CHART.y, CHART.w / 2, CHART.h / 2) },
    { text: PREPARE, at: box(CHART.x, CHART.y, CHART.w / 2, CHART.h / 2) },
    { text: EXPERIMENT, at: box(MID.x, MID.y, CHART.w / 2, CHART.h / 2) },
    { text: DEFER, at: box(CHART.x, MID.y, CHART.w / 2, CHART.h / 2) },
  ].map((quarter, i) => ({ key: `sort.quarter.${i}`, ...quarter, name: { x: quarter.at.x + quarter.at.w / 2, y: quarter.at.y + NAME_DOWN } })),
  /** The top right quarter's green wash. */
  corner: { key: "sort.corner", at: box(MID.x, CHART.y, CHART.w / 2, CHART.h / 2) },
  dots: IDEAS.map(({ start, settle: [fx, fy] }, i) => {
    const at: Point = { x: round(CHART.x + fx * CHART.w), y: round(CHART.y + CHART.h - fy * CHART.h) };
    return { key: `sort.dot.${i}`, at, start, from: { x: round(start.x - at.x), y: round(start.y - at.y) } };
  }),
  list: TESTS.map((text, i) => {
    const y = LIST.top + i * LIST.pitch;
    const check: Box = box(LIST.x, y - LIST.box / 2, LIST.box, LIST.box);
    return {
      key: `sort.test.${i}`,
      text,
      check,
      tick: { key: `sort.tick.${i}`, at: { x: LIST.x + LIST.box / 2, y } },
      words: { x: LIST.x + LIST.words, y },
      rule: { key: `sort.rule.${i}`, d: `M${LIST.x} ${y + LIST.rule}H${SAFE.right}` },
    };
  }),
};

export const LIST_BOX = LIST.box;
