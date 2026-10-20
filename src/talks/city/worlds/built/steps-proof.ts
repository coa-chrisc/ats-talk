/**
 * The clicks of slides 10 to 12, one chain each (beats.ts). Slide 10: the
 * tiles light one at a time, and the two in daily use fill with the
 * process's green. Slide 11: the middle, then each named group joined to it
 * in turn, the departments nearer in, and last the practitioner group on
 * the outer ring.
 * Slide 12: the rail, and the five plaques settling on it one at a time.
 */
import { EASE, draw, fill, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, play } from "./beats";
import { keys } from "./layout";
import { PORTFOLIO, RECOGNITION, SEEN } from "./layout-proof";

/** Slide 10: a tile lights this often. */
const TILE_APART = 0.5;
const IN_USE = PORTFOLIO.tiles.filter((tile) => tile.inUse);
const FIRST_IN_USE = PORTFOLIO.tiles.indexOf(IN_USE[0]);

export const portfolio = picture("portfolio", {
  play: play(
    into("portfolio"),
    // The grid's empty places, then the tiles light up in them one at a time, row by row, each with its name, its people and its status.
    {
      with: true,
      hold: 0.6,
      moves: [show(PORTFOLIO.slots.key, { at: 0, duration: 0.4, stagger: 0.03 }), show(keys(PORTFOLIO.tiles), { at: 0.4, duration: 0.5, stagger: TILE_APART })],
    },
    { with: true, hold: 0.3, moves: [story("portfolio", 0)] },
    { with: true, hold: FIRST_IN_USE * TILE_APART + 0.1, moves: [story("portfolio", 1)] },
    // The two in daily use fill with the process's green.
    { hold: 0.3, moves: [fill(keys(IN_USE), { at: 0, duration: 0.6, stagger: 0.2 })] },
  ),
});

/** Slide 11: a named group joins this often: its line draws out from the middle, its dot lands at the line's end, and its name comes up. */
const NAMED_APART = 0.45;
const SPOKE = 0.45;

export const seen = picture("seen", {
  play: play(
    into("seen"),
    { with: true, hold: 0.6, moves: [draw(SEEN.centre.key, { at: 0, duration: 0.7 }), rise(SEEN.centre.label.key, { at: 0.3 })] },
    {
      // Each named group in turn, joined to the middle; the two commissions are tagged as asking us back.
      with: true,
      hold: 0.8,
      moves: [
        ...SEEN.named.flatMap((dot, i) => [
          draw(dot.spoke.key, { at: i * NAMED_APART, duration: SPOKE }),
          show(dot.key, { at: i * NAMED_APART + SPOKE - 0.1, duration: 0.3 }),
          rise(dot.name.key, { at: i * NAMED_APART + SPOKE - 0.05 }),
        ]),
        ...SEEN.askedBack.map((tag, i) => rise(tag.key, { at: i * NAMED_APART + SPOKE + 0.3 })),
      ],
    },
    { with: true, hold: 0.5, moves: [story("seen", 0)] },
    {
      // The departments, nearer in, each joined to the middle, named once.
      hold: 0.3,
      moves: [
        draw(SEEN.departments.spokes.key, { at: 0, duration: 0.4, stagger: 0.06 }),
        show(SEEN.departments.key, { at: 0.3, duration: 0.3, stagger: 0.06 }),
        rise(SEEN.departments.label.key, { at: 0.6 }),
      ],
    },
    {
      // Last, the practitioner group forms on the outer ring at its foot, joined to the middle, and is named.
      hold: 0.3,
      moves: [
        draw(SEEN.practitioners.spoke.key, { at: 0, duration: 0.4 }),
        draw(SEEN.practitioners.rule.key, { at: 0.3, duration: 0.6 }),
        show(SEEN.practitioners.key, { at: 0.4, duration: 0.3, stagger: 0.07 }),
        rise(SEEN.practitioners.label.key, { at: 0.6 }),
      ],
    },
    { with: true, hold: 0.4, moves: [story("seen", 1)] },
  ),
});

/** Slide 12: a plaque settles this often, its cord drawing just before it lands. */
const PLAQUE_APART = 1.0;

export const recognition = picture("recognition", {
  play: play(
    into("recognition"),
    { with: true, hold: 0.6, moves: [draw(RECOGNITION.rail.key, { at: 0, duration: 0.8 })] },
    {
      // The plaques settle on the wall one at a time, each on its cord.
      with: true,
      hold: 0.3,
      moves: RECOGNITION.plaques.flatMap((plaque, i) => [
        draw(plaque.cord.key, { at: i * PLAQUE_APART, duration: 0.5 }),
        to(plaque.key, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: RECOGNITION.settle }, { at: i * PLAQUE_APART + 0.2, duration: 0.7, ease: EASE.out }),
      ]),
    },
    { with: true, hold: 0.5, moves: [story("recognition", 0)] },
    { with: true, hold: 2 * PLAQUE_APART, moves: [story("recognition", 1)] },
  ),
});
