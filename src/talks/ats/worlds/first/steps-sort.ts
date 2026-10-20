/**
 * Slide 20's click: the chart's axes draw, its sides named, the lines
 * between its quarters after; the ideas appear at the left as dots and fly
 * onto the chart, across on one curve and up on another, with the first
 * line; the quarters name themselves in turn; the top right washes green,
 * with the second line; and the checklist draws beside the chart, row by
 * row, each row taking its tick.
 */
import { EASE, draw, fill, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { SORT } from "./layout-sort";
import { into, keys, play } from "./moves";

const S = SORT;
const C = S.chart;

/** The dots, one after another: each shows at the left, then flies. */
const FLY = { stagger: 0.08, show: 0.25, lift: 0.15, duration: 1.0 } as const;
/** The quarters' names, this far apart. */
const NAME = 0.3;
/** The checklist's rows, then their ticks. */
const LIST = { stagger: 0.1, tick: 0.5, ticks: 0.18 } as const;

export const sort = picture("sort", {
  play: play(
    into("sort"),
    // The axes draw, the sides named, the quarter lines after.
    {
      hold: 0.4,
      moves: [draw(C.key, { at: 0 }), rise(C.value.key, { at: 0.3 }), rise(C.readiness.key, { at: 0.5 }), draw(C.mid.key, { at: 0.6 })],
    },
    // The ideas appear at the left as dots and fly onto the chart, with the first line.
    {
      hold: 0.4,
      moves: S.dots.flatMap((dot, i) => [
        ...to(dot.key, { autoAlpha: 1 }, { autoAlpha: 0, x: dot.from.x, y: dot.from.y }, { at: i * FLY.stagger, duration: FLY.show, ease: EASE.soft }),
        ...to(dot.key, { x: 0 }, undefined, { at: i * FLY.stagger + FLY.lift, duration: FLY.duration, ease: EASE.page }),
        ...to(dot.key, { y: 0 }, undefined, { at: i * FLY.stagger + FLY.lift, duration: FLY.duration, ease: EASE.out }),
      ]),
    },
    { with: true, hold: 0.5, moves: [story("sort", 0)] },
    // The quarters name themselves in turn.
    { hold: 0.3, moves: S.quarters.map((quarter, i) => rise(quarter.key, { at: i * NAME })) },
    // The top right washes green, with the second line.
    { hold: 0.3, moves: [fill(S.corner.key, { at: 0, duration: 0.8 })] },
    { with: true, hold: 0.2, moves: [story("sort", 1)] },
    // The checklist beside the chart, row by row, each row taking its tick.
    {
      hold: 0.5,
      moves: [rise(keys(S.list), { at: 0, stagger: LIST.stagger }), show(S.list.map((row) => row.tick.key), { at: LIST.tick, stagger: LIST.ticks })],
    },
  ),
});
