/**
 * Slide 11's click: the title, then both story lines together, and after
 * the reading pause the picture. The grid of departments comes up unlit,
 * named; the green policy line draws once round it, and as it closes its
 * column's heading, the policy's name and its caption come up; then the
 * other column's heading, and the three empty dashed plates wipe on in
 * turn, each with its words. Nothing fills them.
 */
import type { StepDef } from "@/components/deck/engine";
import { draw, rise, wipe } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { TRACK } from "./layout-track";
import { into, play } from "./moves";

const T = TRACK;

/** The policy line takes this long to draw round the grid. */
const RING = 0.8;
/** The plates wipe on this far apart. */
const PLATE = 0.6;

export const track = (): StepDef[] =>
  picture("track", {
    play: play([
      into("track"),
      { moves: [story("track", 0), story("track", 1)] },
      {
        moves: [
          // The grid, unlit, and its name.
          rise(T.grid.key, { at: 0, duration: 0.8 }),
          rise(T.name.key, { at: 0.2, duration: 0.6 }),
          // The policy line draws once round it; as it closes, what is in place.
          draw(T.ring.key, { at: 0.9, duration: RING, ease: "none" }),
          rise(T.place.key, { at: 1.5, duration: 0.5 }),
          rise(T.policy.name.key, { at: 1.6, duration: 0.6 }),
          rise(T.policy.caption.key, { at: 1.7, duration: 0.6 }),
          // What is still to establish: its heading, then the empty plates in turn.
          rise(T.gaps.key, { at: 2.0, duration: 0.5 }),
          ...T.plates.flatMap((plate, i) => wipe(plate.key, { at: 2.2 + i * PLATE, duration: 0.6 })),
        ],
      },
    ]),
  });
