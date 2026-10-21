/** Complete lesson panels appear left to right, followed by one quiet route. ATS sequence.ts separates the supporting text. */
import type { StepDef } from "@/components/deck/engine";
import { EASE, behind, draw, fill, rise, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { LESSONS } from "./layout-lessons";
import { into, play } from "./moves";

const F = LESSONS;
const R = F.route;

/** Each panel starts drawing this long after the one before it. */

/** Each name comes up this long after the one before it. */

/** How long the route takes to cross the stage, so each stop arrives half a second or more after the one before. */
const LINE = { at: 0, duration: 0.6 } as const;
/** Each stop lights this long after the one before it, once the line is down. */


const reached = behind(LINE, R.stops.map((stop) => stop.along));

export const lessons = (): StepDef[] =>
  picture("lessons", {
    play: play([
      into("lessons"),
      { hold: 0.35, moves: F.panels.flatMap((panel, i) => [draw(panel.key, { at: i * 0.3, duration: 0.5 }), rise(panel.numeral.key, { at: i * 0.3, duration: 0.5 }), rise(panel.name.key, { at: i * 0.3, duration: 0.5 })]) },
      { moves: [story("lessons", 0), story("lessons", 1)] },
      // The route draws under the panels, each stop arriving as the front reaches it, named; then the stops light left to right.
      {
        hold: 0.7,
        moves: [
          draw(R.key, LINE),
          ...R.stops.flatMap((stop, i) => [show(stop.key, { at: reached[i], duration: 0.3 }), rise(stop.name.key, { at: reached[i] + 0.1, duration: 0.6 })]),
          ...R.stops.flatMap((stop, i) => fill(stop.key, { at: reached[i], duration: 0.45, ease: EASE.out })),
        ],
      },
    ]),
  });
