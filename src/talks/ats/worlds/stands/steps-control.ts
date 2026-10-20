/**
 * Slide 11a's click: the post lands with its tick and name, and its closed
 * gate on the ground line beside it; the grey paths wear in round the gate
 * one after another, running off the stage's edge, named with their
 * caption; the gauge draws under them and its needle swings from the low
 * end toward the high end, the swept band drawing with it, its figure and
 * caption coming up as it settles, story line A with them; then the stair
 * rises at the right, named; the green figure appears on the first step and
 * climbs to the second; the green eye settles over the stair, named, story
 * line B with it; and the indigo figure lands beside the stair with its
 * caption.
 */
import type { StepDef } from "@/components/deck/engine";
import { EASE, draw, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { CONTROL } from "./layout-control";
import { into, land, play, settle, travel } from "./moves";

const C = CONTROL;
const G = C.gauge;
const S = C.stair;

/** The paths start wearing in this far apart, each over this long. */
const PATH = { gap: 0.3, wear: 1.1 } as const;
/** The needle's swing: long enough to read as pressure rising, on a curve that settles without overshoot. */
const SWING = 1.4;
/** The climb: up first, then onto the tread, as a step is taken. */
const CLIMB = { up: 0.4, overAt: 0.15, over: 0.55 } as const;

export const control = (): StepDef[] =>
  picture("control", {
    play: play([
      into("control"),
      // The post, its tick and its name, and the closed gate beside it on the ground line.
      { with: true, hold: 0.2, moves: [draw(C.ground.key, { at: 0, duration: 0.4 }), land(C.post.key, 0.1, 0.5), show(C.post.tick.key, { at: 0.45, duration: 0.4 }), rise(C.post.name.key, { at: 0.35, duration: 0.6 })] },
      { hold: 0.2, moves: land(C.gate.key, 0, 0.5) },
      // The paths wear in round the gate and off the edge, named.
      {
        hold: 0.3,
        moves: [
          ...C.paths.flatMap((path, i) => draw(path.key, { at: i * PATH.gap, duration: PATH.wear, ease: EASE.draw })),
          rise(C.shadow.key, { at: 0.5, duration: 0.6 }),
          rise(C.shadow.caption.key, { at: 0.65, duration: 0.6 }),
        ],
      },
      // The gauge, and its needle swinging toward the high end, the figure and caption with it, and story line A.
      {
        hold: 0.2,
        moves: [
          rise(G.key, { at: 0, duration: 0.5 }),
          to(G.needle.key, { autoAlpha: 1 }, { autoAlpha: 0 }, { at: 0.2, duration: 0.3, ease: EASE.soft }),
          to(G.needle.key, { "--r": G.needle.turn }, { "--r": 0 }, { at: 0.4, duration: SWING, ease: EASE.draw }),
          draw(G.reached.key, { at: 0.4, duration: SWING, ease: EASE.draw }),
          rise(G.figure.key, { at: 0.4 + SWING - 0.4, duration: 0.6 }),
          rise(G.caption.key, { at: 0.4 + SWING - 0.25, duration: 0.6 }),
          ...story("control", 0, { at: 0.4 + SWING - 0.1 }),
        ],
      },
      { hold: 1.2, moves: [] },
      // The stair at the right, named.
      { hold: 0.3, moves: [draw(S.floor.key, { at: 0, duration: 0.4 }), ...S.steps.flatMap((step, i) => rise(step.key, { at: 0.1 + i * 0.1, duration: 0.5 })), rise(S.name.key, { at: 0.3, duration: 0.6 }), rise(S.caption.key, { at: 0.45, duration: 0.6 })] },
      // The green figure on the first step, then its climb to the second.
      { hold: 0, moves: [show(C.climber.key, { at: 0, duration: 0.3 })] },
      {
        hold: 0.1,
        moves: [
          travel(C.climber.key, { y: C.climber.rise }, { at: 0, duration: CLIMB.up, ease: EASE.out }),
          travel(C.climber.key, { x: C.climber.run }, { at: CLIMB.overAt, duration: CLIMB.over, ease: EASE.soft }),
        ],
      },
      // The eye settles over the stair, named, and story line B.
      { hold: 0.2, moves: [...settle(C.eye.key, -16, 0, 0.6), rise(C.eye.name.key, { at: 0.2, duration: 0.6 })] },
      { with: true, hold: 0.3, moves: [story("control", 1)] },
      // The indigo figure beside the stair, with its caption.
      { hold: 0.4, moves: [rise(C.big.key, { at: 0, duration: 0.7 }), rise(C.big.caption.key, { at: 0.15, duration: 0.6 })] },
    ]),
  });
