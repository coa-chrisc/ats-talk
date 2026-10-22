/**
 * Slide 2's one click: the wordmark and its caption first, then the four
 * boxes land as dashed outlines with their names, then each box in turn,
 * left to right, turns green and its tick lands. The slide ends on the last
 * tick. ATS sequence.ts gives the story lines their own reading phase first.
 */
import type { StepDef } from "@/components/deck/engine";
import { fill, rise } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { COURSE } from "./layout-course";
import { into, land, play } from "./moves";

const C = COURSE;

/** The caption comes up this long after the wordmark starts; both take this long. */
const HEAD = { caption: 0.15, duration: 0.6 } as const;
/** Each box lands this long after the one before it, and takes this long. */
const BOXES = { next: 0.2, duration: 0.5 } as const;
/** Each box turns this long after the one before it and takes this long; its tick starts landing this far into the turn and takes this long. */
const TURN = { next: 0.5, duration: 0.45, tick: 0.15, land: 0.4 } as const;

export const course = (): StepDef[] =>
  picture("course", {
    play: play([
      into("course"),
      { moves: [story("course", 0), story("course", 1)] },
      { moves: [rise(C.wordmark.key, { at: 0, duration: HEAD.duration }), rise(C.college.key, { at: HEAD.caption, duration: HEAD.duration })] },
      { hold: 0.3, moves: C.modules.map((mod, i) => land(mod.key, { at: i * BOXES.next, duration: BOXES.duration })) },
      // After a moment on the dashed row, each box turns in turn, its tick landing as it does.
      {
        hold: 0.5,
        moves: C.modules.flatMap((mod, i) => [
          fill(mod.turn.key, { at: i * TURN.next, duration: TURN.duration }),
          land(mod.tick.key, { at: i * TURN.next + TURN.tick, duration: TURN.land }),
        ]),
      },
    ]),
  });
