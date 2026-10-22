/** Two delivery batches of project cards separated by a pause to explain the foundations; no claimed speed multiplier. */
import { EASE, draw, rise, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { ENTER, LANES as L, placeX } from "./layout-lanes";
import { into, play } from "./moves";

/** Cards `from` to `until` slide into their places, one every 0.18 s, each at the same pace. */
const batch = (from: number, until: number) =>
  L.cards.slice(from, until).flatMap((card, i) =>
    to(card.key, { autoAlpha: 1, x: placeX(from + i) }, { autoAlpha: 0, x: placeX(from + i) - ENTER }, { at: i * 0.18, duration: 0.65, ease: EASE.out }),
  );

export const lanes = picture("lanes", {
  play: play(
    into("lanes"),
    { moves: [story("lanes", 0), story("lanes", 1)] },
    { moves: [draw(L.upper.key, { at: 0, duration: 0.6 }), rise(L.upper.name.key, { at: 0, duration: 0.4 }), draw(L.lower.key, { at: 0, duration: 0.6 }), rise(L.lower.name.key, { at: 0, duration: 0.4 })] },
    { hold: 0.3, moves: batch(0, 4) },
    {
      hold: 0.6,
      moves: L.pieces.flatMap((p, i) => [draw(p.key, { at: i * 0.45, duration: 0.4 }), rise(p.label.key, { at: i * 0.45, duration: 0.4 }), draw(p.arrow.key, { at: i * 0.45 + 0.4, duration: 0.4 })]),
    },
    { hold: 0.6, moves: batch(4, 8) },
  ),
});
