/** Build complete groups left to right; never return to an earlier group. */
import type { StepDef } from "@/components/deck/engine";
import { draw, fill, mark, show, take } from "@/components/deck/kit";
import { picture, story } from "../steps";
import { FLEET as F } from "./layout-fleet";
import { into, play } from "./moves";
const B = F.board;
const K = F.keys;
const cells = B.rows.flatMap(row => row.cells);
export const fleet = (): StepDef[] => picture("fleet-defined", {
  play: play([
    into("fleet-defined"),
    { moves: [
      // Planning is the first complete group on the left.
      draw(F.leads.desk.key, { at: 0, duration: 0.45 }),
      ...F.leads.keys.flatMap(key => [...show(key, { at: 0, duration: 0.45 }), ...fill(key, { at: 0, duration: 0.45 })]),
      show(F.leads.name.key, { at: 0, duration: 0.45 }),
      // The board, builders and permission checker appear as one middle group.
      draw(B.key, { at: 1, duration: 0.5 }),
      ...F.splits.flatMap(split => draw(split.key, { at: 1, duration: 0.5 })),
      show(cells.map(cell => cell.key), { at: 1, duration: 0.5, stagger: 0 }),
      take(cells, { at: 1, stagger: 0 }),
      fill(cells.map(cell => cell.key), { at: 1, duration: 0.5, stagger: 0 }),
      ...F.builders.keys.flatMap(key => [...show(key, { at: 1, duration: 0.5 }), ...fill(key, { at: 1, duration: 0.5 })]),
      show(F.builders.name.key, { at: 1, duration: 0.5 }),
      draw(K.gate.key, { at: 1, duration: 0.5 }),
      show(K.key, { at: 1, duration: 0.5 }), fill(K.key, { at: 1, duration: 0.5 }),
      show([K.ring.key, K.name.key, K.caption.key], { at: 1, duration: 0.5, stagger: 0 }),
      ...K.lines.flatMap(line => draw(line.key, { at: 1, duration: 0.5 })),
      // Continue right, without sending attention back to the board.
      draw(F.wall.key, { at: 2.1, duration: 0.45 }), show(F.wall.name.key, { at: 2.1, duration: 0.45 }),
      ...F.reviewers.keys.flatMap(key => [...show(key, { at: 2.8, duration: 0.45 }), ...fill(key, { at: 2.8, duration: 0.45 })]),
      show(F.reviewers.name.key, { at: 2.8, duration: 0.45 }),
      draw(F.person.key, { at: 3.7, duration: 0.5 }), mark(F.mark.key, { at: 3.7, duration: 0.5 }),
      story("fleet-defined", 0), story("fleet-defined", 1),
    ] },
  ]),
});
