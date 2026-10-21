/** Criteria first, then a labeled chart, illustrative placements, and the preferred starting region. */
import { draw, fill, rise, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { SORT as S } from "./layout-sort";
import { into, keys, play } from "./moves";
const C = S.chart;
export const sort = picture("sort", { play: play(
  into("sort"),
  { moves: [story("sort", 0), story("sort", 1)] },
  { moves: [rise(keys(S.list), { at: 0, duration: 0.4, stagger: 0 })] },
  { hold: 2, moves: [draw(C.key, { at: 0, duration: 0.6 }), draw(C.mid.key, { at: 0, duration: 0.6 }), rise(C.value.key, { at: 0, duration: 0.4 }), rise(C.readiness.key, { at: 0, duration: 0.4 }), ...S.quarters.flatMap(q => rise(q.key, { at: 0, duration: 0.4 }))] },
  { hold: 0.6, moves: S.dots.flatMap((d, i) => to(d.key, { autoAlpha: 1, x: 0, y: 0 }, { autoAlpha: 0, x: -18, y: 0 }, { at: i * 0.09, duration: 0.4 })) },
  { hold: 0.5, moves: [fill(S.corner.key, { at: 0, duration: 0.6 })] },
) });
