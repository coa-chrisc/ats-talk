/**
 * Slide 5's places, four groups in a row from left to right, each named on
 * one of two label lines so the names read as a row too. Left: three lead
 * agents behind a desk. Beside them: the board, three rows of six cells,
 * and under it six smaller builder agents, one under each column of cells.
 * Then a thin wall standing the drawing's height, named under its foot.
 * Past the wall: two reviewer agents level with the board's middle. Last: a
 * person, the approval mark under them. Words are read from the script, by
 * position.
 *
 * The drawing has y 548 to 992: the board's middle (708) is the row's
 * middle; the leads, the reviewers and the person are centred on it, their
 * names on the upper label line (800); the builders' and the wall's names
 * on the lower one (940).
 */
import { board, box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { contentTop, layerOf } from "./layout";

const [LEADS, BUILDERS, REVIEWERS, APART, APPROVES] = shown("fleet-defined", "play");

const TOP = contentTop("fleet-defined");

/** The two label lines: the upper under the leads, the reviewers and the mark; the lower under the builders and the wall. */
const UPPER = TOP + 252;
const LOWER = TOP + 392;

/**
 * The board: 524 wide from x 460, 24 px under the drawing's top, three rows
 * of 64 px and six cells to a row (64 px each, 12 apart, no room kept for
 * row names: its rows are named by nothing but their order), so it stands
 * 272 px tall and its middle is at y 708.
 */
const BOARD = board({ id: "fleet-defined.board", x: 460, y: TOP + 24, w: 524, rows: [0, 1, 2].map(() => ({ label: "", cells: 6 })), rowH: 64, labelW: 0 });
const BOARD_MID = BOARD.box.y + BOARD.box.h / 2;
/** Where a row's cells start and end, for the line that splits it from the one above. */
const LANE = { x0: BOARD.rows[0].cells[0].x, x1: BOARD.rows[0].cells[5].x + BOARD.rows[0].cells[5].w } as const;

/** The leads: three agents at full size, 80 apart, 18 px over the board's middle; the desk's top 34 px under their centres, 260 wide, its legs 42 px tall. */
const LEAD_Y = BOARD_MID - 18;
const LEADS_X = [150, 230, 310] as const;
const DESK = { x0: 104, x1: 356, y: LEAD_Y + 34, legs: 42, inset: 24 } as const;

/** The builders: smaller agents, one under each column's middle, 40 px under the board. */
export const BUILDER_R = 15;
const BUILDER_Y = BOARD.box.y + BOARD.box.h + 40;

/** The wall: a thin line 80 px right of the board, from the board's top to 40 px over the lower label line. */
const WALL = { x: 1064, y0: BOARD.box.y, y1: LOWER - 40 } as const;

/** The reviewers: two agents at full size, 80 apart, past the wall, centred on the board's middle. */
const REVIEWERS_X = [1160, 1240] as const;

/** The person: 56 by 96, centred on the board's middle at x 1480; the mark on the upper label line under them, its words to its right. */
const PERSON = box(1452, BOARD_MID - 48, 56, 96);
const MARK: Point = { x: PERSON.x + PERSON.w / 2, y: UPPER };

export const FLEET = {
  ...layerOf("fleet-defined"),
  board: BOARD,
  /** The lines that split the board into rows, under each row but the last. */
  splits: BOARD.rows.slice(1).map((row, i) => ({ key: `fleet-defined.split.${i}`, x0: LANE.x0, x1: LANE.x1, y: row.box.y })),
  leads: {
    keys: LEADS_X.map((_, i) => `fleet-defined.lead.${i}`),
    at: LEADS_X.map((x) => ({ x, y: LEAD_Y }) as Point),
    desk: { key: "fleet-defined.desk", ...DESK },
    name: { key: "fleet-defined.leads.name", text: LEADS, at: { x: (DESK.x0 + DESK.x1) / 2, y: UPPER } as Point },
  },
  builders: {
    keys: BOARD.rows[0].cells.map((_, i) => `fleet-defined.builder.${i}`),
    at: BOARD.rows[0].cells.map((cell) => ({ x: cell.x + cell.w / 2, y: BUILDER_Y }) as Point),
    name: { key: "fleet-defined.builders.name", text: BUILDERS, at: { x: (LANE.x0 + LANE.x1) / 2, y: LOWER } as Point },
  },
  wall: { key: "fleet-defined.wall", ...WALL, name: { key: "fleet-defined.wall.name", text: APART, at: { x: WALL.x, y: LOWER } as Point } },
  reviewers: {
    keys: REVIEWERS_X.map((_, i) => `fleet-defined.reviewer.${i}`),
    at: REVIEWERS_X.map((x) => ({ x, y: BOARD_MID }) as Point),
    name: { key: "fleet-defined.reviewers.name", text: REVIEWERS, at: { x: (REVIEWERS_X[0] + REVIEWERS_X[1]) / 2, y: UPPER } as Point },
  },
  person: { key: "fleet-defined.person", at: PERSON },
  mark: { key: "fleet-defined.mark", text: APPROVES, at: MARK },
};
