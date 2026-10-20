/**
 * The clicks of slides 5 and 12a, one chain each (beats.ts). Slide 5: the
 * row of buildings, the three figures and the fence they put up, the gap
 * named, then the gate opens, a hand carries the box in, and the gate
 * shuts behind it. Slide 12a: the yard fenced all round, the container in
 * its middle, five rings closing round it one at a time, then the
 * repository it is built from and the tag at the yard's foot.
 */
import { DUR, EASE, draw, open, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./beats";
import { keys } from "./layout";
import { CONTROLS, SAFE_YARD } from "./layout-safe";

/** Slide 5: the rails take this long to meet at the gate; the box comes up this long after the gate starts to open, and is carried in over this long. */
const RAILS = 1.4;
const BOX_AFTER = 0.5;
const CARRY = DUR.travel;

export const safe = picture("safe", {
  play: play(
    into("safe"),
    {
      // The City's systems: the ground line, then the buildings along it, left to right, and their name.
      with: true,
      hold: 0.6,
      moves: [
        draw(SAFE_YARD.base.key, { at: 0, duration: 0.8 }),
        rise(SAFE_YARD.buildings.at.map((_, i) => SAFE_YARD.buildings.keyOf(i)), { at: 0.1, stagger: 0.08 }),
        rise(SAFE_YARD.other.key, { at: 0.5 }),
      ],
    },
    {
      // Well below them, the three figures, each named.
      with: true,
      hold: 1.0,
      moves: [draw(keys(SAFE_YARD.figures), { at: 0, stagger: 0.2 }), rise(SAFE_YARD.figures.map((figure) => figure.label.key), { at: 0.2, stagger: 0.2 })],
    },
    { with: true, hold: 0.3, moves: [story("safe", 0)] },
    {
      // They put the fence up: both rails grow from the left and meet at the gate, the posts come up along them, and the yard is named.
      with: true,
      hold: 0.6,
      moves: [
        draw(keys(SAFE_YARD.fence.rails), { at: 0, duration: RAILS, stagger: 0 }),
        show(SAFE_YARD.fence.posts.key, { at: 0.4, duration: 1.0 }),
        show(SAFE_YARD.fence.gate.key, { at: RAILS - 0.3 }),
        rise(SAFE_YARD.yard.key, { at: RAILS - 0.1 }),
      ],
    },
    // Nothing joins the yard to the buildings: the gap between them is named.
    { hold: 0.4, moves: [rise(SAFE_YARD.cannot.key, { at: 0 })] },
    { with: true, hold: 0.2, moves: [story("safe", 1)] },
    {
      // The gate swings wide open first, and only then does the box come up outside it on the hand, clear of the leaf's swing.
      hold: 0.6,
      moves: [open(SAFE_YARD.fence.gate.key, { at: 0 }), rise(SAFE_YARD.data.key, { at: BOX_AFTER }), show(SAFE_YARD.hand.key, { at: BOX_AFTER })],
    },
    {
      // The hand carries it in under the open leaf, through the gate, to the middle of the yard.
      hold: 0.2,
      moves: [
        to(SAFE_YARD.data.key, { x: SAFE_YARD.data.carry }, { x: 0 }, { at: 0, duration: CARRY, ease: EASE.carry }),
        to(SAFE_YARD.hand.key, { x: SAFE_YARD.data.carry }, { x: 0 }, { at: 0, duration: CARRY, ease: EASE.carry }),
      ],
    },
    {
      // It sets the box down and goes back out, the box is named where it sits, and the gate shuts behind the hand.
      hold: 0.2,
      moves: [
        to(SAFE_YARD.hand.key, { x: SAFE_YARD.data.carry + SAFE_YARD.hand.withdraw, autoAlpha: 0 }, undefined, { at: 0, duration: 0.6, ease: EASE.soft }),
        rise(SAFE_YARD.data.label.key, { at: 0.15 }),
        to(SAFE_YARD.fence.gate.key, { "--k": 0 }, undefined, { at: 0.3, duration: DUR.base, ease: EASE.page }),
      ],
    },
  ),
});

/** Slide 12a: a ring closes round the container this often, from its thin outline grown a little larger to its place. */
const RING_APART = 0.7;
const RING_FROM = 1.08;

export const controls = picture("controls", {
  play: play(
    into("controls"),
    {
      // The yard, fenced all round.
      with: true,
      hold: 0.6,
      moves: [draw(keys(CONTROLS.fence.rails), { at: 0, duration: 1.1 }), show(CONTROLS.fence.posts.key, { at: 0.3, duration: 0.8 })],
    },
    { with: true, hold: 1.0, moves: [rise(CONTROLS.container.key, { at: 0 }), rise(CONTROLS.container.label.key, { at: 0.1 })] },
    {
      // The rings close round it one at a time, inside out, each named on its tab.
      with: true,
      hold: 0.6,
      moves: CONTROLS.rings.flatMap((ring, i) => [
        to(ring.key, { autoAlpha: 1, "--s": 1 }, { autoAlpha: 0, "--s": RING_FROM }, { at: i * RING_APART, duration: 0.6, ease: EASE.out }),
        rise(ring.tab.key, { at: i * RING_APART + 0.15 }),
      ]),
    },
    { with: true, hold: 0.2, moves: [story("controls", 0)] },
    { with: true, hold: 3 * RING_APART - 0.1, moves: [story("controls", 1)] },
    {
      // Beside them, the repository it is built from, named, sending it in.
      hold: 0.4,
      moves: [rise(CONTROLS.repo.key, { at: 0 }), rise(CONTROLS.repo.label.key, { at: 0.2 }), draw(CONTROLS.repo.arrow.key, { at: 0.4, duration: 0.8 })],
    },
    { hold: 0.4, moves: [rise(CONTROLS.cost.key, { at: 0 })] },
  ),
});
