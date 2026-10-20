/**
 * Slide 16's places: slide 13's wall again, smaller, in the middle of the
 * stage, its four tagged cards tagged the same; and, in the same place, the
 * square chart its cards fly onto as dots, impact up its side and
 * feasibility at its foot's far end, its top right quarter washed green and
 * named at its right. The wall's cards hang clear of both axes, so no axis
 * draws through a dot. Words are read from the script, by position.
 */
import { box, type Box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { CARD, LABEL_LINE, SAFE, contentTop, layerOf, round } from "./layout";
import { GOOD_IDEAS } from "./layout-good-ideas";

const [IMPACT, FEASIBILITY, START] = shown("sort", "play");

/** Slide 13's wall at six tenths of its size: the same grid, the same cards, the same four tagged. */
export const SCALE = 0.6;
const GRID = { cols: 4, rows: 3, gap: 8, pad: 14 } as const;
const W = CARD.w * SCALE;
const H = CARD.h * SCALE;
const WALL_W = 2 * GRID.pad + GRID.cols * W + (GRID.cols - 1) * GRID.gap;
const WALL_H = 2 * GRID.pad + GRID.rows * H + (GRID.rows - 1) * GRID.gap;
/**
 * The chart: a square centred on the stage, as tall as the room between the
 * story band and the safe line allows once the foot's name, set level with
 * the foot, has half a line under it.
 */
const TOP = contentTop("sort");
const SIDE = SAFE.bottom - LABEL_LINE / 2 - TOP;
const CHART = box(960 - SIDE / 2, TOP, SIDE, SIDE);
const MID = { x: CHART.x + CHART.w / 2, y: CHART.y + CHART.h / 2 };
/** The wall centred on the chart: its outer columns fall either side of the upright axis, its inner ones either side of the middle, its rows well over the foot. */
const WALL = box(round(MID.x - WALL_W / 2), round(MID.y - WALL_H / 2), round(WALL_W), round(WALL_H));
/** A dot's radius. */
export const DOT_R = 14;

/**
 * Where each card's dot settles, as a fraction of the chart across and up
 * from its lower left corner, in the cards' order. The grey-tagged cards'
 * dots settle low; slide 13's lifted card's dot settles top right.
 */
const SETTLE: Readonly<Record<number, readonly [number, number]>> = {
  0: [0.3, 0.18],
  1: [0.36, 0.64],
  2: [0.66, 0.14],
  3: [0.84, 0.72],
  4: [0.2, 0.8],
  5: [0.42, 0.32],
  6: [0.7, 0.6],
  7: [0.66, 0.84],
  8: [0.22, 0.42],
  9: [0.6, 0.4],
  10: [0.8, 0.22],
  11: [0.88, 0.34],
};

const tags = new Map<number, Box>(GOOD_IDEAS.tags.map((tag) => [tag.card, tag.at]));
const cardAt = (n: number): Box => {
  const col = n % GRID.cols;
  const row = Math.floor(n / GRID.cols);
  return box(round(WALL.x + GRID.pad + col * (W + GRID.gap)), round(WALL.y + GRID.pad + row * (H + GRID.gap)), round(W), round(H));
};

export const SORT = {
  ...layerOf("sort"),
  wall: { key: "sort.wall", at: WALL },
  cards: GOOD_IDEAS.cards.map((card, n) => {
    const at = cardAt(n);
    const centre: Point = { x: round(at.x + at.w / 2), y: round(at.y + at.h / 2) };
    const [fx, fy] = SETTLE[n];
    const dot: Point = { x: round(CHART.x + fx * CHART.w), y: round(CHART.y + CHART.h - fy * CHART.h) };
    /** The same tag the card took on slide 13, in the same place on it at this size, without its words: they were read there. */
    const tag = tags.get(n);
    return {
      key: `sort.card.${n}`,
      at,
      tilt: card.tilt,
      centre,
      tag: tag ? box(round(at.x + (tag.x - card.at.x) * SCALE), round(at.y + (tag.y - card.at.y) * SCALE), round(tag.w * SCALE), round(tag.h * SCALE)) : null,
      tagged: tag !== undefined,
      dot: { key: `sort.dot.${n}`, at: dot, from: { x: round(centre.x - dot.x), y: round(centre.y - dot.y) } },
    };
  }),
  chart: {
    key: "sort.axes",
    at: CHART,
    /** Up the side from the top, then along the foot. */
    d: `M${CHART.x} ${CHART.y}V${CHART.y + CHART.h}H${CHART.x + CHART.w}`,
    /** The lines between the quarters. */
    mid: { key: "sort.mid", d: `M${MID.x} ${CHART.y}V${CHART.y + CHART.h}M${CHART.x} ${MID.y}H${CHART.x + CHART.w}` },
    impact: { key: "sort.impact", text: IMPACT, at: { x: CHART.x - 26, y: MID.y } },
    /** Past the foot's far end, level with it: the way the foot grows. */
    feasibility: { key: "sort.feasibility", text: FEASIBILITY, at: { x: CHART.x + CHART.w + 20, y: CHART.y + CHART.h } },
  },
  /** The top right quarter, and its name beside it at its middle's height. */
  corner: { key: "sort.corner", at: box(MID.x, CHART.y, CHART.w / 2, CHART.h / 2) },
  start: { key: "sort.start", text: START, at: { x: CHART.x + CHART.w + 28, y: CHART.y + CHART.h / 4 } },
};
