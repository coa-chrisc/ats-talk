/**
 * Slide 21a's click: the member of staff at the desk, named, with the green
 * agent at their side, named; the resident walks up from the right, named,
 * and the first story line comes in with them. The fence draws down between
 * them, named at its foot. A card comes up over the desk, lifts clear of the
 * fence's top, crosses and waits on the resident's side; the member of staff
 * takes the orange mark, and only then does the card come down to the
 * resident. The checklist comes up under its heading, and each of its lines
 * takes a deep-green tick in turn.
 */
import { EASE, draw, fill, mark, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./beats";
import { RESIDENTS } from "./layout-residents";

const R = RESIDENTS;

/** The card's legs: up clear of the fence, across, and (after the mark) down to the resident. */
const CARD = { up: 0.4, across: 0.7, down: 0.5 } as const;
/** The ticks land one after another. */
const TICKS = 0.2;

export const residents = picture("residents", {
  play: play(
    into("residents"),
    // The member of staff at the desk, with the agent at their side.
    {
      with: true,
      hold: 0.4,
      moves: [
        draw(R.staff.key, { at: 0, duration: 0.8 }),
        draw(R.desk.key, { at: 0.2, duration: 0.7 }),
        rise(R.staff.name.key, { at: 0.5 }),
        rise(R.helper.key, { at: 0.4, duration: 0.5 }),
        fill(R.helper.key, { at: 0.7, duration: 0.6 }),
        rise(R.helper.name.key, { at: 0.8 }),
      ],
    },
    // The resident walks up from the right, as the first story line comes in.
    {
      with: true,
      hold: 1.0,
      moves: [show(R.resident.key, { at: 0, duration: 0.4 }), to(R.resident.key, { x: 0 }, { x: R.resident.from }, { at: 0, duration: 0.9, ease: EASE.draw }), rise(R.resident.name.key, { at: 0.7 })],
    },
    { with: true, hold: 0.2, moves: [story("residents", 0)] },
    // The fence draws down between them.
    { hold: 0, moves: [draw(R.fence.key, { at: 0, duration: 0.8 }), show(R.fence.posts.key, { at: 0.3, duration: 0.5 }), rise(R.fence.name.key, { at: 0.6 })] },
    // A card comes up over the desk, lifts clear of the fence, and crosses to wait on the resident's side.
    {
      hold: 0.1,
      moves: [
        rise(R.card.key, { at: 0, duration: 0.5 }),
        to(R.card.key, { y: R.card.lift }, undefined, { at: 0.5, duration: CARD.up, ease: EASE.out }),
        to(R.card.key, { x: R.card.across }, { x: 0 }, { at: 0.5 + CARD.up, duration: CARD.across, ease: EASE.page }),
      ],
    },
    // The member of staff approves it, and then it comes down to the resident.
    { hold: 0.1, moves: [mark(R.mark.key, { at: 0 })] },
    { hold: 0.1, moves: [to(R.card.key, { y: R.card.served }, undefined, { at: 0, duration: CARD.down, ease: EASE.page })] },
    // The checklist comes up under its heading, and each line takes a tick in turn.
    {
      hold: 0.2,
      moves: [
        draw(R.list.key, { at: 0, duration: 0.6 }),
        rise(R.list.heading.key, { at: 0.2 }),
        rise(
          R.list.rows.map((row) => row.key),
          { at: 0.3, stagger: 0.1 },
        ),
      ],
    },
    { with: true, hold: 0.3, moves: [story("residents", 1)] },
    {
      hold: 0.1,
      moves: [
        show(
          R.list.rows.map((row) => row.tick),
          { at: 0, stagger: TICKS },
        ),
      ],
    },
  ),
});
