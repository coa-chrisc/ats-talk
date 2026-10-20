/**
 * Slide 8's click: the floor draws and the four blocks grow up from it,
 * tallest first, stepping down left to right, each named; the green arrow
 * draws up their left, named, with the first line; the dial draws, its
 * three ticks and its three settings come up in turn; the needle appears
 * pointing up and swings down to the first setting, with the second line.
 */
import { EASE, draw, fill, rise, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { ENFORCE } from "./layout-enforce";
import { into, play, turn } from "./moves";

const E = ENFORCE;
const D = E.dial;

const BLOCKS = { gap: 0.28, grow: 0.6 } as const;

export const enforce = picture("enforce", {
  play: play(
    into("enforce"),
    // The floor, and the blocks stepping down, each named.
    {
      hold: 0.05,
      moves: [
        draw(E.floor.key, { at: 0, duration: 0.7 }),
        ...E.steps.flatMap((step, i) => [fill(step.key, { at: 0.3 + i * BLOCKS.gap, duration: BLOCKS.grow, ease: EASE.out }), rise(step.name.key, { at: 0.55 + i * BLOCKS.gap, duration: 0.6 })]),
      ],
    },
    // The green arrow up their left, named, with the first line.
    { hold: 0.2, moves: [draw(E.arrow.key, { at: 0, duration: 0.8 }), rise(E.arrow.label.key, { at: 0.5 })] },
    { with: true, hold: 0.4, moves: [story("enforce", 0)] },
    // The dial draws, its ticks and settings in turn.
    {
      hold: 1.0,
      moves: [
        draw(D.key, { at: 0, duration: 0.9 }),
        ...D.ticks.flatMap((tick, i) => [draw(tick.key, { at: 0.5 + i * 0.3, duration: 0.3 }), rise(D.settings[i].key, { at: 0.55 + i * 0.3 })]),
      ],
    },
    // The needle swings down to the first setting and rests there.
    {
      hold: 0.2,
      moves: [show(D.needle.key, { at: 0, duration: 0.3 }), turn(D.needle.key, D.needle.rest, D.needle.from, { at: 0.3, duration: 1.0, ease: EASE.page })],
    },
    { with: true, hold: 0.5, moves: [story("enforce", 1)] },
  ),
});
