/**
 * Slide 14's click: the left column's head comes up and its rule draws
 * out, and its four lines rise one after another; then the right column's
 * head and rule; then, pair by pair, each right line comes in opposite its
 * partner, the two short rules draw in from both lines toward the middle
 * and the passed tick lands between them, story line A rising with the
 * first pair; after a hold, the grey tag drops at the foot, with story line
 * B.
 */
import type { StepDef } from "@/components/deck/engine";
import { draw, rise, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { FITS } from "./layout-fits";
import { drop, into, play, slideIn } from "./moves";

const F = FITS;
const [LEFT, RIGHT] = F.heads;

/** The left lines rise this far apart; each pair matches this far after the last. */
const LINE = 0.2;
const PAIR = 0.75;
/** A right line comes in from this far to its right. */
const IN = 28;

/** A head comes up and its rule draws out from the middle line. */
const head = (entry: typeof LEFT) => [rise(entry.key, { at: 0, duration: 0.6 }), draw(entry.rule.key, { at: 0.2, duration: 0.6 })];

/** A pair matches: the right line comes in, the rules draw toward the middle, and the tick lands. */
const match = (pair: (typeof F.pairs)[number]) => [
  slideIn(pair.has.key, IN, { at: 0 }),
  ...pair.joins.flatMap((join) => draw(join.key, { at: 0.3, duration: 0.35 })),
  show(pair.tick.key, { at: 0.6, duration: 0.3 }),
];

export const fits = (): StepDef[] =>
  picture("fits", {
    play: play([
      into("fits"),
      // The left column: its head and rule, then its four lines.
      { with: true, hold: 0.5, moves: head(LEFT) },
      { hold: -0.3, moves: F.pairs.flatMap((pair, i) => rise(pair.ask.key, { at: i * LINE, duration: 0.6 })) },
      // The right column's head and rule.
      { hold: 0.2, moves: head(RIGHT) },
      // Pair by pair, the right line lands opposite its partner and the tick between them, story line A with the first.
      { hold: 0, moves: match(F.pairs[0]) },
      { with: true, hold: 0.2, moves: [story("fits", 0)] },
      ...F.pairs.slice(1).map((pair, i) => ({ with: true, hold: i === 0 ? PAIR - 0.2 : PAIR, moves: match(pair) })),
      // After a hold, the grey tag at the foot, with story line B.
      { hold: 1.0, moves: [drop(F.connects.key, 0)] },
      { with: true, hold: 0.3, moves: [story("fits", 1)] },
    ]),
  });
