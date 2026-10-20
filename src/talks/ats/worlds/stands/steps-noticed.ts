/**
 * Slide 12a's click: the rail draws across the wall; the plaques settle one
 * at a time, each on its cord as the cord draws, the top row left to right
 * and then the bottom row, story line A rising with the second; the fifth
 * plaque's four nameplates land in it one after another; and after a hold
 * the grey tag drops apart under the wall, with story line B.
 */
import type { StepDef } from "@/components/deck/engine";
import { draw, rise } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { NOTICED, PLAQUE } from "./layout-noticed";
import { drop, into, play, settle } from "./moves";

const N = NOTICED;

/** Each plaque this long after the last; its cord draws first and it settles onto it. */
const APART = 0.8;
const CORD = 0.4;
/** The small nameplates, one after another. */
const HOST = 0.16;

/** A plaque's cord draws, and the plaque settles onto it. */
const hang = (plaque: (typeof N.plaques)[number]) => [draw(plaque.cord.key, { at: 0, duration: CORD }), ...settle(plaque.key, PLAQUE.settle, CORD * 0.6)];

export const noticed = (): StepDef[] =>
  picture("noticed", {
    play: play([
      into("noticed"),
      // The rail across the wall.
      { with: true, hold: 0.4, moves: [draw(N.rail.key, { at: 0, duration: 0.8 })] },
      // The plaques, one at a time: the first, then the second with story line A.
      { hold: -0.2, moves: hang(N.plaques[0]) },
      { with: true, hold: APART, moves: hang(N.plaques[1]) },
      { with: true, hold: 0.3, moves: [story("noticed", 0)] },
      { with: true, hold: APART - 0.3, moves: hang(N.plaques[2]) },
      { with: true, hold: APART, moves: hang(N.plaques[3]) },
      { with: true, hold: APART, moves: hang(N.plaques[4]) },
      // The fifth plaque's four names land in it, one after another.
      { hold: 0, moves: N.hosts.flatMap((host, i) => rise(host.key, { at: i * HOST, duration: 0.5 })) },
      // After a hold, the grey tag apart under the wall, with story line B.
      { hold: 0.9, moves: [drop(N.only.key, 0)] },
      { with: true, hold: 0.3, moves: [story("noticed", 1)] },
    ]),
  });
