/**
 * Slide 8's click: the three cards settle one after another, each with its
 * name, its line and then its grey tag, the first line with the first card
 * and the second with the second; then the single line draws under all
 * three and its words come up under it.
 */
import { draw, rise } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { INCIDENTS } from "./layout-incidents";
import { into, play } from "./moves";

const I = INCIDENTS;

/** One card settling: its face, its name, its line, and its tag last. */
const settle = (card: (typeof I.cards)[number]) => ({
  moves: [rise(card.key, { at: 0 }), rise(card.name.key, { at: 0.15 }), rise(card.what.key, { at: 0.3 }), rise(card.tag.key, { at: 0.6 })],
});

export const incidents = picture("incidents", {
  play: play(
    into("incidents"),
    { hold: 0.1, ...settle(I.cards[0]) },
    { with: true, hold: 0.4, moves: [story("incidents", 0)] },
    { hold: 1.1, ...settle(I.cards[1]) },
    { with: true, hold: 0.4, moves: [story("incidents", 1)] },
    { hold: 1.1, ...settle(I.cards[2]) },
    // The line under all three, and its words.
    { hold: 0.5, moves: [draw(I.line.key, { at: 0, duration: 1.1 }), rise(I.label.key, { at: 0.6 })] },
  ),
});
