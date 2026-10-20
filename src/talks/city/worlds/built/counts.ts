/**
 * How many elements carry each id that is on more than one, for the chain
 * to time a staggered move by (kit `chain`): each title's lines and story
 * line's rows, and the marks a picture draws many times over.
 */
import type { Counts } from "@/components/deck/kit";
import { TEXT_COUNTS } from "./layout";
import { SETUP } from "./layout-builds";
import { PORTFOLIO, SEEN } from "./layout-proof";
import { WEEKLY } from "./layout-weekly";

export const COUNTS: Counts = {
  ...TEXT_COUNTS,
  [WEEKLY.weeks.key]: WEEKLY.weeks.at.length,
  [WEEKLY.marks.key]: WEEKLY.marks.at.length,
  ...Object.fromEntries(
    SETUP.board.rowsOfWork.flatMap((row) => [
      [row.wave.key, row.wave.at.length],
      [row.fills.key, row.fills.at.length],
      [row.dots.key, row.dots.at.length],
    ]),
  ),
  [PORTFOLIO.slots.key]: PORTFOLIO.tiles.length,
  [SEEN.departments.key]: SEEN.departments.at.length,
  [SEEN.departments.spokes.key]: SEEN.departments.spokes.d.length,
  [SEEN.practitioners.key]: SEEN.practitioners.at.length,
};
