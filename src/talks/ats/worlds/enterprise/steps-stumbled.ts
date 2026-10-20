/**
 * Slide 6's click: the large figure rises at the top left with its caption,
 * with story line A; after a hold to read it, the three cards settle one
 * after another to its right, each with its name, its line and then its
 * grey tag, story line B with the first; then the single line draws under
 * the three and its words come up under it.
 */
import type { StepDef } from "@/components/deck/engine";
import { HOLD, draw, rise } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { STUMBLED } from "./layout-stumbled";
import { into, play } from "./moves";

const S = STUMBLED;

/** Each card starts settling this long after the one before it. */
const CARD_NEXT = 1.15;

/** One card settling: its face, its name, its line, and its tag last. */
const settle = (card: (typeof S.cards)[number], at: number) => [rise(card.key, { at }), rise(card.name.key, { at: at + 0.12 }), rise(card.what.key, { at: at + 0.25 }), rise(card.tag.key, { at: at + 0.5 })];

export const stumbled = (): StepDef[] =>
  picture("stumbled", {
    play: play([
      into("stumbled"),
      // The figure, and its caption.
      { with: true, hold: 0.3, moves: [rise(S.figure.key, { at: 0, duration: 0.8 }), rise(S.figure.caption.key, { at: 0.15, duration: 0.75 })] },
      { with: true, hold: 0.6, moves: [story("stumbled", 0)] },
      // The three cards, one after another.
      { hold: HOLD.read, moves: S.cards.flatMap((card, i) => settle(card, i * CARD_NEXT)) },
      { with: true, hold: 0.45, moves: [story("stumbled", 1)] },
      // The line under all three, and its words.
      { hold: 0.4, moves: [draw(S.line.key, { at: 0, duration: 1 }), rise(S.label.key, { at: 0.55 })] },
    ]),
  });
