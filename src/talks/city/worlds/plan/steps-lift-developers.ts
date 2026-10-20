/**
 * Slide 19b's click: the row of developers draws, named once; three systems
 * take a grey stuck mark, named once; the long grey cycle-time bar draws and
 * the pile of requests stacks up beside it. The slab slides in under the row
 * and its four parts fill in turn, each named; the row and the slab lift
 * together and the stuck marks clear; the bar shortens and turns green; the
 * program team's box comes up beside the row, and the pile comes down card
 * by card from the top.
 */
import { EASE, draw, fill, hide, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { comeUp, into, keys, play } from "./beats";
import { LIFT_DEVELOPERS } from "./layout-lift-developers";

const L = LIFT_DEVELOPERS;

/** The stuck marks pop up from this small. */
const MARK_FROM = 0.3;
/** The slab's parts fill this far apart, each over `duration`. */
const PARTS = { at: 0.6, duration: 0.5, apart: 0.35 } as const;
/** The cards come off the pile this far apart. */
const CARDS_APART = 0.3;

/** The cards that come off, the top one first. */
const gone = L.backlog.cards.slice(-L.backlog.gone).reverse();

export const liftDevelopers = picture("lift-developers", {
  play: play(
    into("lift-developers"),
    // The row of developers draws at their desks, named once.
    {
      with: true,
      hold: 0.2,
      moves: [draw(keys(L.units), { at: 0, duration: 0.8, stagger: 0.12 }), rise(L.label.key, { at: 0.5 })],
    },
    // Three systems take a grey mark; the long grey bar draws, and the pile stacks up.
    {
      hold: 0.2,
      moves: [
        to(keys(L.stuck), { autoAlpha: 1, "--s": 1 }, { autoAlpha: 0, "--s": MARK_FROM }, { at: 0, duration: 0.4, ease: EASE.out, stagger: 0.15 }),
        rise(L.stuckLabel.key, { at: 0.3 }),
        rise(L.cycle.label.key, { at: 0.5 }),
        fill(L.cycle.key, { at: 0.6, duration: 0.8 }),
        rise(keys(L.backlog.cards), { at: 0.8, stagger: 0.06 }),
        rise(L.backlog.label.key, { at: 1.1 }),
      ],
    },
    // The slab slides in under the row, and its four parts fill in turn, each named.
    {
      hold: 0.2,
      moves: [
        to(L.slab.key, { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: L.slab.from }, { at: 0, duration: 0.8, ease: EASE.page }),
        fill(keys(L.slab.parts), { at: PARTS.at, duration: PARTS.duration, stagger: PARTS.apart }),
        rise(
          L.slab.parts.map((part) => part.label.key),
          { at: PARTS.at + PARTS.duration - 0.2, stagger: PARTS.apart },
        ),
      ],
    },
    { with: true, hold: 0.6, moves: [story("lift-developers", 0)] },
    // The row and its slab lift together, and the stuck marks clear.
    {
      hold: 0.2,
      moves: [to([L.row.key, L.slab.key], { y: 0 }, { y: L.row.lift }, { at: 0, duration: 0.8, ease: EASE.page, stagger: 0 }), hide(keys(L.stuck), { at: 0.4, stagger: 0.1 }), hide(L.stuckLabel.key, { at: 0.5 })],
    },
    // The cycle-time bar shortens and turns green.
    {
      hold: 0.1,
      moves: [to(L.cycle.key, { "--k": L.cycle.short }, { "--k": 1 }, { at: 0, duration: 0.9, ease: EASE.draw }), show(L.cycle.green.key, { at: 0.7, duration: 0.3 })],
    },
    { with: true, hold: 0.2, moves: [story("lift-developers", 1)] },
    // The program team's box comes up beside the row, and the pile comes down card by card.
    {
      hold: 0.3,
      moves: [to(L.team.key, comeUp(L.team.from).on, comeUp(L.team.from).off, { at: 0, duration: 0.7, ease: EASE.out }), hide(keys(gone), { at: 0.6, duration: 0.3, stagger: CARDS_APART })],
    },
  ),
});
