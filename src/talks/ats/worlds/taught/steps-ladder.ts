/**
 * Slide 5's click: the floor draws and the four blocks grow up from it one
 * after another, left to right, each named as it stands; the small green
 * figure appears on the floor, walks to the first riser, steps up onto the
 * first block and stays there; the passed tick lands over it with its
 * label; the grey arrow draws up over the stair, its label along it, with
 * the first line; then under the floor the tool's outline draws and fills
 * solid, named, with the second line.
 */
import { EASE, draw, fill, lines, rise, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { titleKey } from "./layout";
import { LADDER } from "./layout-ladder";
import { ARRIVE, play, travel } from "./moves";

const L = LADDER;
const HOME = { x: 0, y: 0 };

/** The blocks grow this far apart, each over this long. */
const BLOCKS = { gap: 0.28, grow: 0.6 } as const;
/** The figure's walk to the riser, then its step: up first, then onto the tread. */
const WALK = { duration: 0.9, upAt: 0.15, up: 0.4, over: 0.55 } as const;

export const ladder = picture("ladder", {
  play: play(
    // The title, the floor, and the four blocks rising left to right, each named.
    {
      moves: [
        lines(titleKey("ladder"), { at: ARRIVE }),
        draw(L.floor.key, { at: ARRIVE + 0.2, duration: 0.8 }),
        ...L.steps.flatMap((step, i) => [
          fill(step.key, { at: ARRIVE + 0.7 + i * BLOCKS.gap, duration: BLOCKS.grow, ease: EASE.out }),
          rise(step.words.key, { at: ARRIVE + 0.95 + i * BLOCKS.gap, duration: 0.6 }),
        ]),
      ],
    },
    // The figure appears on the floor and walks to the first riser.
    {
      hold: 0.3,
      moves: [show(L.walker.key, { at: 0, duration: 0.3 }), travel(L.walker.key, { x: L.walker.walk }, HOME, { at: 0.25, duration: WALK.duration, ease: EASE.soft })],
    },
    // It steps up onto the first block, and stops there.
    {
      hold: 0.1,
      moves: [
        travel(L.walker.key, { y: L.walker.climb.y }, HOME, { at: 0, duration: WALK.up, ease: EASE.out }),
        travel(L.walker.key, { x: L.walker.climb.x }, HOME, { at: WALK.upAt, duration: WALK.over, ease: EASE.soft }),
      ],
    },
    // The passed tick over it, and its label.
    { hold: 0.25, moves: [show(L.tick.key, { at: 0 }), rise(L.stop.key, { at: 0.15 })] },
    // The grey arrow draws up over the stair, its label along it.
    { hold: 0.6, moves: [draw(L.more.key, { at: 0, duration: 1.1 }), rise(L.more.label.key, { at: 0.6 })] },
    { with: true, hold: 0.3, moves: [story("ladder", 0)] },
    // Under the floor, the tool's outline draws and fills solid, named.
    {
      hold: 1.1,
      moves: [draw(L.tool.key, { at: 0, duration: 0.7 }), fill(L.tool.key, { at: 0.6, duration: 0.5 }), rise(L.tool.name.key, { at: 0.3 }), rise(L.tool.caption.key, { at: 0.45 })],
    },
    { with: true, hold: 0.5, moves: [story("ladder", 1)] },
  ),
});
