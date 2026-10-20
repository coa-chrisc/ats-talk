/**
 * Slide 16's click: slide 13's wall comes up again, smaller, and its cards
 * turn one by one into dots where they hang; then at once the wall goes and
 * the dots fly to where each idea sits on the chart, the grey-tagged ones
 * low, while the chart draws on under them, its sides named; the quarter
 * lines draw once every dot is on its way; and the top right quarter washes
 * green and is named.
 */
import { EASE, draw, fill, hide, rise, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { SORT } from "./layout-sort";
import { into, play } from "./moves";

const S = SORT;
const C = S.chart;

/** One card after another turns into its dot. */
const TURN = { stagger: 0.08, shrink: 0.45, dot: 0.15, show: 0.3 } as const;
/** The dots fly one after another; the axes start just behind the first, and the quarter lines once the last has left. */
const FLY = { stagger: 0.08, duration: 0.9, axes: 0.1 } as const;
const LAST_LEAVES = (S.cards.length - 1) * FLY.stagger;

export const sort = picture("sort", {
  play: play(
    into("sort"),
    // The wall again, smaller.
    { hold: 0.05, moves: [rise(S.wall.key, { at: 0, duration: 0.6 })] },
    // Each card turns into a dot where it hangs.
    {
      hold: 0.5,
      moves: S.cards.flatMap((card, i) => [
        ...to(card.key, { autoAlpha: 0, "--s": 0.2 }, { autoAlpha: 1, "--s": 1 }, { at: i * TURN.stagger, duration: TURN.shrink, ease: EASE.soft }),
        ...to(card.dot.key, { autoAlpha: 1 }, { autoAlpha: 0, x: card.dot.from.x, y: card.dot.from.y }, { at: i * TURN.stagger + TURN.dot, duration: TURN.show, ease: EASE.soft }),
      ]),
    },
    // The wall goes and the dots fly to their places, the grey-tagged ones low, as the chart draws on under them and its sides are named.
    {
      hold: 0.15,
      moves: [
        hide(S.wall.key, { at: 0 }),
        ...S.cards.flatMap((card, i) => to(card.dot.key, { x: 0, y: 0 }, undefined, { at: i * FLY.stagger, duration: FLY.duration, ease: EASE.page })),
        draw(C.key, { at: FLY.axes }),
        rise(C.impact.key, { at: 0.5 }),
        rise(C.feasibility.key, { at: 0.7 }),
        draw(C.mid.key, { at: LAST_LEAVES + 0.12 }),
      ],
    },
    { with: true, hold: 0.6, moves: [story("sort", 0)] },
    // The top right quarter lights up, named.
    { hold: 0.3, moves: [fill(S.corner.key, { at: 0, duration: 0.8 }), rise(S.start.key, { at: 0.4 })] },
    { with: true, hold: 0.6, moves: [story("sort", 1)] },
  ),
});
