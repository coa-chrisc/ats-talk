/**
 * Slide 5's click: the lead agents land at their desk, named, their rings
 * filling as they plan; the board draws beside them and splits into rows,
 * its cells coming up row by row; the builders land over it, named, and
 * fill the cells together, a row at a time, with story line A; the gate
 * draws over the builders and the keys agent lands in it with its ring of
 * keys, named with its caption, and a line runs from it down to each
 * builder, with story line B; the wall draws down past the board, named;
 * the reviewers land past it, named, and the cells pass their check row by
 * row as they look; and the person stands at the end and the orange mark
 * lands.
 */
import type { StepDef } from "@/components/deck/engine";
import { EASE, draw, fill, mark, pass, rise, show, take } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { FLEET } from "./layout-fleet";
import { into, land, play } from "./moves";

const F = FLEET;
const B = F.board;
const K = F.keys;

/** Each row of the board comes up this long after the one above it. */
const ROW_NEXT = 0.15;
/** The builders take the next row this long after the row before: the six work it at once. */
const WAVE = 0.55;
/** The reviewers pass a row this long after the row before. */
const CHECK = 0.25;

export const fleet = (): StepDef[] =>
  picture("fleet-defined", {
    play: play([
      into("fleet-defined"),
      // The leads land at their desk, named, and their rings fill as they plan.
      {
        with: true,
        hold: 0.35,
        moves: [
          draw(F.leads.desk.key, { at: 0, duration: 0.6 }),
          ...F.leads.keys.flatMap((key, i) => [land(key, 0.1 + i * 0.1, 0.5), fill(key, { at: 0.45 + i * 0.1, duration: 0.5 })]),
          rise(F.leads.name.key, { at: 0.5, duration: 0.6 }),
        ],
      },
      // The board draws beside them and splits into rows, its cells coming up row by row.
      {
        hold: 0.2,
        moves: [
          draw(B.key, { at: 0, duration: 0.6 }),
          ...F.splits.flatMap((split, i) => draw(split.key, { at: 0.45 + i * ROW_NEXT, duration: 0.4 })),
          ...B.rows.flatMap((row, r) => show(row.cells.map((cell) => cell.key), { at: 0.5 + r * ROW_NEXT, duration: 0.35, stagger: 0.03 })),
        ],
      },
      // The builders land over it, named, and fill its cells together, a row at a time.
      {
        hold: 0.2,
        moves: [
          ...F.builders.keys.flatMap((key, i) => [land(key, i * 0.05, 0.45), fill(key, { at: 0.3 + i * 0.05, duration: 0.4 })]),
          rise(F.builders.name.key, { at: 0.25, duration: 0.6 }),
          ...B.rows.flatMap((row, r) => [
            take(row.cells, { at: 0.6 + r * WAVE, stagger: 0 }),
            fill(row.cells.map((cell) => cell.key), { at: 0.7 + r * WAVE, duration: 0.45, stagger: 0, ease: EASE.draw }),
          ]),
        ],
      },
      { with: true, hold: 0.6, moves: [story("fleet-defined", 0)] },
      // The gate draws over the builders, the keys agent lands in it with its keys, named with its caption, and a line runs down to each builder.
      {
        hold: 0.3,
        moves: [
          draw(K.gate.key, { at: 0, duration: 0.5 }),
          land(K.key, 0.3, 0.5),
          fill(K.key, { at: 0.6, duration: 0.45 }),
          rise(K.ring.key, { at: 0.55, duration: 0.4 }),
          rise(K.name.key, { at: 0.5, duration: 0.6 }),
          rise(K.caption.key, { at: 0.65, duration: 0.6 }),
          ...K.lines.map((line, i) => draw(line.key, { at: 0.95 + i * 0.08, duration: 0.4 })),
        ],
      },
      { with: true, hold: 0.6, moves: [story("fleet-defined", 1)] },
      // The wall draws down past the board, and its name.
      { hold: 0.3, moves: [draw(F.wall.key, { at: 0, duration: 0.6 }), rise(F.wall.name.key, { at: 0.35, duration: 0.6 })] },
      // The reviewers land past it, named, and the cells pass their check row by row.
      {
        hold: 0.2,
        moves: [
          ...F.reviewers.keys.flatMap((key, i) => [land(key, i * 0.1, 0.5), fill(key, { at: 0.3 + i * 0.1, duration: 0.45 })]),
          rise(F.reviewers.name.key, { at: 0.2, duration: 0.6 }),
          ...B.rows.flatMap((row, r) => pass(row.cells, { at: 0.55 + r * CHECK, stagger: 0.03 })),
        ],
      },
      // The person stands at the end, and the mark lands.
      { hold: 0.2, moves: [draw(F.person.key, { at: 0, duration: 0.5 }), mark(F.mark.key, { at: 0.4, duration: 0.75 })] },
    ]),
  });
