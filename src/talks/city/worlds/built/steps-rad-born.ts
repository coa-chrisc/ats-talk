/**
 * The click of slide 6b, one chain (beats.ts): the library block lands
 * first, its tiles inside it and its name on it, and its count drops on
 * at its foot, with line A; the process's three blocks land beside it one
 * at a time, with line B; then the base opens out from the left under
 * all four; and last a ring draws round the row and its base together,
 * from under its corner and back to it, where a bubble comes up and names
 * the whole. The slide ends on the row standing on its base, in the ring.
 */
import { EASE, draw, to, wipe } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./beats";
import { RAD_BORN } from "./layout-rad-born";

const { library, steps, base, ring, bubble, drop } = RAD_BORN;

/** A block lands over this long; the process's blocks land this far apart. */
const LAND = 0.7;
const STEP_APART = 1.0;
/** The count drops on once its block has landed. */
const COUNT_AFTER = 0.7;
/** The ring draws round over this long; the bubble comes up as its line closes, over this long, with a small overshoot. */
const RING = 1.6;
const BUBBLE = 0.6;
const POP = "back.out(1.7)";

/** Parts that land together from a little above. */
const land = (keys: string | string[], at: number, from = drop) => to(keys, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: from }, { at, duration: LAND, ease: EASE.out, stagger: 0 });

export const radBorn = picture("rad-born", {
  play: play(
    into("rad-born"),
    {
      // the library block lands, its tiles and name with it, then its count drops on at its foot.
      with: true,
      hold: 0.5,
      moves: [land([library.key, library.name.key], 0), land(library.count.key, COUNT_AFTER, library.count.drop)],
    },
    { with: true, hold: 0.6, moves: [story("rad-born", 0)] },
    // the process's three blocks land beside it, one at a time.
    { hold: 0.3, moves: steps.map((block, i) => land(block.key, i * STEP_APART)) },
    { with: true, hold: STEP_APART, moves: [story("rad-born", 1)] },
    // under all four, the base opens out from the left.
    { hold: 0.5, moves: [wipe(base.key, { at: 0, duration: 1.4, from: "left" })] },
    {
      // the ring draws round the row and its base, and the bubble comes up on its corner as the line closes.
      hold: 0.3,
      moves: [
        draw(ring.key, { at: 0, duration: RING }),
        to(bubble.key, { autoAlpha: 1, scale: 1 }, { autoAlpha: 0, scale: bubble.from }, { at: RING - 0.15, duration: BUBBLE, ease: POP }),
      ],
    },
  ),
});
