/**
 * Slide 17's click: the department boxes come up, five lanterns already
 * lit, a person beside each; the card slides across the middle row, and
 * each box it passes lights, a person appearing in it, with the first line;
 * the table draws in the aisle with its chairs, and the people step out of
 * their boxes and walk to it, across on one curve and down on another, each
 * box going dark behind them; then the three chairs of the departments that
 * led grow, their caption under them, with the second line.
 */
import { EASE, dim, draw, fill, hide, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { CONSORTIUM, SEAT_10 } from "./layout-consortium";
import { UNDER_TITLE, into, keys, play } from "./moves";

const P = CONSORTIUM;
const T = P.table;

/** The card's trip across the stage, at an even speed, so each box lights as its front passes. */
const SLIDE = { at: 0.2, duration: 2.0 } as const;
/** A box lights this long after the card's front reaches its column, a row lower a little later. */
const ROW_LAG = 0.08;
/** The walk: how long each person takes, and how far apart they set off. */
const WALK = { duration: 1.2, stagger: 0.12, at: 0.6 } as const;

const lit = P.boxes.filter((b) => b.walker);
const early = P.boxes.filter((b) => b.early);
const called = P.called.map((n) => P.boxes[n]);
const rowOf = (b: (typeof P.boxes)[number]) => P.boxes.indexOf(b) >> 2;

/** A person appears in its box: shown there, moved back from its seat, and drawn on. */
const appear = (b: (typeof P.boxes)[number], at: number) => [
  ...to(b.walker!.key, { autoAlpha: 1 }, { autoAlpha: 0, x: b.walker!.from.x, y: b.walker!.from.y }, { at, duration: 0.3 }),
  ...draw(b.walker!.glyph, { at, duration: 0.6 }),
];

export const consortium = picture("consortium", {
  play: play(
    into("consortium"),
    // The boxes, five of them already lit, a person in each.
    {
      hold: UNDER_TITLE,
      moves: [
        show(keys(P.boxes), { at: 0, stagger: 0.03 }),
        show(P.boxes.map((b) => b.lantern.key), { at: 0, stagger: 0.03 }),
        ...early.flatMap((b, i) => [...fill(b.lantern.key, { at: 0.5 + i * 0.12 }), ...appear(b, 0.6 + i * 0.12)]),
      ],
    },
    // The card slides across, and each box it passes lights, a person in it.
    {
      hold: 0.4,
      moves: [
        rise(P.card.key, { at: 0, duration: 0.4 }),
        to(P.card.key, { x: P.card.travel }, { x: 0 }, { at: SLIDE.at, duration: SLIDE.duration, ease: "none" }),
        ...called.flatMap((b) => {
          const at = SLIDE.at + P.passes[b.column] * SLIDE.duration + rowOf(b) * ROW_LAG;
          return [...fill(b.lantern.key, { at, duration: 0.5 }), ...appear(b, at)];
        }),
        hide(P.card.key, { at: SLIDE.at + SLIDE.duration }),
      ],
    },
    { with: true, hold: 0.3, moves: [story("consortium", 0)] },
    // The table draws in the aisle; the people step out and walk to it, each box going dark behind them.
    {
      hold: 0.5,
      moves: [
        draw(T.key, { at: 0 }),
        show(keys(T.seats), { at: 0.2, stagger: 0.04 }),
        rise(T.name.key, { at: 0.4 }),
        ...lit.flatMap((b, i) => {
          const at = WALK.at + i * WALK.stagger;
          return [
            ...to(b.walker!.key, { x: 0 }, undefined, { at, duration: WALK.duration, ease: EASE.draw }),
            ...to(b.walker!.key, { y: 0 }, undefined, { at, duration: WALK.duration, ease: EASE.out }),
            ...to(b.lantern.key, { "--k": 0 }, undefined, { at: at + 0.2, duration: 0.5, ease: EASE.soft }),
          ];
        }),
        dim(keys(P.boxes), { at: WALK.at + 0.6, stagger: 0 }),
        dim(P.boxes.map((b) => b.lantern.key), { at: WALK.at + 0.6, stagger: 0 }),
      ],
    },
    // The three chairs of the departments that led grow, their caption under them.
    {
      hold: 0.3,
      moves: [to(keys(T.seats.filter((seat) => seat.leading)), { "--s": SEAT_10.grow }, { "--s": 1 }, { at: 0, duration: 0.6, ease: EASE.out, stagger: 0.08 }), rise(P.caption.key, { at: 0.3 })],
    },
    { with: true, hold: 0.1, moves: [story("consortium", 1)] },
  ),
});
