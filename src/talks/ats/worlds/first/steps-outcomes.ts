/**
 * Slide 23's click: the six tiles draw across under the plan's name; the
 * first lights and its name comes up in it; a bracket draws under the
 * other five and their one caption comes up under it; project dots come up from below
 * and attach to the tiles' feet, most to the first. Under them a grey tally
 * draws stroke by stroke, named; then it fades, and in its place the first
 * point comes up, named, the line rises from it to the point it aims at,
 * named as it arrives, and the nameplate comes up under the line.
 */
import { EASE, draw, hide, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { comeUp, into, keys, play } from "./moves";
import { OUTCOMES } from "./layout-outcomes";

const O = OUTCOMES;
const M = O.measure;

/** The dots come up one after another, this far apart. */
const DOTS_APART = 0.08;
/** The tally's strokes draw one after another, quickly, like a hand counting. */
const TALLY = { apart: 0.07, stroke: 0.2 } as const;
/** The line rises over this long. */
const LINE = 1.3;

export const outcomes = picture("outcomes", {
  play: play(
    into("outcomes"),
    // The plan's six tiles draw across under its name.
    { with: true, hold: 0.4, moves: [rise(O.plan.key, { at: 0 }), draw(keys(O.tiles), { at: 0.1, duration: 0.7, stagger: 0.08 })] },
    // The first tile lights and its name comes up in it.
    { hold: 0.2, moves: [show(O.lit.key, { at: 0, duration: 0.5 }), rise(O.name.key, { at: 0.2 })] },
    // A bracket draws under the other five, and their one caption comes up under it.
    { hold: 0.3, moves: [draw(O.others.key, { at: 0, duration: 0.5 }), rise(O.others.caption.key, { at: 0.3 })] },
    // Projects come up from below and attach to the tiles, most to the first.
    { hold: 0.3, moves: [to(keys(O.dots), comeUp(O.dot.from).on, comeUp(O.dot.from).off, { at: 0, duration: 0.6, ease: EASE.out, stagger: DOTS_APART })] },
    // The grey tally draws stroke by stroke, named.
    {
      hold: 0.3,
      moves: [rise(O.tally.label.key, { at: 0 }), draw(keys(O.tally.strokes), { at: 0.1, duration: TALLY.stroke, stagger: TALLY.apart })],
    },
    { with: true, hold: 0.3, moves: [story("outcomes", 0)] },
    // It fades, and in its place the measure rises from its first point to the point it aims at.
    {
      hold: 0.5,
      moves: [
        hide([O.tally.key, O.tally.label.key], { at: 0, duration: 0.6, stagger: 0 }),
        show(M.start.key, { at: 0.4, duration: 0.3 }),
        rise(M.startLabel.key, { at: 0.45 }),
        draw(M.key, { at: 0.6, duration: LINE }),
        show(M.end.key, { at: 0.6 + LINE - 0.23, duration: 0.3 }),
        rise(M.endLabel.key, { at: 0.6 + LINE - 0.05 }),
      ],
    },
    { with: true, hold: 0.8, moves: [story("outcomes", 1)] },
    // The nameplate comes up under the line.
    { hold: 0.2, moves: [rise(O.plate.key, { at: 0 })] },
  ),
});
