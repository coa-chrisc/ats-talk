/**
 * Slide 21's click: the last slide's picture goes and the title changes;
 * the two lanes draw, each named. The lower lane starts to run at
 * once: a box steps in at its left end and the whole belt steps one place to
 * the right, again and again, slowly. Then the upper lane's wells fill one
 * at a time, each named; an arrow runs down from each into the lower lane,
 * and from the step after it lands the belt steps quicker, so by the fourth
 * arrow it is running about four times as fast as at the start, and the
 * click ends on the belt's last step, both lanes full.
 */
import { EASE, draw, fill, rise, to, type ChainBeat } from "@/components/deck/kit";
import type { PartMove } from "@/components/deck/engine/types";
import { picture, story } from "../steps";
import { into, play } from "./moves";
import { BELT, ENTER, LANES, PARCELS, placeX } from "./layout-lanes";

const L = LANES;

/** The lanes start once the new title is coming up (its lines rise from 0.25 s), as they did when this slide opened its own world. */
const START = 0.35;
/** The lanes draw, the upper first; each name comes up as its lane is half drawn. */
const LANES_AT = { upper: START + 0.25, lower: START + 0.4, draw: 0.8, name: 0.3 } as const;

/**
 * The belt's pace before any arrow has landed, and after each of the four:
 * how long one step takes, and the pause before the next. A step's whole
 * cycle runs 1.2, 0.82, 0.58, 0.42 and then 0.32 s.
 */
export const PACE = [
  { move: 0.9, rest: 0.3 },
  { move: 0.62, rest: 0.2 },
  { move: 0.44, rest: 0.14 },
  { move: 0.32, rest: 0.1 },
  { move: 0.24, rest: 0.08 },
] as const;
/** The belt's first step. */
const BELT_AT = 1.3;

/** The first well fills here; each arrow starts `arrow` after its well does and draws over `draw`; the next well fills `look` after it lands, so the belt is seen to quicken first. */
const WELLS = { at: 2.7, fill: 0.5, name: 0.23, arrow: 0.45, draw: 0.45, look: 1.0 } as const;

/** Each well's fill and its arrow's landing. */
export const WELL_TIMES = L.pieces.reduce<{ fill: number; lands: number }[]>((times, _, i) => {
  const at = i === 0 ? WELLS.at : times[i - 1].lands + WELLS.look;
  return [...times, { fill: at, lands: at + WELLS.arrow + WELLS.draw }];
}, []);

/** Every step of the belt: when it starts, how long it takes, and how many arrows have landed by then. One step for each box. */
export const TICKS = Array.from({ length: PARCELS }).reduce<{ at: number; move: number; landed: number }[]>((ticks) => {
  const prev = ticks.at(-1);
  const at = prev ? prev.at + prev.move + PACE[prev.landed].rest : BELT_AT;
  const landed = WELL_TIMES.filter((well) => well.lands <= at + 1e-9).length;
  return [...ticks, { at, move: PACE[landed].move, landed }];
}, []);

/** The story lines: the first as the belt starts, the second as the first well fills. */
const STORY_AT = [BELT_AT + 0.6, WELLS.at + 0.1] as const;

/**
 * At each step every box on the belt moves one place right. Box `i` steps in
 * at step `i` from just left of the first place, faded; at its ninth step it
 * moves past the last place and fades out, leaving the lane.
 */
const belt: PartMove[] = L.parcels.flatMap((parcel, i) =>
  TICKS.slice(i, i + BELT.places + 1).flatMap((tick, k) => {
    const timing = { at: tick.at, duration: tick.move, ease: EASE.draw };
    if (k === 0) return to(parcel.key, { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: -ENTER }, timing);
    if (k === BELT.places) return to(parcel.key, { autoAlpha: 0, x: placeX(k) }, undefined, timing);
    return to(parcel.key, { x: placeX(k) }, undefined, timing);
  }),
);

const wells: PartMove[] = L.pieces.flatMap((piece, i) => {
  const { fill: at } = WELL_TIMES[i];
  return [...fill(piece.key, { at, duration: WELLS.fill }), ...rise(piece.label.key, { at: at + WELLS.name }), ...draw(piece.arrow.key, { at: at + WELLS.arrow, duration: WELLS.draw })];
});

/** One beat, every move placed from the click: the last picture going and the retitle, then the lanes; the belt's steps are set by the arrows' landings, so the slide is timed as one piece. */
const whole: ChainBeat = {
  moves: [
    ...into("lanes").moves,
    draw(L.upper.key, { at: LANES_AT.upper, duration: LANES_AT.draw }),
    rise(L.upper.name.key, { at: LANES_AT.upper + LANES_AT.name }),
    draw(L.lower.key, { at: LANES_AT.lower, duration: LANES_AT.draw }),
    rise(L.lower.name.key, { at: LANES_AT.lower + LANES_AT.name }),
    belt,
    story("lanes", 0, { at: STORY_AT[0] }),
    wells,
    story("lanes", 1, { at: STORY_AT[1] }),
  ],
};

export const lanes = picture("lanes", { play: play(whole) });
