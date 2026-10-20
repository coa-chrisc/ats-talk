/**
 * Slide 12's click: the grid of departments comes up, named once; a lantern
 * lights in the first named box, its leader draws out to its name and
 * caption, with story line A, then the second; then the smaller lanterns
 * light in other boxes one after another; the ring draws round the grid,
 * its nine dots landing along it, named, with story line B; the tag drops
 * under the grid; and after a hold the grey tag lands apart at the right.
 */
import type { StepDef } from "@/components/deck/engine";
import { EASE, draw, fill, rise, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { EXISTS } from "./layout-exists";
import { drop, into, play } from "./moves";

const E = EXISTS;
const R = E.ring;

/** A named lantern lights, its leader draws out to its name, and the name and caption come up. */
const lightNamed = (lit: (typeof E.named)[number]) => [
  fill(lit.key, { at: 0, duration: 0.6, ease: EASE.out }),
  draw(lit.leader.key, { at: 0.3, duration: 0.45 }),
  rise(lit.name.key, { at: 0.55, duration: 0.6 }),
  rise(lit.caption.key, { at: 0.7, duration: 0.6 }),
];
/** The smaller lanterns light one after another. */
const SMALL = 0.22;
/** The ring draws round from the top's middle; each dot lands as the ring's front reaches it. */
const RING = 1.2;

export const exists = (): StepDef[] =>
  picture("exists", {
    play: play([
      into("exists"),
      // The grid and its name.
      { with: true, hold: 0.4, moves: [rise(E.grid.key, { at: 0, duration: 0.7 }), rise(E.name.key, { at: 0.2, duration: 0.6 })] },
      // The first named lantern, then the second.
      { hold: 0.2, moves: lightNamed(E.named[0]) },
      { with: true, hold: 0.3, moves: [story("exists", 0)] },
      { with: true, hold: 0.9, moves: lightNamed(E.named[1]) },
      // The smaller lanterns, in boxes with no names.
      { hold: 0.3, moves: E.unnamed.flatMap((lit, i) => fill(lit.key, { at: i * SMALL, duration: 0.5, ease: EASE.out })) },
      // The ring forms round the grid, named.
      {
        hold: 0.4,
        moves: [
          draw(R.key, { at: 0, duration: RING, ease: "none" }),
          ...R.dots.flatMap((dot, i) => show(dot.key, { at: (i / R.dots.length) * RING, duration: 0.25 })),
          rise(R.name.key, { at: 0.8, duration: 0.6 }),
          rise(R.caption.key, { at: 0.95, duration: 0.6 }),
        ],
      },
      { with: true, hold: 0.5, moves: [story("exists", 1)] },
      // The tag drops under the grid.
      { hold: 0.3, moves: [drop(E.staff.key, 0)] },
      // After a hold, the grey tag apart at the right.
      { hold: 1.1, moves: [drop(E.apart.key, 0)] },
    ]),
  });
