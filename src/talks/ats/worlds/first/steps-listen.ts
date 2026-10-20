/**
 * Slide 19's click: the three tables draw on side by side, their chairs
 * filling with seated people, each named; three bubbles rise in turn over
 * the first, with the first line; one over the second and one over the
 * third, with the second line; and the notebook page comes up at the right,
 * its heading, then its lines writing in one by one.
 */
import { draw, rise, show } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { LISTEN } from "./layout-listen";
import { UNDER_TITLE, into, keys, play } from "./moves";

const L = LISTEN;
const [leaders, staff, community] = L.tables;

/** The tables, one after another; their people sitting down; the questions, this far apart. */
const TABLES = 0.3;
const SIT = { at: 0.4, stagger: 0.05 } as const;
const ASK = 0.8;
/** The page's lines, one after another. */
const WRITE = { at: 0.7, duration: 0.5, stagger: 0.25 } as const;

export const listen = picture("listen", {
  play: play(
    into("listen"),
    // The three tables, their chairs filling, each named.
    {
      hold: UNDER_TITLE,
      moves: L.tables.flatMap((table, t) => [
        draw(table.key, { at: t * TABLES }),
        show(keys(table.seats), { at: t * TABLES + 0.15, stagger: 0.03 }),
        show(
          table.seats.map((seat) => seat.sitter),
          { at: t * TABLES + SIT.at, stagger: SIT.stagger },
        ),
        rise(table.name.key, { at: t * TABLES + 0.6 }),
      ]),
    },
    // Three bubbles rise in turn over the first table, with the first line.
    { hold: 0.4, moves: leaders.bubbles.map((bubble, i) => rise(bubble.key, { at: i * ASK })) },
    { with: true, hold: 0.2, moves: [story("listen", 0)] },
    // One over the second table, one over the third, with the second line.
    { hold: 0.5, moves: [rise(staff.bubbles[0].key, { at: 0 }), rise(community.bubbles[0].key, { at: ASK })] },
    { with: true, hold: 0.3, moves: [story("listen", 1)] },
    // The page comes up beside them, its heading, and its lines written one by one.
    {
      hold: 0.3,
      moves: [rise(L.page.key, { at: 0 }), rise(L.page.heading.key, { at: 0.3 }), draw(keys(L.page.lines), { at: WRITE.at, duration: WRITE.duration, stagger: WRITE.stagger })],
    },
  ),
});
