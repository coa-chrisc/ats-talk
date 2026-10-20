/**
 * Slide 2a's click: the four panels draw across the stage, left to right,
 * each numeral landing as its panel draws; the panels take their names in
 * turn, the first two with story line A and the last two with story line
 * B; then the route draws under them left to right, each stop arriving as
 * the line's front reaches it, named as it does, and the three stops light
 * green one after another, left to right.
 */
import type { StepDef } from "@/components/deck/engine";
import { EASE, HOLD, behind, draw, fill, rise, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { LESSONS } from "./layout-lessons";
import { into, play } from "./moves";

const F = LESSONS;
const R = F.route;

/** Each panel starts drawing this long after the one before it. */
const PANEL_NEXT = 0.14;
/** Each name comes up this long after the one before it. */
const NAME_NEXT = 0.55;
/** How long the route takes to cross the stage, so each stop arrives half a second or more after the one before. */
const LINE = { at: 0, duration: 2.4 } as const;
/** Each stop lights this long after the one before it, once the line is down. */
const LIGHT_NEXT = 0.45;

const reached = behind(LINE, R.stops.map((stop) => stop.along));

/** Two panels take their names, one after the other. */
const named = (first: number) => ({
  moves: F.panels.slice(first, first + 2).map((panel, i) => rise(panel.name.key, { at: i * NAME_NEXT, duration: 0.7 })),
});

export const lessons = (): StepDef[] =>
  picture("lessons", {
    play: play([
      into("lessons"),
      // The panels draw, each numeral landing as its panel draws.
      {
        with: true,
        hold: 0.35,
        moves: F.panels.flatMap((panel, i) => [draw(panel.key, { at: i * PANEL_NEXT, duration: 1 }), rise(panel.numeral.key, { at: 0.2 + i * PANEL_NEXT, duration: 0.6 })]),
      },
      // The first two names, with the line that names them.
      { hold: 0.3, ...named(0) },
      { with: true, hold: 0.4, moves: [story("lessons", 0)] },
      // The last two names, with theirs.
      { hold: HOLD.read, ...named(2) },
      { with: true, hold: 0.4, moves: [story("lessons", 1)] },
      // The route draws under the panels, each stop arriving as the front reaches it, named; then the stops light left to right.
      {
        hold: 0.7,
        moves: [
          draw(R.key, LINE),
          ...R.stops.flatMap((stop, i) => [show(stop.key, { at: reached[i], duration: 0.3 }), rise(stop.name.key, { at: reached[i] + 0.1, duration: 0.6 })]),
          ...R.stops.flatMap((stop, i) => fill(stop.key, { at: LINE.duration + 0.2 + i * LIGHT_NEXT, duration: 0.45, ease: EASE.out })),
        ],
      },
    ]),
  });
