/**
 * Slide 2's click: the four tiles land in a row, left to right; the tiles
 * take their names in turn; the
 * college's caption settles under the row and story line A rises with it;
 * then a bench draws under each tile in turn, story line B rising as they
 * do, and the build's caption lands under the four benches.
 */
import type { StepDef } from "@/components/deck/engine";
import { HOLD, draw, rise } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { COURSE } from "./layout-course";
import { into, land, play } from "./moves";

const C = COURSE;

/** Each tile lands this long after the one before it. */
const TILE_NEXT = 0.14;
/** Each name comes up this long after the one before it. */
const NAME_NEXT = 0.5;
/** Each bench starts drawing this long after the one before it, and takes this long. */
const BENCH_NEXT = 0.3;
const BENCH_DRAW = 0.9;

export const course = (): StepDef[] =>
  picture("course", {
    play: play([
      into("course"),
      // The tiles land, left to right.
      { with: true, hold: 0.35, moves: C.tiles.map((tile, i) => land(tile.key, { at: i * TILE_NEXT, duration: 0.6 })) },
      // The names, in turn.
      { hold: 0.3, moves: C.tiles.map((tile, i) => rise(tile.name.key, { at: i * NAME_NEXT, duration: 0.7 })) },
      // The college's caption settles under the row, and the line that names it rises with it.
      { hold: 0.2, moves: [rise(C.college.key, { duration: 0.6 })] },
      { with: true, hold: 0.2, moves: [story("course", 0)] },
      // A bench draws under each tile in turn, after a hold to read; the line about the build rises as they draw.
      { hold: HOLD.read, moves: C.tiles.map((tile, i) => draw(tile.bench.key, { at: i * BENCH_NEXT, duration: BENCH_DRAW })) },
      { with: true, hold: 0.6, moves: [story("course", 1)] },
      // The build's caption lands under the four benches.
      { hold: 0.3, moves: [rise(C.build.key, { duration: 0.6 })] },
    ]),
  });
