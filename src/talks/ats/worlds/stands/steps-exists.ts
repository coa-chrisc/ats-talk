/**
 * Slide 12's click: the title, then both story lines together, and after
 * the reading pause the picture. The grid of departments comes up, named
 * once; the six named windows light in turn, each one's name and caption
 * coming up in the list as it lights; then the three unnamed windows light,
 * fainter, one after another; the cluster of staff draws on under the grid,
 * its words with it; and last the empty table wipes on beside them, its
 * caption with it.
 */
import type { StepDef } from "@/components/deck/engine";
import { EASE, draw, fill, rise, wipe } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { EXISTS } from "./layout-exists";
import { into, play } from "./moves";

const E = EXISTS;
const G = E.group;

/** The named windows light this far apart, from 0.9 s; the unnamed ones after them, closer. */
const NAMED = { at: 0.9, pitch: 0.55 } as const;
const UNNAMED = { at: NAMED.at + 6 * NAMED.pitch + 0.2, pitch: 0.22 } as const;
/** The cluster after the last unnamed window, and the table after the cluster's words. */
const STAFF = UNNAMED.at + 3 * UNNAMED.pitch + 0.5;
const TABLE = STAFF + 1.3;

export const exists = (): StepDef[] =>
  picture("exists", {
    play: play([
      into("exists"),
      { moves: [story("exists", 0), story("exists", 1)] },
      {
        moves: [
          // The grid and its name.
          rise(E.grid.key, { at: 0, duration: 0.7 }),
          rise(E.name.key, { at: 0.2, duration: 0.6 }),
          // The six named windows in turn, each entry in the list with its window.
          ...E.named.flatMap((lit, i) => [fill(lit.key, { at: NAMED.at + i * NAMED.pitch, duration: 0.5, ease: EASE.out }), rise(lit.entry.key, { at: NAMED.at + i * NAMED.pitch + 0.05, duration: 0.5 })]),
          // The three unnamed windows, fainter.
          ...E.unnamed.flatMap((lit, i) => fill(lit.key, { at: UNNAMED.at + i * UNNAMED.pitch, duration: 0.5, ease: EASE.out, to: lit.lit })),
          // The cluster of staff, its words with it.
          ...E.staff.flatMap((person, i) => draw(person.key, { at: STAFF + i * 0.08, duration: 0.6 })),
          rise(G.name.key, { at: STAFF + 0.2, duration: 0.6 }),
          rise(G.caption.key, { at: STAFF + 0.3, duration: 0.6 }),
          rise(G.training.key, { at: STAFF + 0.4, duration: 0.6 }),
          // The empty table, its caption with it.
          ...wipe(E.table.key, { at: TABLE, duration: 0.75 }),
          rise(E.tableCaption.key, { at: TABLE + 0.15, duration: 0.6 }),
        ],
      },
    ]),
  });
