/**
 * Slide 11a's click: the post lands with its tick and name; the four city
 * nameplates settle beside it one after another; the gauge draws under
 * them and its needle swings from the low end toward the high end, the
 * swept band drawing with it, its figure and caption coming up as it
 * settles, story line A with them; then the stair rises at the right,
 * named; the green figure appears on the first step and climbs to the
 * second; the indigo figure lands beside the stair with its caption, story
 * line B with it; and the plain tag drops at the foot.
 */
import type { StepDef } from "@/components/deck/engine";
import { EASE, draw, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { CONTROL } from "./layout-control";
import { drop, into, land, play, travel } from "./moves";

const C = CONTROL;
const G = C.gauge;
const S = C.stair;

/** The nameplates settle this far apart. */
const CITY = 0.18;
/** The needle's swing: long enough to read as pressure rising, on a curve that settles without overshoot. */
const SWING = 1.4;
/** The climb: up first, then onto the tread, as a step is taken. */
const CLIMB = { up: 0.4, overAt: 0.15, over: 0.55 } as const;

export const control = (): StepDef[] =>
  picture("control", {
    play: play([
      into("control"),
      // The post, its tick and its name.
      { with: true, hold: 0.5, moves: [land(C.post.key, 0, 0.5), show(C.post.tick.key, { at: 0.35, duration: 0.4 }), rise(C.post.name.key, { at: 0.25, duration: 0.6 })] },
      // The four cities settle beside it.
      { hold: -0.3, moves: C.cities.flatMap((city, i) => land(city.key, i * CITY, 0.5)) },
      // The gauge, and its needle swinging toward the high end, the figure and caption with it.
      {
        hold: 0.2,
        moves: [
          rise(G.key, { at: 0, duration: 0.5 }),
          to(G.needle.key, { autoAlpha: 1 }, { autoAlpha: 0 }, { at: 0.2, duration: 0.3, ease: EASE.soft }),
          to(G.needle.key, { "--r": G.needle.turn }, { "--r": 0 }, { at: 0.4, duration: SWING, ease: EASE.draw }),
          draw(G.reached.key, { at: 0.4, duration: SWING, ease: EASE.draw }),
          rise(G.figure.key, { at: 0.4 + SWING - 0.4, duration: 0.6 }),
          rise(G.caption.key, { at: 0.4 + SWING - 0.25, duration: 0.6 }),
        ],
      },
      { with: true, hold: 1.8, moves: [story("control", 0)] },
      // The stair at the right, named.
      { hold: 0.4, moves: [draw(S.floor.key, { at: 0, duration: 0.4 }), ...S.steps.flatMap((step, i) => rise(step.key, { at: 0.1 + i * 0.1, duration: 0.5 })), rise(S.name.key, { at: 0.3, duration: 0.6 }), rise(S.caption.key, { at: 0.45, duration: 0.6 })] },
      // The green figure on the first step, then its climb to the second.
      { hold: 0, moves: [show(C.climber.key, { at: 0, duration: 0.3 })] },
      {
        hold: 0.2,
        moves: [
          travel(C.climber.key, { y: C.climber.rise }, { at: 0, duration: CLIMB.up, ease: EASE.out }),
          travel(C.climber.key, { x: C.climber.run }, { at: CLIMB.overAt, duration: CLIMB.over, ease: EASE.soft }),
        ],
      },
      // The indigo figure beside the stair, with its caption, and story line B.
      { hold: 0.2, moves: [rise(C.big.key, { at: 0, duration: 0.7 }), rise(C.big.caption.key, { at: 0.15, duration: 0.6 })] },
      { with: true, hold: 0.3, moves: [story("control", 1)] },
      // The plain tag at the foot.
      { hold: 0.4, moves: [drop(C.budget.key, 0)] },
    ]),
  });
