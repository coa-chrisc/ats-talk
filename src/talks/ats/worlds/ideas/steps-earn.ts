/**
 * Slide 10's click: the floor draws and the four steps come up one after
 * another, left to right, each with its gate; the green project box appears
 * on the floor and climbs onto the first step; the passed tick lands beside
 * it with its caption, with the first line; the box climbs over the first
 * gate onto the second step, and a second tick lands; the third step stays
 * empty. The checklist's heading rises beside the stair, then the rows
 * come up one by one under it, each taking its tick in turn, with the
 * second line.
 */
import { EASE, draw, rise, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { EARN } from "./layout-earn";
import { into, play, travel } from "./moves";

const E = EARN;
const P = E.project;
const HOME = { x: 0, y: 0 };

/** The steps come up this far apart. */
const STEPS = { gap: 0.22 } as const;
/** A climb: up first, then onto the tread a little after. */
const CLIMB = { up: 0.4, overAt: 0.15, over: 0.6 } as const;
/** The checklist's rows, then their ticks, one by one. */
const LIST = { stagger: 0.1, tick: 0.45, ticks: 0.22 } as const;

export const earn = picture("earn", {
  play: play(
    into("earn"),
    // The floor, and the four steps left to right, each with its gate.
    {
      hold: 0.05,
      moves: [draw(E.floor.key, { at: 0, duration: 0.7 }), ...E.steps.map((step, i) => rise(step.key, { at: 0.25 + i * STEPS.gap, duration: 0.6 }))],
    },
    // The box appears on the floor and climbs onto the first step.
    {
      hold: 0.25,
      moves: [
        show(P.key, { at: 0, duration: 0.3 }),
        travel(P.key, { y: P.first.y }, HOME, { at: 0.3, duration: CLIMB.up, ease: EASE.out }),
        travel(P.key, { x: P.first.x }, HOME, { at: 0.3 + CLIMB.overAt, duration: CLIMB.over, ease: EASE.soft }),
      ],
    },
    // The first tick lands beside it, its caption with it.
    { hold: 0.15, moves: [show(E.ticks[0].key, { at: 0 }), rise(E.evidence.key, { at: 0.12 })] },
    { with: true, hold: 0.1, moves: [story("earn", 0)] },
    // The box rises over the first gate, and settles onto the second step.
    {
      hold: 0.35,
      moves: [
        travel(P.key, { y: P.hop }, HOME, { at: 0, duration: CLIMB.up, ease: EASE.out }),
        travel(P.key, { x: P.second.x }, HOME, { at: CLIMB.overAt, duration: CLIMB.over + 0.1, ease: EASE.soft }),
        travel(P.key, { y: P.second.y }, HOME, { at: CLIMB.overAt + CLIMB.over - 0.05, duration: 0.3, ease: EASE.soft }),
      ],
    },
    // The second tick lands.
    { hold: 0.1, moves: [show(E.ticks[1].key, { at: 0 })] },
    // The checklist's heading beside the stair.
    { hold: 0.1, moves: [rise(E.heading.key, { at: 0 })] },
    // The rows under it, one by one, each taking its tick, with the second line.
    {
      hold: 0.35,
      moves: [
        rise(
          E.list.map((row) => row.key),
          { at: 0, stagger: LIST.stagger },
        ),
        show(
          E.list.map((row) => row.tick.key),
          { at: LIST.tick, stagger: LIST.ticks },
        ),
      ],
    },
    { with: true, hold: 0.2, moves: [story("earn", 1)] },
  ),
});
