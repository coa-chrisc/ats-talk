/**
 * Slide 5's places, five groups read left to right, each named on one of
 * two label lines so the names read as a row too. Left: three lead agents
 * behind a desk. Beside them: the board, two rows of six cells, and over it
 * six smaller builder agents, one over each column of cells; over the
 * builders, centred on the board, one agent with a ring of keys standing in
 * a gate, its name and caption to its right, and a thin line from its foot
 * to each builder. Then a thin wall standing from the builders' top to the
 * lower label line, named under its foot. Past the wall: two reviewer
 * agents level with the board's middle. Last: a person, the approval mark
 * under them. Words are read from the script, by position.
 *
 * The drawing has y 548 to 992: the gate stands at the top (556 to 616),
 * the builders under it (700), the board under them (732 to 924, its
 * middle 828 the row's middle); the leads, the reviewers and the person are
 * centred on the board's middle, their names on the upper label line
 * (906); the builders' and the wall's names on the lower one (952).
 */
import { AGENT_R, board, box, type Point } from "@/components/deck/kit";
import { shown } from "../../script/find";
import { contentTop, layerOf } from "./layout";

const [LEADS, BUILDERS, REVIEWERS, APART, KEYS, TOUCH, APPROVES] = shown("fleet-defined", "play");

const TOP = contentTop("fleet-defined");

/** The two label lines: the upper under the leads, the reviewers and the mark; the lower under the builders and the wall. */
const UPPER = TOP + 358;
const LOWER = TOP + 404;

/**
 * The board: 524 wide from x 460, 184 px under the drawing's top, two rows
 * of 56 px and six cells to a row (64 px each, 12 apart, no room kept for
 * row names: its rows are named by nothing but their order), so it stands
 * 192 px tall and its middle is at y 828.
 */
const BOARD = board({ id: "fleet-defined.board", x: 460, y: TOP + 184, w: 524, rows: [0, 1].map(() => ({ label: "", cells: 6 })), rowH: 56, labelW: 0 });
const BOARD_MID = BOARD.box.y + BOARD.box.h / 2;
/** Where a row's cells start and end, for the line that splits it from the one above. */
const LANE = { x0: BOARD.rows[0].cells[0].x, x1: BOARD.rows[0].cells[5].x + BOARD.rows[0].cells[5].w } as const;

/** The leads: three agents at full size, 80 apart, 18 px over the board's middle; the desk's top 30 px under their centres, 252 wide, its legs 32 px tall, their feet 12 px over the upper label line's words. */
const LEAD_Y = BOARD_MID - 18;
const LEADS_X = [150, 230, 310] as const;
const DESK = { x0: 104, x1: 356, y: LEAD_Y + 30, legs: 32, inset: 24 } as const;

/** The builders: smaller agents, one over each column's middle, 32 px over the board. */
export const BUILDER_R = 15;
const BUILDER_Y = BOARD.box.y - 32;

/**
 * The gate: two posts 52 px either side of the board's middle, from 8 px
 * under the drawing's top to 68 px under it, a lintel across their tops;
 * the keys agent at full size standing in the opening, its centre 30 px
 * under the lintel, the ring of keys at its right hand, 12 px past its ring
 * and 6 px over its middle, so its keys hang clear of the gate's feet. Its
 * name sits 28 px right of the right post, on a line 24 px under the
 * drawing's top at the text size, and its caption 40 px under that at the
 * label size. From its
 * foot, 4 px under the posts' feet, a line runs to each builder's top, a
 * fan about 60 px tall.
 */
export const GATE = { half: 52, top: TOP + 8, foot: TOP + 68, agentDrop: 30, nameGap: 28 } as const;
const GATE_X = BOARD.box.x + BOARD.box.w / 2;
const KEYS_AT: Point = { x: GATE_X, y: GATE.top + GATE.agentDrop };
const KEYS_NAME_X = GATE_X + GATE.half + GATE.nameGap;

/** The wall: a thin line 80 px right of the board, from 8 px over the builders' tops to 40 px over the lower label line. */
const WALL = { x: 1064, y0: BUILDER_Y - BUILDER_R - 8, y1: LOWER - 40 } as const;

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
  keys: {
    key: "fleet-defined.keys",
    at: KEYS_AT,
    gate: { key: "fleet-defined.gate", x0: GATE_X - GATE.half, x1: GATE_X + GATE.half, top: GATE.top, foot: GATE.foot },
    /** The ring of keys, hanging at the agent's right hand. */
    ring: { key: "fleet-defined.keyring", at: { x: KEYS_AT.x + AGENT_R + 12, y: KEYS_AT.y - 6 } as Point },
    name: { key: "fleet-defined.keys.name", text: KEYS, at: { x: KEYS_NAME_X, y: TOP + 24 } as Point },
    caption: { key: "fleet-defined.keys.caption", text: TOUCH, at: { x: KEYS_NAME_X, y: TOP + 64 } as Point },
    /** A line from the agent's foot to each builder's top. */
    lines: BOARD.rows[0].cells.map((cell, i) => ({
      key: `fleet-defined.keys.line.${i}`,
      from: { x: GATE_X, y: GATE.foot + 4 } as Point,
      to: { x: cell.x + cell.w / 2, y: BUILDER_Y - BUILDER_R - 4 } as Point,
    })),
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
