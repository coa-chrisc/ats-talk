/** Course tiles appear with their labels; the workbench row is coordinated. ATS sequence.ts supplies the separate reading phase. */
import type { StepDef } from "@/components/deck/engine";
import { HOLD, draw, rise } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { COURSE } from "./layout-course";
import { into, land, play } from "./moves";

const C = COURSE;

/** Each tile lands this long after the one before it. */

/** Each name comes up this long after the one before it. */

/** Each bench starts drawing this long after the one before it, and takes this long. */
const BENCH_NEXT = 0;
const BENCH_DRAW = 0.9;

export const course = (): StepDef[] =>
  picture("course", {
    play: play([
      into("course"),
      { hold: 0.35, moves: C.tiles.flatMap((tile, i) => [land(tile.key, { at: i * 0.25, duration: 0.5 }), rise(tile.name.key, { at: i * 0.25, duration: 0.5 })]) },
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
