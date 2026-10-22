/**
 * Slide 23's click. The tag lands; the line draws from the resident to the
 * staff figure and on; the request card travels it and stops at the staff
 * figure, where the person's mark lands. The bracket draws under the trip
 * and its words show, the pin lands at its end with its words, and the
 * dashed tag lands under the pin. Then the drawings take the rest in turn:
 * the owner's words by the staff figure, the magnifier passing once over the
 * waiting card with its words, and the closed gate on the line beyond with
 * its words. The card never moves again. The story lines are placed by
 * sequence.ts, after the drawing.
 */
import { EASE, draw, mark, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { OUTCOMES as O } from "./layout-outcomes";
import { into, play } from "./moves";

export const outcomes = picture("outcomes", {
  play: play(
    into("outcomes"),
    { moves: [story("outcomes", 0), story("outcomes", 1)] },
    {
      moves: [
        ...rise(O.tag.key, { at: 0, duration: 0.5 }),
        ...draw(O.route.key, { at: 0.4, duration: 0.8 }),
        ...draw(O.resident.key, { at: 0.4, duration: 0.6 }),
        ...draw(O.staff.key, { at: 0.6, duration: 0.6 }),
        ...show(O.card.key, { at: 1.2, duration: 0.3 }),
        ...to(O.card.key, { x: O.card.travel }, { x: 0 }, { at: 1.4, duration: 1.1, ease: EASE.carry }),
        ...mark(O.mark.key, { at: 2.6, duration: 0.6 }),
        ...draw(O.bracket.key, { at: 3.3, duration: 0.6 }),
        ...show(O.measure.key, { at: 3.6 }),
        ...rise(O.pin.key, { at: 4.1, duration: 0.5 }),
        ...show(O.baseline.key, { at: 4.2 }),
        ...rise(O.target.key, { at: 4.8, duration: 0.5 }),
        ...show(O.owner.key, { at: 5.4 }),
        ...show(O.lens.key, { at: 5.9, duration: 0.2 }),
        ...to(O.lens.key, { x: 0 }, { x: -O.lens.pass }, { at: 5.9, duration: 0.7, ease: EASE.soft }),
        ...show(O.quality.key, { at: 6.1 }),
        ...rise(O.gate.key, { at: 6.8, duration: 0.5 }),
        ...show(O.expansion.key, { at: 7.0 }),
      ],
    },
  ),
});
