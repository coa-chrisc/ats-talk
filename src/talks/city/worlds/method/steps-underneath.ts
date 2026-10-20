/**
 * Slide 15's click: two idea cards sit on their stacks; the first lifts and
 * its three layers come up from the bottom, each taking a deep-green tick
 * in turn, and its verdict comes up under it; the second lifts the same
 * way, two of its layers take ticks and its lowest a grey gap mark instead,
 * and its verdict comes up.
 */
import { EASE, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { UNDERNEATH } from "./layout-underneath";
import { into, keys, play } from "./moves";

const U = UNDERNEATH;
const [first, second] = U.cards;

/** A card lifting, and its layers coming up under it from the bottom. */
const LIFT = { duration: 0.9, layers: 0.3, stagger: 0.2, rise: 0.6 } as const;
/** The ticks, one after another. */
const TICK = 0.3;

const lift = (card: (typeof U.cards)[number]) => [
  to(card.key, { "--y": 0 }, undefined, { at: 0, duration: LIFT.duration, ease: EASE.page }),
  rise(keys(card.layers), { at: LIFT.layers, duration: LIFT.rise, stagger: LIFT.stagger }),
];

const passed = (card: (typeof U.cards)[number]) => card.layers.filter((_, i) => !(card === U.cards[U.gap.column] && i === U.gap.layer)).map((layer) => layer.mark.key);
const gap = second.layers[U.gap.layer].mark.key;

export const underneath = picture("underneath", {
  play: play(
    into("underneath"),
    // The two cards, sitting on their stacks.
    {
      hold: 0.05,
      moves: [
        to(
          keys(U.cards),
          { autoAlpha: 1 },
          { autoAlpha: 0, "--y": first.lift },
          { at: 0, duration: 0.4, ease: EASE.soft, stagger: 0.1 },
        ),
      ],
    },
    // The first lifts to show its layers, with the first line.
    { hold: 0.3, moves: lift(first) },
    { with: true, hold: 0.4, moves: [story("underneath", 0)] },
    // Each of its layers takes a tick in turn, and it is ready.
    { hold: 0.3, moves: [show(passed(first), { at: 0, stagger: TICK }), rise(first.verdict.key, { at: 1.0 })] },
    // The second lifts the same way: two ticks, then the gap where its data should be, and its verdict.
    {
      hold: 0.5,
      moves: [
        ...lift(second),
        show(passed(second), { at: 1.3, stagger: TICK }),
        show(U.gap.key, { at: 2.0 }),
        to(gap, { autoAlpha: 1, "--s": 1 }, { autoAlpha: 0, "--s": 0.4 }, { at: 2.2, duration: 0.4, ease: EASE.out }),
        rise(second.verdict.key, { at: 2.8 }),
      ],
    },
    { with: true, hold: 2.3, moves: [story("underneath", 1)] },
  ),
});
