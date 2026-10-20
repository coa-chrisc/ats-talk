/**
 * Slide 14's click: the round table draws on with its empty chairs round
 * it; the chairs fill one at a time, named once; the five questions come
 * up down the left in turn; and the notebook page comes up beside the
 * table, its heading, then its lines writing in one by one.
 */
import { draw, fill, rise, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { LISTEN } from "./layout-listen";
import { into, keys, play } from "./moves";

const L = LISTEN;

/** The people sitting down, one at a time round the table, and how long each takes to draw on. */
const SIT = { at: 0.8, duration: 0.45, stagger: 0.2 } as const;
/** The questions, one after the other, this many seconds apart. */
const ASK = 0.9;
/** The page's lines, one after another. */
const WRITE = { at: 0.8, duration: 0.45, stagger: 0.25 } as const;

export const listen = picture("listen", {
  play: play(
    into("listen"),
    // The table with its empty chairs, then the chairs filling one at a time, named once.
    {
      hold: 0.05,
      moves: [
        draw(L.table.key, { at: 0 }),
        show(keys(L.seats), { at: 0.3, stagger: 0.04 }),
        draw(
          L.seats.map((seat) => seat.sitter),
          { at: SIT.at, duration: SIT.duration, stagger: SIT.stagger },
        ),
        rise(L.name.key, { at: SIT.at + 0.5 }),
      ],
    },
    // The five questions down the left, in turn, with the first line.
    { hold: 0.2, moves: L.bubbles.map((bubble, i) => rise(bubble.key, { at: i * ASK })) },
    { with: true, hold: 0.2, moves: [story("listen", 0)] },
    // The page beside the table, its heading, and its lines written one by one.
    {
      hold: 0.5,
      moves: [
        rise(L.page.key, { at: 0 }),
        rise(L.page.heading.key, { at: 0.35 }),
        fill(keys(L.page.lines), { at: WRITE.at, duration: WRITE.duration, stagger: WRITE.stagger }),
      ],
    },
    { with: true, hold: 0.5, moves: [story("listen", 1)] },
  ),
});
