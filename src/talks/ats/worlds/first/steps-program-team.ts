/**
 * Slide 18's click: the small round table draws at the left, its chairs
 * and a green person at each; four of them fill green as the other six
 * step back; the team's box draws in the middle, named, and the four walk
 * to it from their seats, across on one curve and up on another, the
 * farthest place first; the lead's nameplate comes up under the first; the
 * three tiles land under the box, with the first line; the departments'
 * outline draws at the right with its staff, the line runs to it from the
 * box and its caption comes up; and the small yard draws under the tiles,
 * its two people in it and its caption under it, with the second line.
 */
import { EASE, dim, draw, fill, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { PROGRAM_TEAM, SEAT_18 } from "./layout-program-team";
import { UNDER_TITLE, into, keys, play } from "./moves";

const P = PROGRAM_TEAM;
const T = P.table;

/** The people at the table come up one after another, this far apart, once the chairs are in. */
const APPEAR = { at: 0.4, stagger: 0.03 } as const;
/** The walk: how long each takes, how far apart they set off, and when the first sets off after the box starts to draw. */
const WALK = { duration: 1.2, stagger: 0.12, at: 0.3 } as const;
/** The farthest place's walker sets off first, so the four arrive in the box from its far end back toward the table. */
const walkers = [...P.team].reverse();

export const programTeam = picture("program-team", {
  play: play(
    into("program-team"),
    // The table, its chairs (the bottom three as slide 17 grew them) and a person at each.
    {
      hold: UNDER_TITLE,
      moves: [
        draw(T.key, { at: 0 }),
        ...T.seats.flatMap((seat, i) => to(seat.key, { autoAlpha: 1 }, { autoAlpha: 0, "--s": seat.leading ? SEAT_18.grow : 1 }, { at: 0.15 + i * 0.03, duration: 0.4, ease: EASE.soft })),
        ...P.members.flatMap((member, i) => [
          ...to(member.key, { autoAlpha: 1 }, { autoAlpha: 0, x: member.from.x, y: member.from.y }, { at: APPEAR.at + i * APPEAR.stagger, duration: 0.3, ease: EASE.soft }),
          ...draw(member.glyph, { at: APPEAR.at + i * APPEAR.stagger, duration: 0.6 }),
        ]),
      ],
    },
    // Four of them fill green; the other six step back.
    { hold: 0.3, moves: [fill(keys(P.team), { at: 0, duration: 0.5, stagger: 0.1 }), dim(keys(P.stay), { at: 0.2, stagger: 0 })] },
    // The box draws in the middle, named, and the four walk to it.
    {
      hold: 0.3,
      moves: [
        draw(P.box.key, { at: 0 }),
        rise(P.box.name.key, { at: 0.3 }),
        ...walkers.flatMap((member, i) => {
          const at = WALK.at + i * WALK.stagger;
          return [...to(member.key, { x: 0 }, undefined, { at, duration: WALK.duration, ease: EASE.draw }), ...to(member.key, { y: 0 }, undefined, { at, duration: WALK.duration, ease: EASE.out })];
        }),
      ],
    },
    // The lead takes the nameplate.
    { hold: 0.1, moves: [rise(P.plate.key, { at: 0, duration: 0.6 })] },
    // The three tiles land under the box, with the first line.
    { hold: 0.2, moves: [rise(keys(P.tiles), { at: 0, stagger: 0.15 })] },
    { with: true, hold: 0.2, moves: [story("program-team", 0)] },
    // The departments' outline at the right, its staff; the line to it from the box, and its caption.
    {
      hold: 0.2,
      moves: [
        draw(P.dept.key, { at: 0, duration: 0.7 }),
        rise(P.dept.name.key, { at: 0.2 }),
        draw(keys(P.dept.staff), { at: 0.3, duration: 0.6, stagger: 0.08 }),
        draw(P.line.key, { at: 0.4, duration: 0.6 }),
        rise(P.line.caption.key, { at: 0.8 }),
      ],
    },
    // The small yard under the tiles, its two people in it, its caption; with the second line.
    {
      hold: 0.2,
      moves: [draw(P.yard.key, { at: 0, duration: 0.8 }), draw(keys(P.yard.people), { at: 0.35, duration: 0.6, stagger: 0.1 }), show(keys(P.yard.people), { at: 0.35, duration: 0.2, stagger: 0.1 }), rise(P.yard.caption.key, { at: 0.6 })],
    },
    { with: true, hold: 0.2, moves: [story("program-team", 1)] },
  ),
});
