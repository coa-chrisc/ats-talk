/**
 * Slide 8's click: the agent lands, the closed gate draws on, named; the
 * record and the empty ledger draw on, the ledger headed. The first card
 * travels from the agent at one steady speed and stops dead at the closed
 * gate, its words over it; after a still moment its word is stamped on it,
 * the record's words come up, and the ledger's first line draws. The
 * second card travels to the gate and waits, its words beside it; after a
 * still moment the staff figure steps up past the far post, the orange
 * mark lands over them with their words, and only then does the lower bar
 * swing up. The second card passes through, its words fading as its wait
 * ends, and slows to its stop just past the far post, short of the figure;
 * the ledger's second line draws. The story lines lead; the
 * shared sequence starts all of this after them (sequence.ts).
 */
import { draw, hide, mark, open, rise, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { ENFORCE } from "./layout-enforce";
import { into, play, travel } from "./moves";

const E = ENFORCE;
const { blocked, approved } = E.cards;
const HOME = { x: 0, y: 0 };

/** A card travels at 500 px a second and without easing, so it stops dead; through the open gate it eases out over half as long again, so it slows to its stop. */
const SPEED = 500;
const ride = (px: number) => px / SPEED;
/** The limit holds: the stage keeps still this long after a card stops. A card's words come up as it travels its last stretch, landing as it stops. */
const STILL = 0.5;
const WORDS = 0.4;
/** The opening marks arrive quickly, so all of them have landed when the first card sets off. */
const SET = 0.45;

/* The timeline, in the picture's own seconds. */

/** The first card sets off once the gate is drawn and named and the ledger headed. */
const FIRST = 1.2;
const FIRST_STOPS = FIRST + ride(blocked.stop);
const STAMP = FIRST_STOPS + STILL;
const SECOND = STAMP + 0.9;
const SECOND_STOPS = SECOND + ride(approved.stop);
const STEPS_UP = SECOND_STOPS + STILL;
const MARK = STEPS_UP + 0.6;
/** The gate opens once the mark has landed. */
const OPENS = MARK + 0.55;
const OPEN_TIME = 0.6;
/** The second card sets off once the bar is fully up. */
const PASSES = OPENS + OPEN_TIME;
const PASS_TIME = 1.5 * ride(approved.beyond - approved.stop);

export const enforce = picture("enforce", {
  play: play(into("enforce"), { moves: [story("enforce", 0), story("enforce", 1)] }, {
    moves: [
      // The agent and its caption; the closed gate draws on, named; the record and the empty ledger, headed.
      rise(E.agent.key, { at: 0, duration: SET }),
      rise(E.agent.caption.key, { at: 0.15, duration: SET }),
      draw(E.gate.key, { at: 0.1, duration: 0.6 }),
      rise(E.gate.name.key, { at: 0.35, duration: SET }),
      draw(E.record.key, { at: 0.3, duration: 0.6 }),
      draw(E.ledger.key, { at: 0.4, duration: 0.6 }),
      rise(E.ledger.heading.key, { at: 0.6, duration: SET }),
      // The first card travels from the agent and stops dead at the closed gate, its words over it.
      show(blocked.key, { at: FIRST - 0.15, duration: 0.15 }),
      travel(blocked.key, { x: blocked.stop }, HOME, { at: FIRST, duration: ride(blocked.stop), ease: "none" }),
      rise(blocked.words.key, { at: FIRST_STOPS - WORDS, duration: WORDS }),
      // After a still moment: stamped on the card, the record untouched, the ledger's first line.
      show(blocked.stamp.key, { at: STAMP, duration: 0.2 }),
      rise(E.record.words.key, { at: STAMP + 0.2, duration: SET }),
      draw(E.ledger.lines[0].key, { at: STAMP + 0.3, duration: 0.45 }),
      // The second card travels to the gate and waits, its words beside it.
      show(approved.key, { at: SECOND - 0.15, duration: 0.15 }),
      travel(approved.key, { x: approved.stop }, HOME, { at: SECOND, duration: ride(approved.stop), ease: "none" }),
      rise(approved.words.key, { at: SECOND_STOPS - WORDS, duration: WORDS }),
      // The staff figure steps up past the far post, the mark lands over them with their words, then the lower bar swings up.
      draw(E.staff.figure, { at: STEPS_UP, duration: 0.45 }),
      travel(E.staff.key, { x: 0 }, { x: E.staff.stepIn, y: 0 }, { at: STEPS_UP, duration: 0.55, ease: "power1.out" }),
      mark(E.mark.key, { at: MARK, duration: 0.5 }),
      rise(E.mark.words.key, { at: MARK + 0.15, duration: SET }),
      open(E.gate.swing, { at: OPENS, duration: OPEN_TIME }),
      // The second card passes through, its words fading as its wait ends, and slows to its stop; the ledger's second line.
      travel(approved.key, { x: approved.beyond }, HOME, { at: PASSES, duration: PASS_TIME, ease: "power1.out" }),
      hide(approved.words.key, { at: PASSES, duration: 0.3 }),
      draw(E.ledger.lines[1].key, { at: PASSES + PASS_TIME - 0.2, duration: 0.45 }),
    ],
  }),
});
