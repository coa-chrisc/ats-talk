/** Display slide 12: read the complete text, then criteria, then the uninterrupted gated climb. */
import { EASE, draw, rise, show } from "@/components/deck/kit";
import { picture } from "../steps";
import { EARN } from "./layout-earn";
import { into, play, travel } from "./moves";

import { pilotIntro, TEXT_TO_VISUAL_PAUSE, supportingText } from "../pilot-sequence";

const E = EARN;
const P = E.project;
const HOME = { x: 0, y: 0 };

/** The steps come up this far apart. */
const STEPS = { gap: 0.12 } as const;
/** A climb: up first, then onto the tread a little after. */
const CLIMB = { up: 0.4, overAt: 0.15, over: 0.6 } as const;
export const earn = picture("earn", {
  play: play(
    pilotIntro(into("earn")),
    supportingText("earn"),
    // Read the criteria before following the project; these are not completed checks.
    { hold: TEXT_TO_VISUAL_PAUSE, moves: [rise(E.heading.key, { at: 0, duration: 0.4 }), rise(E.list.map(row => row.key), { at: 0, duration: 0.4, stagger: 0 })] },
    // The floor, and the four steps left to right, each with its gate.
    {
      hold: TEXT_TO_VISUAL_PAUSE,
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
    // The box rises over the first gate, and settles onto the second step.
    {
      hold: 0.6,
      moves: [
        travel(P.key, { y: P.hop }, HOME, { at: 0, duration: CLIMB.up, ease: EASE.out }),
        travel(P.key, { x: P.second.x }, HOME, { at: CLIMB.overAt, duration: CLIMB.over + 0.1, ease: EASE.soft }),
        travel(P.key, { y: P.second.y }, HOME, { at: CLIMB.overAt + CLIMB.over - 0.05, duration: 0.3, ease: EASE.soft }),
      ],
    },
    // The second tick lands.
    { hold: 0.1, moves: [show(E.ticks[1].key, { at: 0 })] },
  ),
});
