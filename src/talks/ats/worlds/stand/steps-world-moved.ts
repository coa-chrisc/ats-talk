/**
 * Slide 2's click: the timeline draws left to right, its first year as it
 * starts and its last as it ends; each figure lands on the line as the
 * line's front passes it, named as it lands; then the three indigo figures
 * rise in turn under the line, story line A with the first; and after a
 * hold to read them the grey figure lands at the far right, with story
 * line B.
 */
import type { StepDef } from "@/components/deck/engine";
import { HOLD, behind, draw, fill, rise, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { WORLD_MOVED } from "./layout-world-moved";
import { into, land, play } from "./moves";
import { headOf, personOf } from "./parts-figures";

const W = WORLD_MOVED;

/** How long the line takes to cross the stage: slow enough that each figure lands as its front passes, half a second or more apart. */
const LINE = { at: 0, duration: 2.4 } as const;
/** Each figure lands a little behind the front, so the line is under it first. */
const BEHIND = 0.08;
/** Each indigo figure starts this long after the one before. */
const NEXT = 0.7;

const landed = behind(LINE, W.figures.map((figure) => figure.along));

/** What a figure does as it lands: the person beside the draft draws on; the belted figure's head ring fills green. */
const inner = (figure: (typeof W.figures)[number], at: number) =>
  figure.kind === "draft" ? draw(personOf(figure.key), { at: at + 0.15, duration: 0.6 }) : figure.kind === "belted" ? fill(headOf(figure.key), { at: at + 0.15, duration: 0.6 }) : [];

export const worldMoved = (): StepDef[] =>
  picture("world-moved", {
    play: play([
      into("world-moved"),
      // The line draws across the stage, its years at its two ends, and each figure lands on it as its front passes, named as it lands.
      {
        with: true,
        hold: 0.4,
        moves: [
          draw(W.line.key, LINE),
          show(W.ticks[0].key, { at: 0, duration: 0.3 }),
          rise(W.years[0].key, { at: 0.05, duration: 0.6 }),
          ...W.figures.flatMap((figure, i) => [
            land(figure.key, landed[i] + BEHIND),
            inner(figure, landed[i] + BEHIND),
            rise(figure.name.key, { at: landed[i] + BEHIND + 0.15, duration: 0.6 }),
            rise(figure.caption.key, { at: landed[i] + BEHIND + 0.3, duration: 0.6 }),
          ]),
          show(W.ticks[1].key, { at: LINE.duration - 0.1, duration: 0.3 }),
          rise(W.years[1].key, { at: LINE.duration - 0.05, duration: 0.6 }),
        ],
      },
      // The three indigo figures rise in turn under the line, each with its caption.
      {
        hold: 0.3,
        moves: W.stats.slice(0, 3).flatMap((stat, i) => [rise(stat.key, { at: i * NEXT, duration: 0.75 }), rise(stat.caption.key, { at: i * NEXT + 0.1, duration: 0.75 })]),
      },
      { with: true, hold: 0.25, moves: [story("world-moved", 0)] },
      // After a hold to read them, the grey figure lands apart at the far right.
      { hold: HOLD.read, moves: [rise(W.stats[3].key, { at: 0, duration: 0.75 }), rise(W.stats[3].caption.key, { at: 0.1, duration: 0.75 })] },
      { with: true, hold: 0.35, moves: [story("world-moved", 1)] },
    ]),
  });
