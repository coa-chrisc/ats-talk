/**
 * Slide 20's click: the two lanes draw, named; boxes ship into lane one one
 * after another as its story line lands; lane two's pieces fill in one at a
 * time, each named, as the second line lands; an arrow runs down from each
 * piece into lane one, and the last two boxes come up where their arrows
 * land. The band of the process draws under both lanes with its checkpoints
 * and the door at the last. The first box drops into the band and runs along
 * it, each checkpoint filling as it passes; the door opens ahead of it and
 * the box goes through, while a new box ships into the place it left in
 * lane one.
 */
import { EASE, draw, fill, open, rise, show, to } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { into, keys, passing, play } from "./beats";
import { ROADMAP, SHIPPED, passAt } from "./layout-roadmap";

const R = ROADMAP;

/** A shipping box slides in over this long; the next sets off this long after it. */
const SHIP = { duration: 0.7, apart: 0.3 } as const;
/** Lane two's pieces fill in one after another, each named just after it starts. */
const PIECES = { duration: 0.45, apart: 0.2, name: 0.15 } as const;
/** The arrows run down one after another; a box comes up this long after its arrow starts. */
const ARROWS = { duration: 0.45, apart: 0.12, box: 0.35 } as const;
/** The first box drops into the band, then runs along it and through the door. */
const RUN = { drop: 0.5, along: 2.0 } as const;
/** A new box ships into the first one's place this long after the first sets off down to the band. */
const REFILL = 0.4;
/** The door opens this long before the box's front would reach it. */
const OPEN = 0.5;

const run = { at: RUN.drop, duration: RUN.along };
const passes = passing(run, passAt.checks);
const [jamb] = passing(run, [passAt.jamb]);

export const roadmap = picture("roadmap", {
  play: play(
    into("roadmap"),
    // The two lanes draw, each named just above it.
    {
      with: true,
      hold: 0.4,
      moves: [
        draw(keys(R.lanes), { at: 0, duration: 0.8, stagger: 0.15 }),
        rise(
          R.lanes.map((lane) => lane.name.key),
          { at: 0.4, stagger: 0.15 },
        ),
      ],
    },
    // Boxes ship into lane one, one after another.
    {
      hold: 0.3,
      moves: R.boxes
        .slice(0, SHIPPED)
        .flatMap((entry, i) => [...show(entry.key, { at: i * SHIP.apart, duration: 0.25 }), ...to(entry.key, { x: 0 }, { x: entry.from }, { at: i * SHIP.apart, duration: SHIP.duration, ease: EASE.page })]),
    },
    { with: true, hold: 0.2, moves: [story("roadmap", 0)] },
    // Lane two's pieces fill in, one at a time, each named.
    {
      hold: 0.25,
      moves: R.pieces.flatMap((piece, i) => [...fill(piece.key, { at: i * PIECES.apart, duration: PIECES.duration }), ...rise(piece.label.key, { at: i * PIECES.apart + PIECES.name })]),
    },
    { with: true, hold: 0.3, moves: [story("roadmap", 1)] },
    // An arrow runs down from each piece into lane one; the last two boxes come up where theirs land.
    {
      hold: 0.2,
      moves: R.arrows.flatMap((arrow, i) => [
        ...draw(arrow.key, { at: i * ARROWS.apart, duration: ARROWS.duration }),
        ...(arrow.box >= SHIPPED ? rise(R.boxes[arrow.box].key, { at: i * ARROWS.apart + ARROWS.box, duration: 0.5 }) : []),
      ]),
    },
    // The process runs under both lanes: its band, its checkpoints, and the door at the last.
    {
      hold: 0.3,
      moves: [
        draw(R.band.key, { at: 0, duration: 0.8 }),
        rise(R.band.name.key, { at: 0.3 }),
        show(
          R.checks.slice(0, 3).map((check) => check.key),
          { at: 0.3, stagger: 0.12 },
        ),
        rise(
          R.checks.map((check) => check.name.key),
          { at: 0.35, stagger: 0.12 },
        ),
        show(R.door.way, { at: 0.5, duration: 0.3 }),
        draw(R.door.key, { at: 0.5, duration: 0.6 }),
        show(R.door.leaf, { at: 0.7, duration: 0.3 }),
        rise(R.door.word.key, { at: 0.9 }),
      ],
    },
    // The first box drops into the band and runs along it; each checkpoint fills as it passes, and the door opens ahead of it. A new box ships into its place.
    {
      hold: 0.2,
      moves: [
        to(R.boxes[0].key, { y: R.journey.down }, { y: 0 }, { at: 0, duration: RUN.drop, ease: EASE.out }),
        to(R.boxes[0].key, { x: R.journey.along }, undefined, { at: run.at, duration: run.duration, ease: EASE.draw }),
        ...R.checks.slice(0, 3).map((check, i) => fill(check.key, { at: passes[i], duration: 0.3 })).flat(),
        open(R.door.leaf, { at: jamb - OPEN, duration: OPEN }),
        ...show(R.refill.key, { at: REFILL, duration: 0.25 }),
        ...to(R.refill.key, { x: 0 }, { x: R.refill.from }, { at: REFILL, duration: SHIP.duration, ease: EASE.page }),
      ],
    },
  ),
});
