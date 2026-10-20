/**
 * Slide 4's click: the timeline draws left to right, its first year as it
 * starts and its last as it ends; each figure lands on the line as the
 * line's front passes it, named as it lands, with story line A; then the
 * loop draws under the agent, round from its top, each stop arriving and
 * lighting as the front reaches it, named as it does, with story line B;
 * and the bar lands across the ring where it closes, named.
 */
import type { StepDef } from "@/components/deck/engine";
import { EASE, behind, draw, fill, rise, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { AGENTS } from "./layout-agents";
import { into, land, play } from "./moves";
import { headOf, personOf } from "./parts-figures";

const A = AGENTS;
const L = A.loop;

/** How long the line takes to cross the stage: slow enough that each figure lands as its front passes, half a second or more apart. */
const LINE = { at: 0, duration: 2.4 } as const;
/** Each figure lands a little behind the front, so the line is under it first. */
const BEHIND = 0.08;
/** How long the ring takes to go round once, at an even pace, as a loop runs: each stop 0.6 s after the one before. */
const RING = { at: 0, duration: 3, ease: "none" } as const;

const landed = behind(LINE, A.figures.map((figure) => figure.along));
const reached = L.stops.map((stop) => RING.at + RING.duration * stop.along);

/** What a figure does as it lands: the person beside the draft draws on; the belted figure's head ring fills green. */
const inner = (figure: (typeof A.figures)[number], at: number) =>
  figure.kind === "draft" ? draw(personOf(figure.key), { at: at + 0.15, duration: 0.6 }) : figure.kind === "belted" ? fill(headOf(figure.key), { at: at + 0.15, duration: 0.6 }) : [];

export const agents = (): StepDef[] =>
  picture("agents", {
    play: play([
      into("agents"),
      // The line draws across the stage, its years at its two ends, and each figure lands on it as its front passes, named as it lands.
      {
        with: true,
        hold: 0.4,
        moves: [
          draw(A.line.key, LINE),
          show(A.ticks[0].key, { at: 0, duration: 0.3 }),
          rise(A.years[0].key, { at: 0.05, duration: 0.6 }),
          ...A.figures.flatMap((figure, i) => [
            land(figure.key, landed[i] + BEHIND),
            inner(figure, landed[i] + BEHIND),
            rise(figure.name.key, { at: landed[i] + BEHIND + 0.15, duration: 0.6 }),
            rise(figure.caption.key, { at: landed[i] + BEHIND + 0.3, duration: 0.6 }),
          ]),
          show(A.ticks[1].key, { at: LINE.duration - 0.1, duration: 0.3 }),
          rise(A.years[1].key, { at: LINE.duration - 0.05, duration: 0.6 }),
        ],
      },
      { with: true, hold: 1.5, moves: [story("agents", 0)] },
      // The loop goes round under the agent from its top, each stop arriving and lighting as the front reaches it, named as it does.
      {
        hold: 0.6,
        moves: [
          draw(L.key, RING),
          ...L.stops.flatMap((stop, i) => [
            show(stop.key, { at: reached[i], duration: 0.25 }),
            fill(stop.key, { at: reached[i] + 0.2, duration: 0.4, ease: EASE.out }),
            rise(stop.name.key, { at: reached[i] + 0.1, duration: 0.55 }),
          ]),
        ],
      },
      { with: true, hold: 1.4, moves: [story("agents", 1)] },
      // The bar lands across the ring where the loop closes, and its name.
      { hold: 0.2, moves: [draw(L.bar.key, { at: 0, duration: 0.45 }), rise(L.bar.name.key, { at: 0.25, duration: 0.6 })] },
    ]),
  });
