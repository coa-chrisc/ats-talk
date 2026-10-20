/**
 * Slide 26's click: the floor draws, the member of staff takes their seat
 * behind the desk, named, and the green helper comes up right beside them,
 * named. The resident walks up from the right across the floor, named, and
 * the first story line comes in with them. The low fence rises from the
 * floor between the desk and the resident, its rail drawing across, named
 * under it. The card comes out of the helper, rises over the desk, crosses
 * over the fence and waits; the member of staff takes the orange mark, and
 * only then does the card come down to the resident and touch them, while
 * the helper stays at the desk. At the right the test comes up, its heading
 * then its question, and line B comes in with the question.
 */
import { EASE, draw, fill, mark, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./beats";
import { RESIDENTS } from "./layout-residents";

const R = RESIDENTS;

/** The card's legs: up clear of the mark and the fence, across, and (after the mark) down to the resident. */
const CARD = { up: 0.5, across: 0.8, down: 0.5 } as const;
export const residents = picture("residents", {
  play: play(
    into("residents"),
    // The floor, the member of staff behind the desk, and the helper beside them.
    {
      with: true,
      hold: 0.4,
      moves: [
        draw(R.floor.key, { at: 0, duration: 0.7 }),
        draw(R.staff.key, { at: 0.2, duration: 0.8 }),
        draw(R.desk.key, { at: 0.4, duration: 0.7 }),
        rise(R.staff.name.key, { at: 0.7 }),
        rise(R.helper.key, { at: 0.8, duration: 0.5 }),
        fill(R.helper.key, { at: 1.0, duration: 0.6 }),
        rise(R.helper.name.key, { at: 1.1 }),
      ],
    },
    // The resident walks up from the right, as the first story line comes in.
    {
      with: true,
      hold: 1.3,
      moves: [show(R.resident.key, { at: 0, duration: 0.4 }), to(R.resident.key, { x: 0 }, { x: R.resident.from }, { at: 0, duration: 0.9, ease: EASE.draw }), rise(R.resident.name.key, { at: 0.7 })],
    },
    { with: true, hold: 0.2, moves: [story("residents", 0)] },
    // The fence rises from the floor between them, its rail drawn across.
    { hold: 0, moves: [to(R.fence.key, { "--k": 1, autoAlpha: 1 }, { "--k": 0, autoAlpha: 0 }, { at: 0, duration: 0.5, ease: EASE.out }), draw(R.fence.rail.key, { at: 0.25, duration: 0.5 }), rise(R.fence.name.key, { at: 0.5 })] },
    // The card comes out of the helper, rises, and crosses over the fence.
    {
      hold: 0.1,
      moves: [
        show(R.card.key, { at: 0, duration: 0.3 }),
        to(R.card.key, { y: R.card.lift }, { y: 0 }, { at: 0.1, duration: CARD.up, ease: EASE.out }),
        to(R.card.key, { x: R.card.across }, { x: 0 }, { at: 0.1 + CARD.up, duration: CARD.across, ease: EASE.page }),
      ],
    },
    // The member of staff decides, and then it comes down to the resident.
    { hold: 0.1, moves: [mark(R.mark.key, { at: 0 })] },
    { hold: 0.1, moves: [to(R.card.key, { y: R.card.served }, undefined, { at: 0, duration: CARD.down, ease: EASE.page })] },
    // At the right, the heading over the test, then its question, line B with it.
    { hold: 0.1, moves: [rise(R.list.heading.key, { at: 0 })] },
    { hold: 0.2, moves: [rise(R.list.question.key, { at: 0, duration: 0.7 })] },
    { with: true, hold: 0.3, moves: [story("residents", 1)] },
  ),
});
